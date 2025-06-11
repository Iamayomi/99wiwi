import Leaderboard from "@/components/HeroPage/leaderboard";
import MainLayout from "@/components/layouts/main-layout";
import { useAuth } from "@/hooks/use-auth";

export default function LeaderBoardPage() {
  const { user } = useAuth();

  return (
    <>
      <MainLayout>{user && <Leaderboard />}</MainLayout>
    </>
  );
}
