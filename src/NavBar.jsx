import React from "react";
import { div } from "three/tsl";

const NavBar = ({ setIsMenuOpen, isMenuOpen }) => {
  return (
    <div className="absolute z-30 top-0 left-0 flex h-[47px] justify-between mt-10 w-full   ">
      <div className="mx-10">
        {" "}
        <img src="/logo.png" className="w-[39px] " alt="" />{" "}
      </div>
      <div
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="mx-10 cursor-pointer flex justify-center text-[#D6D5D4] h-full items-center  text-[16px] font-poppins "
      >
        {!isMenuOpen ? "+ LET’S TALK" : <div className="text-2xl">✕</div>}
      </div>
    </div>
  );
};

export default NavBar;
