import dotenv from "dotenv";
dotenv.config();

import type { Express, Request, Response } from "express";
import axios from "axios";
import crypto from "crypto";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, authMiddleware, banStatusMiddleware } from "./auth";
import { setupAdminRoutes } from "./admin";
import { setupRewardRoutes } from "./rewards";
import { setupSupportRoutes } from "./support";
import { setupPasswordResetRoutes } from "./reset-password";

import { playSlots, playDice, startCrash, crashCashout, getTransactions, playRoulette, startBlackjack, blackjackAction, playPlinko, getBettingOverview } from "./games";
import Stripe from "stripe";
import { createPaymentIntentSchema, CoinPackage, subscriptionPlanSchema, manageSubscriptionSchema, SubscriptionPlan, banAppealSchema, LeaderBoard, updateUserSchema } from "@shared/schema";

import { z } from "zod";

// Define our coin packages
const coinPackages: CoinPackage[] = [
  {
    id: "small",
    name: "Starter Package",
    coins: 10000,
    price: 4.99,
    featured: false,
    discount: 0,
  },
  {
    id: "medium",
    name: "Popular Package",
    coins: 30000,
    price: 9.99,
    featured: true,
    discount: 15,
  },
  {
    id: "large",
    name: "Gold Package",
    coins: 100000,
    price: 24.99,
    featured: false,
    discount: 20,
  },
  {
    id: "whale",
    name: "Whale Package",
    coins: 300000,
    price: 49.99,
    featured: false,
    discount: 25,
  },
];

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

