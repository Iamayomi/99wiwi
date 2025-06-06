import { Link } from "react-router-dom";
import React from "react";

const FooterMenu: React.FC = () => {
  return (
    <div className="p-4 text-sm text-white bg-[#212121] rounded-md">
      <div className="flex justify-around flex-wrap gap-6 w-full">
        <div className="space-y-2 hidden md:block">
          <h2 className="text-md font-bold">99wiwi</h2>
          <div>
            <div className="p-0.5 text-sm hover:text-[#c2c2c2] duration-300">
              About us
            </div>
            <div className="p-0.5 text-sm hover:text-[#c2c2c2] duration-300">
              Terms and Conditions
            </div>
            <div className="p-0.5 text-sm hover:text-[#c2c2c2] duration-300">
              Affiliate Program
            </div>
            <div className="p-0.5 text-sm hover:text-[#c2c2c2] duration-300">
              Become an agent
            </div>
            <div className="p-0.5 text-sm hover:text-[#c2c2c2] duration-300">
              Сookie Policy
            </div>
            <div className="p-0.5 text-sm hover:text-[#c2c2c2] duration-300">
              Contacts
            </div>
            <div className="p-0.5 text-sm hover:text-[#c2c2c2] duration-300">
              How to place a bet
            </div>
          </div>
        </div>

        <div className="space-y-2 hidden md:block">
          <h2 className="text-md font-bold">Betting</h2>
          <div>
            <div className="p-0.5 text-sm hover:text-[#c2c2c2] duration-300">
              Sports
            </div>
            <div className="p-0.5 text-sm hover:text-[#c2c2c2] duration-300">
              Multi-LIVE
            </div>
            <div className="p-0.5 text-sm hover:text-[#c2c2c2] duration-300">
              Live
            </div>
            <div className="p-0.5 text-sm hover:text-[#c2c2c2] duration-300">
              Toto
            </div>
          </div>
        </div>

        <div className="space-y-2 hidden md:block">
          <h2 className="text-md font-bold">Games</h2>
          <div>
            <div className="p-0.5 text-sm hover:text-[#c2c2c2] duration-300">
              Slots
            </div>
            <div className="p-0.5 text-sm hover:text-[#c2c2c2] duration-300">
              Fast Games
            </div>
            <div className="p-0.5 text-sm hover:text-[#c2c2c2] duration-300">
              Live Casino
            </div>
          </div>
        </div>

        <div className="space-y-2 hidden md:block">
          <h2 className="text-md font-bold">Statistics</h2>
          <div>
            <div className="p-0.5 text-sm hover:text-[#c2c2c2] duration-300">
              Statistics
            </div>
            <div className="p-0.5 text-sm hover:text-[#c2c2c2] duration-300">
              Results
            </div>
          </div>
        </div>

        <div className="space-y-2 hidden md:block">
          <h2 className="text-md font-bold">Useful links</h2>
          <div>
            <div className="p-0.5 text-sm hover:text-[#c2c2c2] duration-300">
              Mobile version
            </div>
            <div className="p-0.5 text-sm hover:text-[#c2c2c2] duration-300">
              Registration
            </div>
            <div className="p-0.5 text-sm hover:text-[#c2c2c2] duration-300">
              Partnership
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterMenu;
