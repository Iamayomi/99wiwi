import logo from "../../logo.png";


const links = [];

const TopBarMenu = () => {
  return (
    <>
      {/* Desktop topbar menu - Changed from sticky to relative and added margin */}
      <div className="xl:block hidden relative  z-[100]">
        <div className="flex items-center gap-5 bg-[#212121] pl-4">
          <a href="/">
            <img className="w-24 xl:w-25" src={logo} alt="" />
          </a>
          <div className="w-full">
            <div className="flex w-full items-center justify-end lg:justify-between gap-2 py-3 pr-4">
              <div className="flex items-center justify-between px-4 py-1 text-white text-xs">
                <div className="hidden lg:flex items-center gap-3">
                  <div className="px-3 py-2 text-[15px] text-white bg-[#CF2728] hover:bg-[#4d4c4c] rounded-sm cursor-pointer transition-all">
                    Login
                  </div>

                  <div className="px-3 py-2 text-[15px] text-white font-[500] bg-[#CF2728] hover:bg-[#e94848] rounded-sm cursor-pointer transition-all">
                    Register
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center bg-theme-color relative h-[50px]">
              {/* Left Cropped Section */}
              <div className="relative h-full w-[60px] bg-[#212121]">
                <div className="absolute left-0 top-0 h-full w-full bg-theme-color clip-left-shape"></div>
              </div>

              {/* Right Icon */}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu - Also added margin top */}
      <div className="flex xl:hidden items-center justify-between py-[15px] bg-[#212121] px-1 w-full mt-1">
        <div className="text-white font-bold text-lg">
          <a href="/">
            <img src={logo} className="w-[70px]" alt="" />
          </a>
        </div>
      </div>
    </>
  );
};

export default TopBarMenu;
