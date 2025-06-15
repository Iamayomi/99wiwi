import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function AboutUsPage() {
  return (
    <div className="container text-white mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-6 text-white">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </div>

      <Card className="mb-8 text-white">
        <CardHeader className="pb-3 text-white">
          <CardTitle className="text-2xl md:text-3xl font-bold text-center">
            About Us
          </CardTitle>
          <p className="text-center text-muted-foreground mt-2">
            99WiWi – Where Casino Excitement Meets Real Rewards!
          </p>
        </CardHeader>

        <CardContent className="prose dark:prose-invert max-w-none text-white">
          <h2 className="text-xl text-white font-semibold mb-3">Our Mission</h2>
          <p>
            At <strong className="text-white">99WiWi</strong>, we're redefining the way you experience
            online casino gaming. We aim to provide a thrilling, secure, and
            fair environment where users can play for real money, enjoy dynamic
            gameplay, and become part of a vibrant gaming community.
          </p>

          <Separator className="my-6" />

          <h2 className="text-xl text-white font-semibold mb-3">
            What We Offer
          </h2>
          <ul className="list-disc pl-6 mb-4">
            <li>🎰 A wide selection of real-money casino games</li>
            <li>🔒 Safe and secure transactions</li>
            <li>⚡ Fast payouts and responsive support</li>
            <li>📱 Seamless mobile gameplay on all devices</li>
            <li>🎁 Exciting rewards, bonuses, and tournaments</li>
          </ul>

          <Separator className="my-6" />

          <h2 className="text-xl text-white font-semibold mb-3">
            Fairness & Responsibility
          </h2>
          <p>
            We’re committed to responsible gaming. 99WiWi promotes fair play and
            encourages players to manage their gaming time and budgets wisely.
            Our platform is built with transparency and integrity at its core.
          </p>

          <Separator className="my-6" />

          <h2 className="text-xl text-white font-semibold mb-3">
            Why Choose 99WiWi?
          </h2>
          <p>
            With cutting-edge technology, secure infrastructure, and an engaging
            user interface, we deliver an online casino experience that’s fast,
            fun, and reliable. Join thousands of satisfied users who trust
            99WiWi for high-stakes excitement and real rewards.
          </p>

          <Separator className="my-6" />

          <h2 className="text-xl text-white font-semibold mb-3">
            Get in Touch
          </h2>
          <p>
            Have questions or suggestions? We’re here for you:
            <br />
            <a
              href="mailto:support@99wiwi.com"
              className="text-primary hover:underline"
            >
              support@99wiwi.com
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
