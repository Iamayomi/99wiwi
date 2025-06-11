import React, { useState } from "react";
import { Link } from "wouter";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import logo from "../../logo.png";

const TopBarMenu: React.FC = () => {
  const [language, setLanguage] = useState("en");

  return (
    <>
      {/* Desktop Topbar Menu */}
      <div className="hidden xl:block bg-[#212121] z-[100]">
        <div className="container flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center">
            <img className="w-24" src={logo} alt="99wiwi Logo" />
          </Link>
          <div className="flex items-center gap-4">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[120px] bg-[#1E1E2D] border-gray-700 text-white">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="pt">Portuguese</SelectItem>
              </SelectContent>
            </Select>
            <Link href="/auth">
              <div className="px-4 py-2 text-[15px] text-white bg-[#CF2728] hover:bg-[#e94848] rounded-sm cursor-pointer transition-all">Get Started</div>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="xl:hidden bg-[#212121] px-4 py-3">
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img src={logo} className="w-[70px]" alt="99wiwi Logo" />
          </Link>
          <div className="flex items-center gap-3">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[100px] bg-[#1E1E2D] border-gray-700 text-white text-xs">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="pt">Portuguese</SelectItem>
              </SelectContent>
            </Select>
            <Link href="/auth">
              <div className="px-4 py-2 text-xs text-white bg-[#CF2728] hover:bg-[#e94848] rounded-sm cursor-pointer transition-all">Get Started</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBarMenu;
