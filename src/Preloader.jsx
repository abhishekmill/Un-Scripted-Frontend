import React from "react";

import { Typewriter } from "react-simple-typewriter";

const Preloader = () => {
  return (
    <div className="w-full h-screen   ">
      <div></div>
    </div>
  );
};

export default Preloader;

const TypewritterEffect = () => {
  return (
    <div className="text-white">
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
        typeSpeed={70}
        deleteSpeed={50}
        delaySpeed={1000}
        // onLoopDone={handleDone}
        // onType={handleType}
      />
    </div>
  );
};
