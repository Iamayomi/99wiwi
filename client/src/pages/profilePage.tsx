import { useAuth } from "@/hooks/use-auth";
import ButtomBar from "@/components/layouts/bottom-bar";
import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";
import { Link } from "wouter";
import RewardsPage from "./rewards-page";
import Footer from "@/components/HeroPage/Footer";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <ButtomBar>
      <div className="w-full max-w-[1400px] px-4 md:px-6 py-4 mx-auto overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-[#2A2A2A] to-[#1E1E1E] border border-[#333333] p-6 rounded-xl mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#5465FF] opacity-10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#00E701] opacity-10 rounded-full -ml-10 -mb-10"></div>

          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-2">
              Hello, {user?.username || "Player"} 👋
            </h2>
            <p className="text-gray-400 max-w-xl mb-4">
              Manage your profile, view your subscription status, and update
              account preferences.
            </p>

            {user?.subscriptionTier ? (
              <div
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full 
              bg-gradient-to-r from-amber-900/60 to-yellow-800/60 border border-amber-700/60 text-amber-300 text-sm font-medium"
              >
                <Crown className="h-4 w-4 text-yellow-500" />
                {user.subscriptionTier.charAt(0).toUpperCase() +
                  user.subscriptionTier.slice(1)}{" "}
                VIP
              </div>
            ) : (
              <Link href="/subscriptions">
                <Button className="bg-yellow-600 hover:bg-yellow-500 text-white mt-2">
                  <Crown className="h-4 w-4 mr-2" />
                  Upgrade to VIP
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Profile Details */}
        <div className="bg-[#1E1E1E] border border-[#333333] p-6 rounded-xl">
          <h3 className="text-lg font-heading font-bold mb-4">
            Account Information
          </h3>
          <div className="space-y-2 text-sm text-gray-300">
            <p>
              <strong>Username:</strong> {user?.username}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>Subscription:</strong> {user?.subscriptionTier || "Free"}
            </p>
            <p>
              <strong>Joined:</strong>{" "}
              {new Date(user?.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* <div className="mt-6">
            <Link href="/settings">
              <Button
                variant="outline"
                className="text-gray-300 border-gray-500 hover:bg-gray-800"
              >
                Edit Profile
              </Button>
            </Link>
          </div> */}
        </div>

        <RewardsPage/>
      </div>
      <Footer />

    </ButtomBar>
  );
}
