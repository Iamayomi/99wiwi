import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Link } from "wouter";
import { getQueryFn } from "@/lib/queryClient";
import { useQuery } from "@tanstack/react-query";
import { Branding } from "@shared/schema";

// Real-time clock
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

  return <span className="text-[14px] hidden lg:block">{time}</span>;
};

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

const TopBarMenu: React.FC = () => {
  const { data: branding } = useQuery<Branding>({
    queryKey: ["/api/admin/branding"],
    queryFn: getQueryFn({ on401: "throw" }),
    refetchOnWindowFocus: true,
  });

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
    { code: "pt", name: "Português", flag: "🇵🇹" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
    { code: "ko", name: "한국어", flag: "🇰🇷" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
    { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  ];

  const [showLangs, setShowLangs] = useState(false);
  const [selectedLang, setSelectedLang] = useState(() => {
    const saved = localStorage.getItem("selectedLang");
    return saved ? JSON.parse(saved) : { code: "en", name: "English", flag: "🇺🇸" };
  });

  // Load Google Translate script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };
  }, []);

  const changeLanguage = (langCode: string) => {
    const lang = languages.find((l) => l.code === langCode);
    if (lang) {
      setSelectedLang(lang);
      localStorage.setItem("selectedLang", JSON.stringify(lang));
    }

    const interval = setInterval(() => {
      const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
      if (select) {
        select.value = langCode;
        select.dispatchEvent(new Event("change"));
        clearInterval(interval);
      }
    }, 100);

    setShowLangs(false);
  };

  return (
    <>
      <div className="bg-[#212121] z-[100] relative">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-2">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img className="w-24 xl:w-28" src={`http://localhost:8080/uploads/${branding?.faviconUrl ?? "default-logo.png"}`} alt="Logo" />
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4 relative">
            <Clock />

            {/* Language Dropdown */}
            <div className="relative flex items-center gap-1 text-[14px] cursor-pointer hover:text-gray-300">
              <div onClick={() => setShowLangs(!showLangs)} className="flex items-center gap-1">
                <span>{selectedLang.flag}</span>
                <span>{selectedLang.name}</span>
                <FaChevronDown size={15} />
              </div>

              {showLangs && (
                <div className="absolute top-7 right-0 bg-white text-black text-sm rounded shadow z-50 w-40 max-h-60 overflow-auto">
                  {languages.map((lang) => (
                    <div key={lang.code} onClick={() => changeLanguage(lang.code)} className="px-3 py-2 hover:bg-gray-200 cursor-pointer flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Auth Button */}
            <Link to="/auth" className="start">
              <div className="px-4 py-2 text-[15px] text-white bg-[#CF2728] hover:bg-[#4d4c4c] rounded-sm cursor-pointer transition-all">Get started</div>
            </Link>
          </div>

          {/* Hidden Google Translate Root */}
          <div id="google_translate_element" className="absolute top-0 left-[-9999px]"></div>
        </div>
      </div>

      {/* Hide Google Translate UI */}
      <style>
        {`
          .goog-te-banner-frame.skiptranslate,
          .goog-te-gadget-icon,
          .goog-te-balloon-frame,
          .goog-logo-link,
          .goog-te-menu-value span,
          .goog-te-gadget {
            display: none !important;
          }
          body > .skiptranslate {
            display: none !important;
          }
          body {
            top: 0px !important;
          }
        `}
      </style>
    </>
  );
};

export default TopBarMenu;
