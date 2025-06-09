import React from "react";
import TopBarMenu from "@/components/HeroPage/TopBarMenu";
import Leaderboard from "@/components/HeroPage/leaderboard";
import Mainpage from "@/components/HeroPage/middle/Mainpage";
import Footer from "@/components/HeroPage/Footer";
import BottomNav from "@/components/HeroPage/BottomNav";
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
      {/* <div className="md:p-10 md:m-10">
        <GamingUI />
      </div> */}

      <div className="md:p-10 md:mx-10">
        <Footer />
      </div>
      <BottomNav />
    </section>
  );
};

export default home;
