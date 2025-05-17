import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  FXAA,
  SMAA,
} from "@react-three/postprocessing";
import { Leva, useControls } from "leva";
import { Model } from "./Model";
import Animation from "./Animation";
import { Robot } from "./Robot";
import Overlay from "./Overlay";
import LetsTalk from "./LetsTalk";
import NavBar from "./NavBar";

const Experience = () => {
  const { intensity, position } = useControls("Light", {
    intensity: { value: 2, min: 0, max: 10, step: 0.1 },
    position: {
      value: { x: 0, y: 5, z: 0 },
      step: 0.1,
      joystick: "invertY",
    },
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    console.log(isMenuOpen);
  }, [isMenuOpen]);
  return (
    <div className="w-full h-screen ">
      <NavBar setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />

      <LetsTalk setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
      <Leva collapsed hidden />

      <Overlay setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
      <div className="  h-screen">
        <Canvas
          shadows
          dpr={[1, 2]}
          gl={{ antialias: false }}
          camera={{ position: [0, 1.5, 5], fov: 45 }}
        >
          <directionalLight
            position={[position.x, position.y, position.z]}
            intensity={intensity}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <spotLight
            position={[position.x, position.y, position.z]}
            angle={0.5}
            penumbra={0.3}
            intensity={intensity}
            castShadow
          />
          <ambientLight intensity={0.4} />
          {/* <OrbitControls /> */}

          <group position={[0, -3.9, 0]} scale={2.7}>
            <Model />
            {/* <Robot /> */}
          </group>

          <EffectComposer multisampling={5}>
            <SMAA />
            {/* <FXAA /> */}
            {/* <Bloom intensity={0.6} luminanceThreshold={0.2} /> */}
          </EffectComposer>
        </Canvas>
      </div>
    </div>
  );
};

export default Experience;
