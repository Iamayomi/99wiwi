import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function HowToBetPage() {
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
            How to Place a Bet
          </CardTitle>
          <p className="text-center text-muted-foreground mt-2">
            Follow these simple steps to start playing and winning.
          </p>
        </CardHeader>

        <CardContent className="prose dark:prose-invert max-w-none text-white">
          <h2 className="text-xl text-white font-semibold mb-3">
            Step-by-Step Guide
          </h2>
          <ol className="list-decimal pl-6 mb-4">
            <li>
              <strong className="text-white">
                Create or Login into Your Account:
              </strong>{" "}
              Before placing a bet, you must be a registered user. Sign up or
              log in to your 99WiWi Casino Game account.
            </li>
            <li>
              <strong className="text-white">Fund Your Wallet:</strong> Ensure
              you have sufficient balance in your in-game wallet. You can top up
              using the available payment method.
            </li>
            <li>
              <strong className="text-white">Choose Your Game:</strong> Browse
              through our exciting selection of games and select the one you'd
              like to bet on.
            </li>
            <li>
              <strong className="text-white">Select Your Bet Amount:</strong>{" "}
              Use the on-screen slider or enter the exact amount you wish to
              wager.
            </li>
            <li>
              <strong className="text-white">Place Your Bet:</strong> Click the
              "Place Bet" button to confirm. You’ll receive an immediate
              confirmation once your bet is accepted.
            </li>
            <li>
              <strong className="text-white">Watch the Game & Win:</strong>{" "}
              Enjoy the game in real-time and see if your prediction or strategy
              wins you big!
            </li>
          </ol>

          <Separator className="my-6" />

          <h2 className="text-xl text-white font-semibold mb-3">
            Tips for Better Betting
          </h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Start with smaller bets to understand the game mechanics.</li>
            <li>Set a budget and stick to it—always play responsibly.</li>
            <li>Use game history and statistics to inform your bets.</li>
          </ul>

          <Separator className="my-6" />

          <h2 className="text-xl text-white font-semibold mb-3">
            Having Trouble?
          </h2>
          <p>
            If you're experiencing issues placing a bet, contact our support
            team at{" "}
            <a
              href="mailto:support@99wiwi.com"
              className="text-primary hover:underline"
            >
              support@99wiwi.com
            </a>{" "}
            or use the in-app live chat for assistance.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
