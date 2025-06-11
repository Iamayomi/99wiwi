// import { useEffect, useState } from "react";
// import { FaHome, FaTrophy, FaUserCircle } from "react-icons/fa";
// import { MdCasino } from "react-icons/md";
// import { GiPineapple } from "react-icons/gi";
// import { MdOutlineDiamond } from "react-icons/md";
// import { BiDice5 } from "react-icons/bi";
// import { CgClose } from "react-icons/cg";
// import { Link } from "wouter";

// const BottomNav = () => {
//   const [activeTab, setActiveTab] = useState("");
//   const [user, setUser] = useState(null);
//   const [casinoOpen, setCasinoOpen] = useState(false);
//   const [sportsOpen, setSportsOpen] = useState(false);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const navItems = [
//     { id: "home", label: "Home", icon: <FaHome />, href: "/dashboard" },
//     {
//       id: "casino", // Changed from "livecasino" to "casino" for toggle consistency
//       label: "Live Casino",
//       icon: <MdCasino />,
//       href: "/casino",
//     },
//     {
//       id: "leaderboard",
//       label: "Leaderboard",
//       icon: <FaTrophy />,
//       href: "/leaderboard",
//     },
//     {
//       id: "profile",
//       label: "Profile",
//       icon: <FaUserCircle />,
//       href: "/auth",
//       hidden: !!user,
//     },
//   ];

//   const renderDropdown = (type: any) => {
//     if (type === "casino" && casinoOpen) {
//       return (
//         <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-t-lg py-3 px-4 z-50">
//           <ul className="flex flex-col items-center space-y-3 text-gray-700">
//             <li className="flex flex-col items-center hover:text-black cursor-pointer">
//               <GiPineapple className="text-xl" />
//               <span className="text-sm">Casino</span>
//             </li>
//             <li className="flex flex-col items-center hover:text-black cursor-pointer">
//               <MdOutlineDiamond className="text-xl" />
//               <span className="text-sm">Live Casino</span>
//             </li>
//             <li className="flex flex-col items-center hover:text-black cursor-pointer">
//               <BiDice5 className="text-xl" />
//               <span className="text-sm">Fast Games</span>
//             </li>
//             <button onClick={() => setCasinoOpen(false)} className="text-gray-500 hover:text-gray-800">
//               <CgClose className="text-2xl" />
//             </button>
//           </ul>
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="fixed lg:hidden z-[1000] bottom-0 left-0 right-0 bg-background border-t border-gray-800 shadow-md py-2 px-4 flex justify-around items-end">
//       {navItems.map((item) => {
//         if (item.hidden) return null;

//         return (
//           <Link href={item.href} key={item.id} className="relative">
//             <button
//               className={`flex flex-col items-center px-2 py-1 transition-all ${activeTab === item.id ? "text-yellow-400" : "text-gray-500"}`}
//               onClick={(e) => {
//                 e.preventDefault(); // prevent navigation when toggling dropdown
//                 setActiveTab(item.id);

//                 if (item.id === "casino") setCasinoOpen(!casinoOpen);
//                 else {
//                   setCasinoOpen(false);
//                   setSportsOpen(false);
//                 }
//               }}>
//               <div className="text-[16px]">{item.icon}</div>
//               <span className="text-[12px] mt-1">{item.label}</span>
//             </button>

//             {/* Dropdown */}
//             {renderDropdown(item.id)}
//           </Link>
//         );
//       })}
//     </div>
//   );
// };

// export default BottomNav;
