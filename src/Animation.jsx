import React, { useRef, useEffect } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { AnimationMixer } from "three";
import { Model } from "./Model";

const Animation = () => {
  const modelRef = useRef();
  const mixerRef = useRef();

  const animGLTF = useLoader(
    GLTFLoader,
    "/Animations/Robots/final_M_F-Look_USER.glb"
  );

  useEffect(() => {
    if (!modelRef.current || !animGLTF.animations.length) return;

    const mixer = new AnimationMixer(modelRef.current);
    mixerRef.current = mixer;

    const clip = animGLTF.animations[0];
    const action = mixer.clipAction(clip);
    action.play();

    return () => {
      action.stop();
    };
  }, [animGLTF]);

  useFrame((_, delta) => {
    mixerRef.current?.update(delta);
  });

  return <Model ref={modelRef} />;
};

export default Animation;
