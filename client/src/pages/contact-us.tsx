import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function ContactUsPage() {
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
            Contact Us
          </CardTitle>
          <p className="text-center text-muted-foreground mt-2">
            Have questions or need support? Reach out to us through any of the
            methods below.
          </p>
        </CardHeader>

        <CardContent className="prose dark:prose-invert max-w-none text-white">
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-700 text-left">
              <thead className="bg-blue-800">
                <tr>
                  <th className="px-4 py-3 border-b border-gray-700">Method</th>
                  <th className="px-4 py-3 border-b border-gray-700">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-900 transition-colors">
                  <td className="px-4 py-3 border-b border-gray-700">Email</td>
                  <td className="px-4 py-3 border-b border-gray-700">
                    <a
                      href="mailto:support@99wiwi.com"
                      className="text-primary hover:underline"
                    >
                      support@99wiwi.com
                    </a>
                  </td>
                </tr>
                <tr className="hover:bg-gray-900 transition-colors">
                  <td className="px-4 py-3 border-b border-gray-700">Phone</td>
                  <td className="px-4 py-3 border-b border-gray-700">
                    <a
                      href="tel:+12345678999"
                      className="text-primary hover:underline"
                    >
                      +1 (234) 567-8999
                    </a>
                  </td>
                </tr>
                <tr className="hover:bg-gray-900 transition-colors">
                  <td className="px-4 py-3 border-b border-gray-700">
                    Live Chat
                  </td>
                  <td className="px-4 py-3 border-b border-gray-700">
                    Available 24/7 inside the app for real-time assistance.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <Separator className="my-6" />

          <p className="text-center">
            Our support team is available 24 hours a day, 7 days a week. We
            typically respond within a few hours.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
