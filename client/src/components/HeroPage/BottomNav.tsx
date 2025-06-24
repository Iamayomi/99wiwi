import { useEffect, useState } from "react";
import { FaHome, FaTrophy, FaUserCircle } from "react-icons/fa";
import { MdCasino } from "react-icons/md";

import Leaderboard from "@/components/HeroPage/leaderboard";

const BottomNav = () => {
  const [activeTab, setActiveTab] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const navItems = [
    { id: "home", label: "Home", icon: <FaHome />, href: "/home" },
    {
      id: "casino",
      label: "Live Casino",
      icon: <MdCasino />,
      href: "/livecasino",
    },
    {
      id: "leaderboard",
      label: "Leaderboard",
      icon: <FaTrophy />,
      href: "/leaderboard",
      component: Leaderboard,
    },
    {
      id: "profile",
      label: "Profile",
      icon: <FaUserCircle />,
      href: "/auth",
      hidden: !!user,
    },
  ];

  return (
    <div className="fixed lg:hidden z-[1000] bottom-0 left-0 right-0 bg-background border-t border-gray-800 shadow-md py-2 px-4 flex justify-around items-end">
      {navItems.map((item) => {
        if (item.hidden) return null;

        return (
          <a href={item.href} key={item.id} className="flex flex-col items-center px-2 py-1 transition-all text-gray-500 hover:text-yellow-400" onClick={() => setActiveTab(item.id)}>
            <div className="text-[16px]">{item.icon}</div>
            <span className="text-[12px] mt-1">{item.label}</span>
          </a>
        );
      })}
    </div>
  );
};

export default BottomNav;
