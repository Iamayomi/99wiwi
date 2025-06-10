import { BiSupport } from "react-icons/bi";
import {
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import FooterFaq from "../HeroPage/footerFaq/FooterFaq";
import FooterFaqBottom from "../HeroPage/footerFaq/FooterFaqBottom";
import FooterMenu from "../HeroPage/footer/FooterMenu";
import React from "react";

interface SocialLink {
  id: number;
  icon: JSX.Element;
  url: string;
}

const Footer: React.FC = () => {
  const socialLinks: SocialLink[] = [
    { id: 1, icon: <FaFacebookF />, url: "https://facebook.com" },
    { id: 2, icon: <FaTwitter />, url: "https://twitter.com" },
    { id: 3, icon: <FaInstagram />, url: "https://instagram.com" },
    { id: 4, icon: <FaYoutube />, url: "https://youtube.com" },
    { id: 5, icon: <FaTelegramPlane />, url: "https://telegram.org" },
  ];

  return (
    <div>
      <div className="p-3 space-y-3 lg:pb-2 pb-[100px] bg-[#1A1A1A]">
        <FooterFaq />
        <FooterFaqBottom />
        <FooterMenu />

        <div className="flex lg:flex-row flex-col gap-3 w-full text-[#c2c2c2]">
          <div className="p-4 text-[12px] lg:text-sm bg-[#212121] rounded-md">
            <p>
              99wiwi uses cookies to ensure the best user experience. By
              remaining on the website, you consent to the use of your cookie
              files on 99wiwi.{" "}
              <span className="font-bold underline">Find out more</span>
            </p>
            <p>© 2025, All rights reserved and protected by law.</p>
            <p>
              The platform&apos;s interface and code are protected by copyright
              laws and are registered with the UK&apos;s Copyright House as of
              June 25, 2025. Unauthorized use, reproduction, or distribution of
              any content from the website is strictly prohibited and may result
              in legal action.
            </p>
          </div>

          <div className="p-4 hidden lg:flex gap-3 items-center justify-center bg-[#212121] rounded-md">
            <BiSupport className="text-5xl" />
            <div>
              <p className="text-white text-md font-bold uppercase">Support</p>

              <p className="text-xl hover:text-white duration-300">
                +123456789
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex xl:flex-row flex-col items-center gap-1 xl:gap-2">
              <div className="w-full p-4 bg-[#212121] rounded-md">
                <div className="hidden lg:flex justify-center gap-2 items-center">
                  {socialLinks.map((social) => (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="p-1.5 text-black bg-white hover:bg-amber-300 rounded-full duration-300">
                        {social.icon}
                      </div>
                    </a>
                  ))}
                </div>
                <div className="grid lg:hidden grid-cols-5 gap-2 items-center">
                  {socialLinks.map((social) => (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="p-1.5 py-[12px] text-white flex justify-center items-center bg-[#2E2E2E] hover:bg-amber-300 hover:text-gray-800 rounded-[3px] text-[17px] duration-300">
                        {social.icon}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              <div className="p-4 lg:flex hidden w-full xl:w-auto text-2xl text-center font-semibold bg-[#212121] rounded-md">
                18+
              </div>
            </div>

            <div className="py-1.5 px-2 lg:flex hidden text-sm font-medium text-center bg-[#212121] hover:bg-[#424141] duration-300 rounded-md uppercase">
              Mobile version
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