async function processSuccessfulPayment(paymentId: string, userId = null) {
  try {
    // Get payment record from database
    const paymentRecord = await storage.getPaymentByOrderId(paymentId);

    if (!paymentRecord) {
      throw new Error("Payment record not found");
    }

    // Prevent double processing
    if (paymentRecord.status === "completed") {
      console.log("Payment already processed:", paymentId);
      return;
    }

    // Add coins to user's balance
    // await storage.addCoinsToUser(paymentRecord.userId, paymentRecord.coins);
    const userId = paymentRecord.userId;
    const coins = parseInt(paymentRecord.coins);
    const user = await storage.getUser(userId);

    if (user) {
      const currentBalance = parseFloat(user.balance.toString());
      const newBalance = currentBalance + coins;

      await Promise.all([
        storage.updateUserBalance(userId, newBalance),
        storage.createCoinTransaction({
          userId,
          amount: coins.toString(),
          reason: `Purchased ${coins} coins via NOWPayments`,
          adminId: 0,
        }),
      ]);
    }

    // Update payment status
    await storage.updatePaymentStatus(paymentId, "completed");

    console.log(`Successfully processed payment ${paymentId}: ${paymentRecord.coins} coins added to user ${paymentRecord.userId}`);
  } catch (error) {
    console.error("Error processing successful payment:", error);
    throw error;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);

  // Public routes - no authentication required
  app.get("/api/announcements", async (req: Request, res: Response) => {
    try {
      // Get user ID if user is authenticated
      const userId = req.user?.id;

      console.log("Fetching announcements for userId:", userId);

      // If userId is defined, filter announcements for that user
      // Otherwise, get global announcements (no targeting)
      const announcements = userId !== undefined ? await storage.getAnnouncements(false, userId) : await storage.getAnnouncements(false);

      console.log("Announcements retrieved successfully");

      // Always return an array, even if empty
      res.json(announcements || []);
    } catch (error) {
      console.error("Error fetching announcements:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      // Return empty array instead of error to prevent frontend issues
      res.json([]);
    }
  });

  // Protected Game routes - all require authentication
  app.post("/api/games/slots", authMiddleware, playSlots);
  app.post("/api/games/dice", authMiddleware, playDice);
  app.post("/api/games/crash/start", authMiddleware, startCrash);
  app.post("/api/games/crash/cashout", authMiddleware, crashCashout);
  app.post("/api/games/roulette", authMiddleware, playRoulette);
  app.post("/api/games/blackjack/start", authMiddleware, startBlackjack);
  app.post("/api/games/blackjack/action", authMiddleware, blackjackAction);
  app.post("/api/games/plinko", authMiddleware, playPlinko);

  // Transaction history - also protected
  app.get("/api/transactions", authMiddleware, getTransactions);

  // Coin purchase routes
  app.get("/api/coins/packages", (req: Request, res: Response) => {
    res.json(coinPackages);
  });

  // Constant
  const NOWPAYMENTS_API_KEY = process.env.NOWPAYMENTS_API_KEY! as String;
  const NOWPAYMENTS_IPN_SECRET = process.env.NOWPAYMENTS_IPN_SECRET! as String;
  const NOWPAYMENTS_API_URL = process.env.NOWPAYMENTS_API_URL! as String;
  const SERVER_URL = process.env.SERVER_URL as String;

  // API Route: Create Payment Intent
  app.post("/api/wallets/create-payment-intent", authMiddleware, async (req: Request, res: Response) => {
    try {
      // Validate request body
      // const { packageId, success_url, cancel_url } = createPaymentIntentSchema.parse(req.body);
      const { packageId, success_url, cancel_url } = req.body;

      // Find package
      const selectedPackage = coinPackages.find((pkg) => pkg.id === packageId);
      if (!selectedPackage) {
        return res.status(400).json({ error: "Invalid package ID" });
      }

      // Create NOWPayments payment
      const orderId = `order_${Date.now()}_${req.user!.id}`;

      // Create payment with NowPayments
      const paymentData = {
        price_amount: selectedPackage.price,
        price_currency: "usd",
        pay_currency: "btc", // You can make this dynamic based on user selection
        ipn_callback_url: `${NOWPAYMENTS_API_URL}/api/coins/webhook`,
        order_id: orderId,
        order_description: `${selectedPackage.name} - ${selectedPackage.coins} coins`,
        success_url,
        cancel_url,

        customer_email: req.user?.email,
        // case: "checkout", // Use checkout flow for redirect
      };

      const response = await axios.post(`${NOWPAYMENTS_API_URL}/invoice`, paymentData, {
        headers: {
          "x-api-key": NOWPAYMENTS_API_KEY,
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);

      const { id, order_id, invoice_url } = response.data;

      // Store payment in database
      await storage.createPayment({
        userId: req.user!.id,
        amount: selectedPackage.price.toString(),
        coins: selectedPackage.coins.toString(),
        orderId,
        status: "pending",
      });

      res.json({
        paymentUrl: invoice_url,
        paymentId: parseInt(id),
        orderId: order_id,
      });
    } catch (error: any) {
      console.error("Error creating payment intent:", error);

      res.status(500).json({
        message: "Failed to create payment",
        error: error.response?.data || error.message,
      });
    }
  });

  // Webhook endpoint for NowPayments IPN notifications
  app.post("/api/coins/webhook", async (req, res) => {
    try {
      const receivedSignature = req.headers["x-nowpayments-sig"];
      const requestBody = JSON.stringify(req.body);

      // Verify webhook signature
      const expectedSignature = crypto.createHmac("sha512", NOWPAYMENTS_IPN_SECRET).update(requestBody).digest("hex");

      if (receivedSignature !== expectedSignature) {
        console.error("Invalid webhook signature");
        return res.status(401).json({ message: "Invalid signature" });
      }

      const { payment_status, payment_id, order_id } = req.body;

      console.log("Webhook received:", { payment_status, payment_id, order_id });

      // Handle different payment statuses
      switch (payment_status) {
        case "finished":
        case "confirmed":
          await processSuccessfulPayment(payment_id);
          break;

        case "failed":
        case "expired":
          await storage.updatePaymentStatus(payment_id, "failed");
          break;

        case "partially_paid":
          await storage.updatePaymentStatus(payment_id, "partially_paid");
          break;

        default:
          await storage.updatePaymentStatus(payment_id, payment_status);
      }

      res.status(200).json({ status: "ok" });
    } catch (error) {
      console.error("Webhook processing error:", error);
      res.status(500).json({ message: "Webhook processing failed" });
    }
  });

  // Get payment status endpoint (optional - for manual checking)
  app.get("/api/wallets/payment-status/:paymentId", async (req, res) => {
    try {
      const { paymentId } = req.params;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      // Get payment from database
      const payment = await storage.getPaymentByOrderId(paymentId);

      if (!payment || payment.userId !== userId) {
        return res.status(404).json({ error: "Payment not found" });
      }

      // Get latest status from NowPayments if still pending
      if (payment.status === "waiting" || payment.status === "confirming") {
        try {
          const response = await axios.get(`${NOWPAYMENTS_API_URL}/payment/${paymentId}`, {
            headers: { "x-api-key": NOWPAYMENTS_API_KEY },
          });

          const latestStatus = response.data.payment_status;
          if (latestStatus !== payment.status) {
            await storage.updatePaymentStatus(payment.id, latestStatus);
            payment.status = latestStatus;
          }
        } catch (error) {
          console.error("Error fetching payment status from NowPayments:", error);
        }
      }

      res.json({
        paymentId: payment.paymentId,
        status: payment.status,
        amount: payment.amount,
        coins: payment.coins,
        createdAt: payment.createdAt,
      });
    } catch (error) {
      console.error("Payment status check error:", error);
      res.status(500).json({ error: "Failed to check payment status" });
    }
  });

  // Payment history
  app.get("/api/coins/purchases", authMiddleware, async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.query.userId as string);
      const limit = parseInt(req.query.limit as string) || 10;
      const page = parseInt(req.query.page as string) || 1;

      const userPayments = await storage.getUserPayments(userId, limit, page);
      res.json({ payments: userPayments });
    } catch (error: any) {
      console.error("Error fetching payments:", error);

      res.status(500).json({
        message: "Failed to fetch payments",
        error: error.message,
      });
    }
  });

  // Set up admin routes
  setupAdminRoutes(app);

  // Set up daily login rewards routes
  setupRewardRoutes(app);

  // Set up support ticket routes
  setupSupportRoutes(app);

  // Set up password reset routes
  setupPasswordResetRoutes(app);

  // leadboard endpoint
  app.get("/api/games/leaderboard", async (req: Request, res: Response) => {
    try {
      const leaderboard = await storage.getLeaderboard();
      res.status(200).json(leaderboard);
    } catch (error) {
      console.error("Leaderboard error:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

  // Ban appeal endpoints
  app.get("/api/user/ban-status", banStatusMiddleware, async (req: Request, res: Response) => {
    try {
      const userId = req.user!.id;
      const user = await storage.getUser(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (!user.isBanned) {
        return res.json({
          isBanned: false,
        });
      }

      // User is banned, check if they have any appeals
      const appeal = await storage.getUserBanAppeal(userId);

      res.json({
        isBanned: true,
        banReason: user.banReason,
        bannedAt: user.bannedAt,
        appeal: appeal || null,
      });
    } catch (error) {
      console.error("Error checking ban status:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      res.status(500).json({ message: "Failed to check ban status", error: errorMessage });
    }
  });

  // Submit ban appeal
  app.post("/api/user/ban-appeal", banStatusMiddleware, async (req: Request, res: Response) => {
    try {
      const userId = req.user!.id;

      // Validate request body
      const appealData = banAppealSchema.parse(req.body);

      // Create the appeal
      const appeal = await storage.createBanAppeal(userId, appealData.reason);

      res.status(201).json({ appeal });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input data", errors: error.errors });
      }

      console.error("Error creating ban appeal:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      res.status(500).json({ message: "Failed to create ban appeal", error: errorMessage });
    }
  });

  // Subscription related endpoints

  // Get available subscription plans
  app.get("/api/subscriptions/plans", async (req: Request, res: Response) => {
    try {
      const plans = await storage.getSubscriptionPlans();
      res.json(plans);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Update user's profile
  app.patch("/api/user/profile", authMiddleware, async (req: Request, res: Response) => {
    try {
      const userId = req.user!.id;

      const updateData = updateUserSchema.parse(req.body);

      const updateProfile = await storage.updateUser(userId, updateData);

      res.json({
        updateProfile,
      });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  });

  // Get user's current subscription
  app.get("/api/subscriptions/current", authMiddleware, async (req: Request, res: Response) => {
    try {
      const userId = req.user!.id;
      const subscription = await storage.getUserSubscription(userId);

      if (!subscription) {
        return res.json({ active: false });
      }

      res.json({
        ...subscription,
        active: subscription.status === "active",
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get user's current subscription
  app.get("/api/profile", authMiddleware, async (req: Request, res: Response) => {
    try {
      const userId = req.user!.id;
      const subscription = await storage.getUserSubscription(userId);

      if (!subscription) {
        return res.json({ active: false });
      }

      res.json({
        ...subscription,
        active: subscription.status === "active",
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Create a new subscription
  app.post("/api/subscriptions/create", authMiddleware, async (req: Request, res: Response) => {
    try {
      const { tier } = manageSubscriptionSchema.parse(req.body);
      const userId = req.user!.id;

      // Check if user already has an active subscription
      const existingSubscription = await storage.getUserSubscription(userId);
      if (existingSubscription && existingSubscription.status === "active") {
        return res.status(400).json({ message: "User already has an active subscription" });
      }

      // Get the selected plan
      const plans = await storage.getSubscriptionPlans();
      const selectedPlan = plans.find((plan) => plan.tier === tier);

      if (!selectedPlan) {
        return res.status(400).json({ message: "Invalid subscription tier" });
      }

      // Create a Stripe customer if needed
      let user = req.user!;
      let customerId = user.stripeCustomerId;

      if (!customerId) {
        const customer = await stripe.customers.create({
          email: user.email || `${user.username}@example.com`,
          name: user.username,
          metadata: {
            userId: user.id.toString(),
          },
        });

        customerId = customer.id;
        // Update user with Stripe customer ID
        // This would need to be added to the storage interface
      }

      // Create the subscription in Stripe
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [
          {
            price: selectedPlan.priceId,
          },
        ],
        payment_behavior: "default_incomplete",
        expand: ["latest_invoice.payment_intent"],
      });

      const latestInvoice = subscription.latest_invoice as Stripe.Invoice;
      const paymentIntent = latestInvoice.payment_intent as Stripe.PaymentIntent;

      // Save subscription info in our database with pending status
      await storage.createSubscription({
        userId,
        tier: selectedPlan.tier as "bronze" | "silver" | "gold",
        status: "incomplete", // Mark as incomplete until payment is confirmed
        stripeSubscriptionId: subscription.id,
        priceId: selectedPlan.priceId,
        priceAmount: selectedPlan.price.toString(),
        startDate: new Date(),
        metadata: JSON.stringify({
          planName: selectedPlan.name,
          features: selectedPlan.features,
        }),
      });

      // Don't update user's subscription tier yet - will be done in webhook

      res.json({
        subscriptionId: subscription.id,
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error: any) {
      console.error("Subscription creation error:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // Cancel a subscription
  app.post("/api/subscriptions/cancel", authMiddleware, async (req: Request, res: Response) => {
    try {
      const userId = req.user!.id;

      // Get user's active subscription
      const subscription = await storage.getUserSubscription(userId);

      if (!subscription || subscription.status !== "active") {
        return res.status(400).json({ message: "No active subscription found" });
      }

      // Cancel in Stripe
      await stripe.subscriptions.cancel(subscription.stripeSubscriptionId);

      // Update in our database
      const updatedSubscription = await storage.cancelSubscription(subscription.id);

      // Remove subscription tier from user
      await storage.updateUserSubscriptionTier(userId, null);

      res.json({
        message: "Subscription cancelled successfully",
        subscription: updatedSubscription,
      });
    } catch (error: any) {
      console.error("Subscription cancellation error:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // Stripe webhook handler for subscription events
  app.post("/api/subscriptions/webhook", async (req: Request, res: Response) => {
    const sig = req.headers["stripe-signature"] as string;

    try {
      const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET || "whsec_test");

      console.log(`Received webhook event: ${event.type}`);

      // Handle the event
      switch (event.type) {
        case "customer.subscription.created":
          // Just log this event, we don't need to take action as we already created our record
          console.log(`Subscription created in Stripe: ${(event.data.object as Stripe.Subscription).id}`);
          break;

        case "customer.subscription.updated":
          const updatedSubscription = event.data.object as Stripe.Subscription;
          console.log(`Subscription ${updatedSubscription.id} was updated. Status: ${updatedSubscription.status}`);

          try {
            // Find the subscription in our database
            const dbSubscription = await storage.findSubscriptionByStripeId(updatedSubscription.id);

            if (dbSubscription) {
              // Update status
              await storage.updateSubscription(dbSubscription.id, {
                status: updatedSubscription.status,
              });

              // Update user subscription tier if the status is active
              if (updatedSubscription.status === "active") {
                await storage.updateUserSubscriptionTier(dbSubscription.userId, dbSubscription.tier);
                console.log(`User ${dbSubscription.userId} subscription updated to ${dbSubscription.tier}`);
              } else if (updatedSubscription.status === "canceled" || updatedSubscription.status === "unpaid") {
                // Remove subscription tier if canceled or unpaid
                await storage.updateUserSubscriptionTier(dbSubscription.userId, null);
                console.log(`User ${dbSubscription.userId} subscription removed due to status: ${updatedSubscription.status}`);
              }
            }
          } catch (error) {
            console.error("Error processing subscription update:", error);
          }
          break;

        case "customer.subscription.deleted":
          const deletedSubscription = event.data.object as Stripe.Subscription;
          console.log(`Subscription ${deletedSubscription.id} was deleted`);

          try {
            // Find the subscription in our database
            const dbSubscription = await storage.findSubscriptionByStripeId(deletedSubscription.id);

            if (dbSubscription) {
              // Mark as canceled in our database
              await storage.updateSubscription(dbSubscription.id, {
                status: "canceled",
                endDate: new Date(),
              });

              // Remove subscription tier from user
              await storage.updateUserSubscriptionTier(dbSubscription.userId, null);
              console.log(`User ${dbSubscription.userId} subscription removed due to deletion`);
            }
          } catch (error) {
            console.error("Error processing subscription deletion:", error);
          }
          break;

        case "invoice.payment_succeeded":
          const invoice = event.data.object as Stripe.Invoice;
          if (invoice.subscription) {
            console.log(`Payment succeeded for subscription ${invoice.subscription}`);

            try {
              // Find the subscription in our database
              const dbSubscription = await storage.findSubscriptionByStripeId(invoice.subscription as string);

              if (dbSubscription) {
                // Update status to active
                await storage.updateSubscription(dbSubscription.id, {
                  status: "active",
                });

                // Update user's subscription tier
                await storage.updateUserSubscriptionTier(dbSubscription.userId, dbSubscription.tier);
                console.log(`User ${dbSubscription.userId} subscription activated after payment`);
              }
            } catch (error) {
              console.error("Error processing payment success:", error);
            }
          }
          break;

        case "invoice.payment_failed":
          const failedInvoice = event.data.object as Stripe.Invoice;
          if (failedInvoice.subscription) {
            console.log(`Payment failed for subscription ${failedInvoice.subscription}`);

            try {
              const dbSubscription = await storage.findSubscriptionByStripeId(failedInvoice.subscription as string);

              if (dbSubscription) {
                // Mark as past_due or unpaid in our database
                await storage.updateSubscription(dbSubscription.id, {
                  status: "past_due",
                });

                // Remove subscription tier from user if it was previously active
                if (dbSubscription.status === "active") {
                  await storage.updateUserSubscriptionTier(dbSubscription.userId, null);
                  console.log(`User ${dbSubscription.userId} subscription deactivated due to payment failure`);
                }
              }
            } catch (error) {
              console.error("Error processing payment failure:", error);
            }
          }
          break;

        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      res.json({ received: true });
    } catch (err: any) {
      console.error("Webhook error:", err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
