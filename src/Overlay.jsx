import React from "react";

const Overlay = ({ setIsMenuOpen, isMenuOpen }) => {
  return (
    <div className="w-full h-100 absolute z-10  top-0 text-white justify-center flex flex-col items-center text-4xl lg:px-0 px-4">
      <div className=""> Don't build your brand on a model.</div>
      <div>Machines replicate. People create.</div>
    </div>
  );
};

export default Overlay;
