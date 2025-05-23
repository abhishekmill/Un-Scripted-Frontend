import React, { useEffect, useState } from "react";
import Experience from "./Experience";
import ContactForm from "./ContactForm";
import LetsTalk from "./LetsTalk";
import Preloader from "./Preloader";
import NavBar from "./NavBar";

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="bg-black w-screen h-screen">
      <Preloader isLoaded={isLoaded} />
      <Experience />
    </div>
  );
};

export default App;
