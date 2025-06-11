import React from "react";
import TopBarMenu from "@/components/HeroPage/TopBarMenu";
import Leaderboard from "@/components/HeroPage/leaderboard";
import Mainpage from "@/components/HeroPage/middle/Mainpage";
import Footer from "@/components/HeroPage/Footer";
// import BottomNav from "@/components/HeroPage/BottomNav";
// import MainLayout from "@/components/layouts/main-layout";
import GamingUI from "@/components/HeroPage/gamesUI";

const home = () => {
  return (
    <section className="w-full font-poppins">
      <TopBarMenu />
      {/* --------------computer-version---------------- */}
      <section className="xl:flex w-full h-full justify-center">
        <div className="w-1/5 h-full hidden md:block m-5">
          <Leaderboard />
        </div>
        <Mainpage />
        {/* <Rightside /> */}
      </section>
      <div className="">
        <GamingUI />
      </div>

      <Footer />
      {/* <BottomNav /> */}
    </section>
  );
};

export default home;
