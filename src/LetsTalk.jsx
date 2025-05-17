import React from "react";
import ContactForm from "./ContactForm";

const LetsTalk = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <div className="relative ">
      <div
        className={`  ${
          isMenuOpen
            ? "opacity-100  pointer-events-auto "
            : "opacity-0 pointer-events-none "
        }w-full absolute top-0 left-0 z-20 duration-300 lg:h-screen lg:flex-row flex flex-col overflow-hidden justify-between items-center  bg-black   `}
      >
        {" "}
        <div className="lg:w-[60%] h-full  px-4 text-white ">
          <div className="lg:mb-20 h-[80%] flex flex-col justify-center items-center">
            <div className="lg:mt-0 mt-20 shadow-md ">
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
          <div className="  px-4 lg:px-20">
            Prefer reaching out directly? hello@unscripted.agency | +91 99627
            30398
          </div>
        </div>
        <div className="lg:w-[40%]  flex justify-center items-center lg:mb-20 mb-0 mt-10  ">
          <ContactForm />
        </div>
        <div className=" lg:w-20 lg:h-full bg-black lg:block flex items-center w-full justify-center h-20  absolute lg:static top-0 left-0 z-20">
          <div
            onClick={() => setIsMenuOpen(false)}
            className="text-3xl pt-10  select-none text-white"
          >
            ✕
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetsTalk;
