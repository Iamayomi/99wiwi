import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import BottomBar from "@/components/layouts/bottom-bar";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SettingPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [pendingUpdate, setPendingUpdate] = useState<any>(null);

  // Validate form fields
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!username) newErrors.username = "Username is required";
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format";
    if (newPassword && !currentPassword) newErrors.currentPassword = "Current password is required to update password";
    if (newPassword && newPassword !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (newPassword && newPassword.length < 8) newErrors.newPassword = "Password must be at least 8 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: async (updateData: any) => {
      return await apiRequest("PATCH", "http://localhost:8080/api/user/profile", updateData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user/profile"] });
      toast({
        title: "Success",
        description: "Profile updated successfully!",
        variant: "default",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setErrors({});
      setIsConfirmDialogOpen(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
      setIsConfirmDialogOpen(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast({
        title: "Error",
        description: "Please fix the errors in the form",
        variant: "destructive",
      });
      return;
    }

    const updateData: any = { username, email };
    if (newPassword) {
      updateData.currentPassword = currentPassword;
      updateData.newPassword = newPassword;
    }

    setPendingUpdate(updateData);
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmUpdate = () => {
    if (pendingUpdate) {
      mutate(pendingUpdate);
    }
  };

  return (
    <BottomBar>
      <div className="w-full max-w-[1400px] px-4 md:px-6 py-4 mx-auto overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2A2A2A] to-[#1E1E1E] border border-[#333333] p-6 rounded-xl mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#5465FF] opacity-10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#00E701] opacity-10 rounded-full -ml-10 -mb-10"></div>
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-2 text-gray-100">Edit Profile, {user?.username || "Player"} 👋</h2>
            <p className="text-gray-400 max-w-xl mb-4">Update your username, email, or password.</p>
          </div>
        </div>

        {/* Form */}
        <Card className="bg-[#1E1E1E] border-[#333333] rounded-xl">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl font-heading font-bold text-gray-100">Update Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-gray-300">
                  Username <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={cn(
                    "bg-[#2A2A2A] border-[#333333] text-gray-300 focus:border-[#5465FF] focus:ring-1 focus:ring-[#5465FF] transition-all duration-200",
                    errors.username && "border-red-500 focus:border-red-500 focus:ring-red-500"
                  )}
                  placeholder="Enter your username"
                />
                {errors.username && <p className="text-xs text-red-500">{errors.username}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-300">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={cn(
                    "bg-[#2A2A2A] border-[#333333] text-gray-300 focus:border-[#5465FF] focus:ring-1 focus:ring-[#5465FF] transition-all duration-200",
                    errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500"
                  )}
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-sm font-medium text-gray-300">
                  Current Password
                </Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className={cn(
                    "bg-[#2A2A2A] border-[#333333] text-gray-300 focus:border-[#5465FF] focus:ring-1 focus:ring-[#5465FF] transition-all duration-200",
                    errors.currentPassword && "border-red-500 focus:border-red-500 focus:ring-red-500"
                  )}
                  placeholder="Required for password change"
                />
                {errors.currentPassword && <p className="text-xs text-red-500">{errors.currentPassword}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-sm font-medium text-gray-300">
                  New Password
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={cn(
                    "bg-[#2A2A2A] border-[#333333] text-gray-300 focus:border-[#5465FF] focus:ring-1 focus:ring-[#5465FF] transition-all duration-200",
                    errors.newPassword && "border-red-500 focus:border-red-500 focus:ring-red-500"
                  )}
                  placeholder="Leave blank to keep unchanged"
                />
                {errors.newPassword && <p className="text-xs text-red-500">{errors.newPassword}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">
                  Confirm New Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={cn(
                    "bg-[#2A2A2A] border-[#333333] text-gray-300 focus:border-[#5465FF] focus:ring-1 focus:ring-[#5465FF] transition-all duration-200",
                    errors.confirmPassword && "border-red-500 focus:border-red-500 focus:ring-red-500"
                  )}
                  placeholder="Leave blank to keep unchanged"
                />
                {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
              </div>
              <div className="col-span-2 flex justify-end gap-2 mt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="text-gray-300 border-[#333333] hover:bg-[#2A2A2A]"
                  onClick={() => {
                    setUsername(user?.username || "");
                    setEmail(user?.email || "");
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                    setErrors({});
                  }}
                  disabled={isLoading}>
                  Reset
                </Button>
                <Button type="submit" className="bg-[#5465FF] hover:bg-[#4655D5] text-white flex items-center gap-2 transition-all duration-200" disabled={isLoading}>
                  {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Update Profile
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Confirmation Dialog */}
        <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
          <DialogContent className="bg-[#1E1E1E] border-[#333333] text-gray-100">
            <DialogHeader>
              <DialogTitle>Confirm Profile Update</DialogTitle>
              <DialogDescription className="text-gray-400">Please review your changes before updating your profile.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-300">Username</Label>
                <p className="text-gray-100">{pendingUpdate?.username}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-300">Email</Label>
                <p className="text-gray-100">{pendingUpdate?.email}</p>
              </div>
              {pendingUpdate?.newPassword && (
                <div>
                  <Label className="text-sm font-medium text-gray-300">New Password</Label>
                  <p className="text-gray-100">••••••••</p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" className="text-gray-300 border-[#333333] hover:bg-[#2A2A2A]" onClick={() => setIsConfirmDialogOpen(false)} disabled={isLoading}>
                Cancel
              </Button>
              <Button className="bg-[#5465FF] hover:bg-[#4655D5] flex items-center gap-2" onClick={handleConfirmUpdate} disabled={isLoading}>
                {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                Confirm Update
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </BottomBar>
  );
}
