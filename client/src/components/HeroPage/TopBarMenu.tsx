import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import logo from "../../logo.png";
import { Link } from "wouter";

// Real-time clock component
const Clock: React.FC = () => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span className="lg:block hidden text-[14px]">{time}</span>;
};

const TopBarMenu: React.FC = () => {
  return (
    <div className="bg-[#212121] z-[100]">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4">
        {/* First Group: Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex-shrink-0">
            <img className="w-24 xl:w-28" src={logo} alt="Logo" />
          </Link>
        </div>

        {/* Second Group: Clock, Language, Button */}
        <div className="flex items-center gap-5">
          {/* Real-time Clock */}
          <Clock />

          {/* Language Selector */}
          <div className="lg:flex hidden items-center gap-1 text-[14px] cursor-pointer hover:text-gray-300">
            <span>EN</span>
            <FaChevronDown size={15} />
          </div>

          {/* Button */}
          <Link to="/auth" className="start">
            <div className="px-4 py-2 text-[15px] text-white bg-[#CF2728] hover:bg-[#4d4c4c] rounded-sm cursor-pointer transition-all">
              Get started
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopBarMenu;
