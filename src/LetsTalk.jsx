import React from "react";
import ContactForm from "./ContactForm";

const LetsTalk = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <div
      className={`  ${
        isMenuOpen
          ? "opacity-100  pointer-events-auto "
          : "opacity-0 pointer-events-none "
      }w-full absolute top-0 left-0 z-20 duration-300 h-screen flex justify-between items-center  bg-black   `}
    >
      {" "}
      <div className="w-[60%] h-full   text-white ">
        <div className="mb-20 h-[80%] flex flex-col justify-center items-center">
          <div>
            <h2 className=" text-4xl  my-5">Ready to flip the script?</h2>
            <h3 className="italic text-lg">
              Whether you know exactly what you need, or just want to explore
              ideas, we're here for it.
            </h3>
            <i className="text-slate-200">
              Drop us a line. We'll take it from there.
            </i>
          </div>
        </div>
        <div className=" px-20">
          Prefer reaching out directly? hello@unscripted.agency | +91 99627
          30398
        </div>
      </div>
      <div className="w-[40%] flex justify-center items-center mb-20  ">
        <ContactForm />
      </div>
      <div className=" w-20 h-full ">
        <div
          onClick={() => setIsMenuOpen(false)}
          className="text-3xl pt-10  select-none text-white"
        >
          ✕
        </div>
      </div>
    </div>
  );
};

export default LetsTalk;
