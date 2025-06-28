import { useState, useEffect } from "react";
import axios from "axios";
import MainLayout from "@/components/layouts/main-layout";
import PurchaseHistory from "@/components/HeroPage/purchase-hstory";
import { ProtectedRoute } from "@/lib/protected-route";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Coins, Loader2, Home, Check, AlertCircle, ArrowLeft, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import CoinPackages from "@/components/coin-packages";
import { useLocation } from "wouter";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/hooks/use-auth";
import { Progress } from "@/components/ui/progress";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface CoinPackage {
  id: string;
  name: string;
  coins: number;
  price: number;
  featured: boolean;
  discount: number;
}

interface PaymentResponse {
  paymentUrl: string;
  payAddress: string;
  paymentId: string;
  packageDetails: CoinPackage;
}

enum PurchaseStep {
  SELECT_PACKAGE = "select_package",
  PROCESSING = "processing",
  SUCCESS = "success",
}

export function PurchasePage() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [step, setStep] = useState<PurchaseStep>(PurchaseStep.SELECT_PACKAGE);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("btc");
  const [progressValue, setProgressValue] = useState(33);

  // Available cryptocurrencies
  const availableCurrencies = [
    { code: "btc", name: "Bitcoin", symbol: "₿" },
    { code: "eth", name: "Ethereum", symbol: "Ξ" },
    { code: "ltc", name: "Litecoin", symbol: "Ł" },
    { code: "usdt", name: "Tether", symbol: "₮" },
    { code: "usdc", name: "USD Coin", symbol: "$" },
  ];

  // Update progress bar based on current step
  useEffect(() => {
    if (step === PurchaseStep.SELECT_PACKAGE) setProgressValue(33);
    else if (step === PurchaseStep.PROCESSING) setProgressValue(66);
    else if (step === PurchaseStep.SUCCESS) setProgressValue(100);
  }, [step]);

  // Handle payment status from redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentStatus = params.get("payment_status");

    if (paymentStatus === "finished") {
      setStep(PurchaseStep.SUCCESS);
      toast({
        title: "Payment Successful!",
        description: "Your coins have been added to your wallet.",
      });
      // Clean up URL
      navigate("/purchase", { replace: true });
    } else if (paymentStatus === "failed" || paymentStatus === "expired") {
      toast({
        title: "Payment Failed",
        description: "Payment was not completed. Please try again.",
        variant: "destructive",
      });
      setStep(PurchaseStep.SELECT_PACKAGE);
      navigate("/purchase", { replace: true });
    }
  }, [navigate, toast]);

  const { mutate: createPayment, isPending: isCreatingPayment } = useMutation({
    mutationFn: async (packageId: string) => {
      const response = await axios.post(
        "/api/wallets/create-payment-intent",
        {
          packageId: packageId,
          payCurrency: selectedCurrency,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data as PaymentResponse;
    },
    onSuccess: (data: PaymentResponse) => {
      // Redirect to NowPayments
      window.location.href = data.paymentUrl;
    },
    onError: (error: any) => {
      console.error("Payment creation failed:", error);
      toast({
        title: "Payment Setup Failed",
        description: error.response?.data?.error || "Could not initialize payment. Please try again.",
        variant: "destructive",
      });
      setStep(PurchaseStep.SELECT_PACKAGE);
    },
  });

  const { mutate: verifyPayment, isPending: isVerifying } = useMutation({
    mutationFn: async (paymentId: string) => {
      const response = await axios.get(`/api/wallets/payment-status/${paymentId}`);
      return response.data;
    },
    onSuccess: () => {
      setStep(PurchaseStep.SUCCESS);
      toast({
        title: "Payment Verified!",
        description: "Your coins have been added to your account.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Verification Failed",
        description: error.response?.data?.error || "Could not verify payment.",
        variant: "destructive",
      });
    },
  });

  const handleSelectPackage = (packageId: string) => {
    setSelectedPackageId(packageId);
    setStep(PurchaseStep.PROCESSING);
    createPayment(packageId);
  };

  const handleRetry = () => {
    setStep(PurchaseStep.SELECT_PACKAGE);
    setSelectedPackageId(null);
  };

  return (
    <>
      <div className="w-full max-w-7xl mx-auto py-6 px-8 md:px-6">
        {/* Top navigation bar */}
        <div className="flex justify-between items-center mb-8">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Games
          </Button>
          <div className="flex items-center">
            <span className="text-sm font-medium mr-2">Current Balance:</span>
            <div className="flex items-center bg-muted/30 px-3 py-1 rounded-lg">
              <Coins className="h-4 w-4 text-yellow-500 mr-1" />
              <div className="font-semibold">{user?.balance ? parseFloat(user.balance.toString()).toLocaleString() : 0}</div>
            </div>
          </div>
        </div>
        {/* Progress tracker */}
        <div className="mb-8">
          <div className="flex justify-between mb-2 text-sm">
            <div className={`flex flex-col items-center ${step === PurchaseStep.SELECT_PACKAGE ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${step === PurchaseStep.SELECT_PACKAGE ? "bg-primary text-primary-foreground" : "bg-muted"}`}>1</div>
              <span>Select Package</span>
            </div>
            <div className={`flex flex-col items-center ${step === PurchaseStep.PROCESSING ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${step === PurchaseStep.PROCESSING ? "bg-primary text-primary-foreground" : "bg-muted"}`}>2</div>
              <span>Payment</span>
            </div>
            <div className={`flex flex-col items-center ${step === PurchaseStep.SUCCESS ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${step === PurchaseStep.SUCCESS ? "bg-primary text-primary-foreground" : "bg-muted"}`}>3</div>
              <span>Complete</span>
            </div>
          </div>
          <Progress value={progressValue} className="h-2" />
        </div>
        {/* Page title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            {step === PurchaseStep.SELECT_PACKAGE && "Choose a Coin Package"}
            {step === PurchaseStep.PROCESSING && "Processing Payment"}
            {step === PurchaseStep.SUCCESS && "Purchase Complete!"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {step === PurchaseStep.SELECT_PACKAGE && "Select the coin package that best suits your needs"}
            {step === PurchaseStep.PROCESSING && "Redirecting to secure payment..."}
            {step === PurchaseStep.SUCCESS && "Your coins have been added to your account"}
          </p>
        </div>
        {/* Main content card */}
        <Card className="border shadow-md bg-card mb-8">
          <CardContent className="p-6 md:p-8">
            {step === PurchaseStep.SELECT_PACKAGE && (
              <>
                <Alert className="mb-6 bg-blue-500/10 text-blue-500 border-blue-500/30">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Secure Payments</AlertTitle>
                  <AlertDescription>Choose a package and pay securely with your preferred cryptocurrency.</AlertDescription>
                </Alert>

                {/* Currency Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-3">Select Payment Currency:</label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {availableCurrencies.map((currency) => (
                      <button
                        key={currency.code}
                        onClick={() => setSelectedCurrency(currency.code)}
                        className={`p-3 rounded-lg border-2 transition-all ${selectedCurrency === currency.code ? "border-primary bg-primary/10 text-primary" : "border-muted hover:border-primary/50"}`}>
                        <div className="text-lg font-bold">{currency.symbol}</div>
                        <div className="text-xs">{currency.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <CoinPackages onSelectPackage={handleSelectPackage} />
              </>
            )}

            {step === PurchaseStep.PROCESSING && (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Setting up your payment...</h3>
                <p className="text-muted-foreground text-center mb-6">You will be redirected to our secure payment processor in a moment.</p>
                {isCreatingPayment && <div className="text-sm text-muted-foreground">This may take a few seconds...</div>}
              </div>
            )}

            {step === PurchaseStep.SUCCESS && (
              <div className="max-w-2xl mx-auto text-center">
                <div className="mb-8 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mb-4">
                    <Check className="h-10 w-10" />
                  </div>
                  <h2 className="text-2xl font-bold text-green-500 mb-2">Thank You for Your Purchase!</h2>
                  <p className="text-muted-foreground">Your coins have been successfully added to your account balance.</p>
                </div>

                <div className="bg-muted/30 rounded-lg p-6 mb-8 inline-block">
                  <div className="flex items-center justify-center mb-2">
                    <Coins className="h-6 w-6 text-yellow-500 mr-2" />
                    <span className="text-xl font-semibold">Updated Balance</span>
                  </div>
                  <p className="text-3xl font-bold">{user?.balance ? parseFloat(user.balance.toString()).toLocaleString() : 0} coins</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" onClick={() => navigate("/")} className="sm:px-8">
                    <Home className="mr-2 h-4 w-4" />
                    Start Playing
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => setStep(PurchaseStep.SELECT_PACKAGE)} className="sm:px-8">
                    <Coins className="mr-2 h-4 w-4" />
                    Buy More Coins
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        <PurchaseHistory />
        {/* Footer information */}
        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Important Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">About Virtual Currency</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Coins are virtual currency used only within this platform</li>
                  <li>Virtual currency has no real-world value or exchange rate</li>
                  <li>All purchases are final and non-refundable</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Support & Security</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Payments processed securely through NowPayments</li>
                  <li>Coins added automatically after payment confirmation</li>
                  <li>Contact support for any payment issues</li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0 text-xs text-muted-foreground">
            By making a purchase, you agree to our{" "}
            <a href="/terms-of-service" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy-policy" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default function ProtectedPurchase() {
  return <ProtectedRoute path="/purchase" component={PurchasePage} />;
}
