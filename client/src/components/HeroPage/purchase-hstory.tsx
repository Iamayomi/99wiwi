import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MainLayout from "@/components/layouts/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/hooks/use-auth";
import { format } from "date-fns";

interface Payment {
  id: string;
  orderId: string;
  amount: string;
  coins: string;
  status: string;
  createdAt: Date;
}

export default function PurchaseHistory() {
  const { toast }: any = useToast();
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [page, setPage] = useState(1);
  const limit = 10;

  // Fetch user payments using useQuery
  const {
    data: payments,
    isLoading,
    error,
    refetch,
  } = useQuery<Payment[], Error>({
    queryKey: ["userPayments", user?.id, page],
    queryFn: async () => {
      const response = await axios.get(`/api/coins/purchases?userId=${user?.id}&limit=${limit}&page=${page}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data.payments as Payment[];
    },
    enabled: !!user?.id,
    retry: 1,
  });

  // Handle errors
  useEffect(() => {
    if (error) {
      toast({
        title: "Error Fetching Payments",
        description: error.message || "Could not load payment history. Please try again.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  return (
    <div className="w-full max-w-7xl mx-auto py-6 px-4 md:px-6">
      {/* Top navigation bar
      <div className="flex justify-between items-center mb-8">
        <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </div> */}

      {/* Page title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Purchase History</h1>
        <p className="text-muted-foreground mt-2">View your recent coin purchase transactions</p>
      </div>

      {/* Main content card */}
      <Card className="border shadow-md bg-card mb-8">
        <CardHeader>
          <CardTitle>Transactions History</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex justify-center py-12">
              <div className="text-muted-foreground">Loading payments...</div>
            </div>
          )}

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error.message || "Failed to load payment history. Please try again."}</AlertDescription>
            </Alert>
          )}

          {!isLoading && !error && payments?.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No purchase history found.</p>
              <Button variant="outline" className="mt-4" onClick={() => navigate("/purchase")}>
                Purchase Coins
              </Button>
            </div>
          )}

          {!isLoading && !error && payments && payments.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 font-semibold">Payment ID</th>
                    <th className="py-3 px-4 font-semibold">Order ID</th>
                    <th className="py-3 px-4 font-semibold">Amount</th>
                    <th className="py-3 px-4 font-semibold">Coins</th>
                    <th className="py-3 px-4 font-semibold">Status</th>
                    <th className="py-3 px-4 font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment, xId) => (
                    <tr key={payment.id} className="border-b">
                      <td className="py-3 px-4">{xId + 1}</td>
                      <td className="py-3 px-4">{payment.orderId}</td>
                      <td className="py-3 px-4">${parseFloat(payment.amount).toFixed(2)}</td>
                      <td className="py-3 px-4">{parseInt(payment.coins).toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                            payment.status === "finished" || payment.status === "confirmed"
                              ? "bg-green-500/20 text-green-500"
                              : payment.status === "pending"
                                ? "bg-yellow-500/20 text-yellow-500"
                                : "bg-red-500/20 text-red-500"
                          }`}>
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4">{format(new Date(payment.createdAt), "PPP p")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {payments && payments.length > 0 && (
        <div className="flex justify-between items-center">
          <Button variant="outline" disabled={page === 1} onClick={() => setPage((prev) => prev - 1)}>
            Previous
          </Button>
          <span>Page {page}</span>
          <Button variant="outline" disabled={payments.length < limit} onClick={() => setPage((prev) => prev + 1)}>
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
