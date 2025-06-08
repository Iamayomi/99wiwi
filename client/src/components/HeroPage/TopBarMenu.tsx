import logo from "../../logo.png";

const TopBarMenu = () => {
  return (
    <div className="bg-[#212121] z-[100]">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <a href="/" className="flex-shrink-0">
          <img className="w-24 xl:w-28" src={logo} alt="Logo" />
        </a>

        {/* Button */}
        <div className="items-center gap-3">
          <a href="/auth" className="start">
            <div className="px-4 py-2 text-[15px] text-white bg-[#CF2728] hover:bg-[#4d4c4c] rounded-sm cursor-pointer transition-all">
              Get started
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBarMenu;
