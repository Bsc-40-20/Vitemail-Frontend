import logo from "../assets/logo3.png";
import fastImg from "../assets/fast.png";
import { IoLogoGithub } from "react-icons/io";
import { FaTwitter } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const pages = [
  { title: "Home" },
  { title: "Docs" },
  { title: "Playground" },
  { title: "Sponsor" },
];
type direction = "downwards" | "upwards";

const NavBar = () => {
  const [lastScrollPos, setlastScrollPos] = useState(0);
  const [scrollDirection, setScrollDirection] =
    useState<direction>("downwards");
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 640px)").matches
  );

  // checking the user scroll direction
  const detectScrollDirection = () => {
    var currentPos = window.scrollY;
    if (currentPos > lastScrollPos) setScrollDirection(() => "downwards");
    else setScrollDirection(() => "upwards");

    setlastScrollPos(currentPos);
  };

  // checking the device width
  const checkDeviceWidth = useCallback(() => {
    const isTrue = window.matchMedia("(max-width: 640px)").matches;

    if (isTrue) setIsMobile(true);
    else setIsMobile(false);
  }, []);

  // effect for device width
  useEffect(() => {
    window.addEventListener("resize", checkDeviceWidth);

    return () => {
      window.removeEventListener("resize", checkDeviceWidth);
    };
  }, [isMobile]);

  // effect for scrolling
  useEffect(() => {
    window.addEventListener("scroll", detectScrollDirection);

    return () => {
      window.removeEventListener("scroll", detectScrollDirection);
    };
  }, [window.scrollY]);

  return (
    <div
      className={`z-10 fixed sm:sticky bottom-0 w-full py-2 bg-white flex items-center justify-center sm:justify-between px-4 md:px-[70px] lg:px-[150px] ${
        scrollDirection === "upwards"
          ? "translate-y-0"
          : "translate-y-full sm:translate-y-0"
      } transition-transform duration-300`}
    >
      <div className="flex items-center gap-x-1 sm:gap-x-8 lg:gap-x-12 justify-between sm:justify-start">
        <div
          className="w-[50px] h-[50px] sm:w-[100px] sm:h-[70px]"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img
            src={isMobile ? fastImg : logo}
            alt="logo"
            className="w-full h-full object-contain sm:object-cover"
          />
        </div>

        <nav>
          <ul className="flex items-center gap-x-2 sm:gap-x-4">
            {pages.map((page) => (
              <li key={page.title}>
                <NavLink
                  to={page.title === "Home" ? "" : page.title.toLowerCase()}
                  onClick={() => {
                    document.title = page.title;
                  }}
                  className={({ isActive }) =>
                    `capitalize text-xs sm:text-[16px] lg:text-xl text-slate-500 hover:text-green-600 transition-all duration-300 ease font-semibold select-none p-2 rounded ${
                      isActive ? "bg-green-50" : ""
                    }`
                  }
                >
                  {page.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* social icons */}
      <div className="flex items-center gap-x-5">
        <div className="hidden sm:block cursor-pointer text-slate-500 hover:text-green-500 transition duration-200 ease-in-out">
          <a
            href="https://github.com/Bsc-40-20"
            className="flex items-center gap-x-1"
          >
            <IoLogoGithub className="text-3xl lg:text-3xl" />
            <span className="hidden md:block">Github</span>
          </a>
        </div>

        <div className="hidden sm:block cursor-pointer text-slate-500 hover:text-green-500 transition duration-200 ease-in-out">
          <a
            href="https://web.facebook.com/Ashraf.Chitambaa"
            className="flex items-center gap-x-1"
          >
            <FaTwitter className="text-3xl lg:text-3xl" />
            <span className="hidden md:block">Twitter</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
