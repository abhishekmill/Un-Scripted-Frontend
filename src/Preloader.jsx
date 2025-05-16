import React from "react";

import { Typewriter } from "react-simple-typewriter";

const Preloader = () => {
  return (
    <div className="w-full h-screen flex-col  flex justify-center items-center ">
      <div className="w-120 ">
        <video
          loop
          autoPlay
          muted
          playsInlineautoPlay={true}
          src="/loading-screen.mp4"
        ></video>
      </div>
      <TypewritterEffect />
    </div>
  );
};

export default Preloader;

const TypewritterEffect = () => {
  return (
    <div className="text-white  text-lg">
      {" "}
      <Typewriter
        words={[
          "[ INITIATING UNSCRPTD.EXE ]",
          "[ SIMULATING STRATEGY LOOP ]",
          "[ ANALYZING PIECE POSITIONING ]",
          "[ CALCULATING BRAND DIFFERENTIATION ]",
          "[ RESULT: NONE DETECTED ]",
          "[ DEVIATING FROM SCRIPTED SYSTEM ]",
          "[ BREACHING CONVENTION FIREWALL ]",
          "[ CALIBRATING HUMAN INPUT... ]",
          "[ RE-ASSEMBLING CORE IDENTITY ]",
          "[ FINAL MOVE LOADED ]",
          "[ READY. ]",
        ]}
        loop={true}
        cursor
        cursorStyle=""
        typeSpeed={20}
        deleteSpeed={30}
        delaySpeed={1000}
        // onLoopDone={handleDone}
        // onType={handleType}
      />
    </div>
  );
};
