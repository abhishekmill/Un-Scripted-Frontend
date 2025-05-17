import React from "react";

const Overlay = ({ setIsMenuOpen, isMenuOpen }) => {
  return (
    <div className="w-full absolute z-10  top-0 text-white justify-center flex flex-col items-center text-4xl lg:px-0 px-4">
      <div className="w-full lg:h-32 h-[30vh]  m-10 flex justify-between">
        <img
          className="w-10 h-12 object-contain mx-10"
          src="/logo.png"
          alt=""
        />
        <div
          onClick={() => setIsMenuOpen(true)}
          className="capitalize text-base px-10 select-none  font-semibold"
        >
          {" "}
          + LET'S TALK{" "}
        </div>
      </div>
      <div className=""> Don't build your brand on a model.</div>
      <div>Machines replicate. People create.</div>
    </div>
  );
};

export default Overlay;
