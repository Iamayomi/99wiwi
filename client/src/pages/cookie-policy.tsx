import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function CookiePolicyPage() {
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
            Cookie Policy
          </CardTitle>
          <p className="text-center text-muted-foreground mt-2">
            Last Updated: June 23, 2025
          </p>
        </CardHeader>

        <CardContent className="prose dark:prose-invert max-w-none text-white">
          <h2 className="text-xl text-white font-semibold mb-3">
            1. What Are Cookies?
          </h2>
          <p>
            Cookies are small text files stored on your device when you visit
            our website or use our application. They help us enhance your user
            experience, remember preferences, and understand how our platform is
            being used.
          </p>

          <Separator className="my-6" />

          <h2 className="text-xl text-white font-semibold mb-3">
            2. How We Use Cookies
          </h2>
          <p>We use cookies for the following purposes:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong className="text-white">Essential Cookies:</strong>{" "}
              Necessary for the proper functioning of our platform.
            </li>
            <li>
              <strong className="text-white">Performance Cookies:</strong> Help
              us understand user interactions and improve our services.
            </li>
            <li>
              <strong className="text-white">Functional Cookies:</strong>{" "}
              Remember your preferences and settings.
            </li>
            <li>
              <strong className="text-white">Advertising Cookies:</strong>{" "}
              Deliver relevant ads and marketing content.
            </li>
          </ul>

          <Separator className="my-6" />

          <h2 className="text-xl text-white font-semibold mb-3">
            3. Third-Party Cookies
          </h2>
          <p>
            We may allow third-party service providers, such as analytics or
            advertising partners, to place cookies on your device. These cookies
            are governed by the privacy policies of those third parties.
          </p>

          <Separator className="my-6" />

          <h2 className="text-xl text-white font-semibold mb-3">
            4. Managing Cookies
          </h2>
          <p>
            You can manage or disable cookies through your browser settings.
            However, please note that disabling certain cookies may affect your
            ability to use parts of our platform.
          </p>

          <Separator className="my-6" />

          <h2 className="text-xl text-white font-semibold mb-3">5. Consent</h2>
          <p>
            By using our website or application, you consent to our use of
            cookies as outlined in this policy. You may withdraw your consent at
            any time by adjusting your browser settings.
          </p>

          <Separator className="my-6" />

          <h2 className="text-xl text-white font-semibold mb-3">
            6. Changes to This Policy
          </h2>
          <p>
            We may update this Cookie Policy from time to time. All changes will
            be posted on this page with the updated date.
          </p>

          <Separator className="my-6" />

          <h2 className="text-xl text-white font-semibold mb-3">
            7. Contact Us
          </h2>
          <p>
            If you have any questions or concerns about our use of cookies,
            please contact us at:
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
