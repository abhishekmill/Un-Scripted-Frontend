import React, { useEffect, useMemo, useRef, useState } from "react";
import { useGLTF, useAnimations, Box } from "@react-three/drei";
import { useControls } from "leva";
import * as THREE from "three";
import { useFrame, useGraph } from "@react-three/fiber";
import { SkeletonUtils } from "three-stdlib";

export function Robot(props) {
  const group = useRef();
  const { scene, animations } = useGLTF("/3D_Model/Robot_M_F-transformed.glb");
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions, mixer } = useAnimations(animations, group);
  const animationNames = useMemo(() => Object.keys(actions), [actions]);

  console.log("Available animations:", animationNames);
  const [isAnimRunning, setIsAnimRunning] = useState(false);
  const currentActionRef = useRef(null);

  // // Leva UI controls
  // const { currentAnimation } = useControls({
  //   currentAnimation: {
  //     options: animationNames,
  //     value: animationNames[0] || "Male_Idle",
  //   },
  // });

  // // Track animation state

  // useEffect(() => {
  //   if (!currentAnimation || !actions[currentAnimation]) return;

  //   // Fade out previous animation if it exists
  //   if (currentActionRef.current) {
  //     currentActionRef.current.fadeOut(0.3);
  //   }

  //   const action = actions[currentAnimation];
  //   action.paused = false;
  //   // action.reset();
  //   action.setLoop(THREE.LoopOnce, 1);
  //   action.clampWhenFinished = true;
  //   action.fadeIn(0.3).play();

  //   // Update current action reference
  //   currentActionRef.current = action;

  //   const handleFinished = (e) => {
  //     if (e.action === action) {
  //       console.log("Animation finished:", currentAnimation);
  //     }
  //   };

  //   // Add event listener to detect when animation finishes
  //   mixer.addEventListener("finished", handleFinished);

  //   return () => {
  //     // Proper cleanup of event listener
  //     mixer.removeEventListener("finished", handleFinished);
  //   };
  // }, [currentAnimation, actions, mixer]);

  // Function to play specific animations

  const playAnimation = (names, onAnimationStart, onAnimationEnd) => {
    const animationNames = Array.isArray(names) ? names : [names];
    const validActions = animationNames
      .map((name) => actions[name])
      .filter((action) => action !== undefined);

    if (validActions.length === 0) {
      console.warn("No valid animations found:", names);
      return;
    }

    if (isAnimRunning) {
      console.log("Animation already running, skipping");
      return;
    }

    console.log("Playing animations:", animationNames);

    // Fade out previous action
    if (currentActionRef.current) {
      currentActionRef.current.fadeOut(0.2);
    }

    let completedCount = 0;
    const finishedHandlers = {};

    validActions.forEach((action) => {
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;
      action.fadeIn(0.3).play();

      // Save current action
      currentActionRef.current = action;

      // Create a specific handler for this action
      const handleFinished = (e) => {
        if (e.action === action) {
          console.log("Animation completed:", action.getClip().name);
          completedCount++;

          // Check if all animations are complete
          if (completedCount === validActions.length) {
            if (onAnimationEnd) onAnimationEnd();
          }

          // Remove this specific listener
          mixer.removeEventListener(
            "finished",
            finishedHandlers[action.getClip().name]
          );
        }
      };

      finishedHandlers[action.getClip().name] = handleFinished;

      // Add listener
      mixer.addEventListener("finished", handleFinished);
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      playAnimation(["CP_M_Drop_Entry", "CP_F_Drop_Entry"], () => {});
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature">
          <primitive object={nodes.Root} />
          <primitive object={nodes.CTRL_COG} />
          <primitive object={nodes.CTRL_IK_LEG_L} />
          <primitive object={nodes.CTRL_IK_POLE_VECTOR_L} />
          <primitive object={nodes.CTRL_IK_LEG_R} />
          <primitive object={nodes.CTRL_IK_POLE_VECTOR_R} />
          <primitive object={nodes.CTRL_IK_ARM_L} />
          <primitive object={nodes.CTRL_IK_ARM_R} />
        </group>
        <group name="Armature001">
          <primitive object={nodes.Root_1} />
          <primitive object={nodes.CTRL_COG_1} />
          <primitive object={nodes.CTRL_IK_LEG_L_1} />
          <primitive object={nodes.CTRL_IK_POLE_VECTOR_L_1} />
          <primitive object={nodes.CTRL_IK_LEG_R_1} />
          <primitive object={nodes.CTRL_IK_POLE_VECTOR_R_1} />
          <primitive object={nodes.CTRL_IK_ARM_R_1} />
          <primitive object={nodes.CTRL_IK_ARM_L_1} />
        </group>
        <group name="Chess_Board_Root">
          <primitive object={nodes.Bone001} />
        </group>
        <group name="Chess_Board_Root002" position={[0, 0.102, 0]}>
          <primitive object={nodes.Bone001_1} />
        </group>
        <group name="__OUTER_BOARD">
          <mesh
            name="Cube064"
            castShadow
            receiveShadow
            geometry={nodes.Cube064.geometry}
            material={materials.Outer_Board}
          />
          <mesh
            name="Cube064_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube064_1.geometry}
            // material={materials["Outer_Board.001"]}
          >
            <meshStandardMaterial color={"black"} />
          </mesh>
          <group>
            <mesh
              name="Cube064_2"
              castShadow
              receiveShadow
              geometry={nodes.Cube064_2.geometry}
              material={materials.Chess_Board_GREY}
            />
            <mesh
              name="Cube064_3"
              castShadow
              receiveShadow
              geometry={nodes.Cube064_3.geometry}
              material={materials.Chess_Board_BLK}
            />
            <mesh
              name="Cube064_4"
              castShadow
              receiveShadow
              geometry={nodes.Cube064_4.geometry}
              material={materials.Border}
            />
          </group>
        </group>
        <group name="Male_Rob">
          <skinnedMesh
            onPointerEnter={() => {
              console.log("Male robot hover - playing Look animation");
              playAnimation("Male_Look");
            }}
            name="Male"
            geometry={nodes.Male.geometry}
            // material={materials.Male}
            skeleton={nodes.Male.skeleton}
          >
            <meshStandardMaterial
              color={"black"}
              metalness={0.3}
              roughness={0.4}
            />
          </skinnedMesh>
          <skinnedMesh
            name="Male_1"
            geometry={nodes.Male_1.geometry}
            material={materials.Mask}
            skeleton={nodes.Male_1.skeleton}
          />
          <skinnedMesh
            name="Male_2"
            geometry={nodes.Male_2.geometry}
            material={materials.Eyes}
            skeleton={nodes.Male_2.skeleton}
          />
          <Box
            onPointerEnter={(e) => {
              e.stopPropagation();

              playAnimation(["Male_Move_Knight", "CP_M_Knight_Move_Forward"]);
            }}
            position={[-0.56, 1.1, 0.23]}
            scale={[0.2, 0.39, 0.5]}
          >
            <meshStandardMaterial transparent opacity={0} />
          </Box>
        </group>
        <group name="Female_Rob">
          <skinnedMesh
            onPointerEnter={() => {
              console.log("Female robot hover - playing Look animation");
              playAnimation("Female_Look");
            }}
            name="Female"
            geometry={nodes.Female.geometry}
            material={materials.Female}
            skeleton={nodes.Female.skeleton}
          >
            <meshStandardMaterial
              color={"black"}
              metalness={0.3}
              roughness={0.4}
            />
          </skinnedMesh>
          <skinnedMesh
            name="Female_1"
            geometry={nodes.Female_1.geometry}
            material={materials.Mask}
            skeleton={nodes.Female_1.skeleton}
          />
          <skinnedMesh
            name="Female_2"
            geometry={nodes.Female_2.geometry}
            material={materials.Eyes}
            skeleton={nodes.Female_2.skeleton}
          />
          <Box
            onPointerEnter={(e) => {
              e.stopPropagation();
              console.log(
                "Female knight box hover - playing Knight movement animations"
              );
              playAnimation(["Female_Move_Knight", "CP_F_Knight_Move_Forward"]);
            }}
            position={[0.54, 1.13, 0.2]}
            scale={[0.2, 0.39, 0.5]}
          >
            <meshStandardMaterial transparent opacity={0} />
          </Box>
        </group>
        <skinnedMesh
          name="Pawn001"
          geometry={nodes.Pawn001.geometry}
          material={materials.Chess_Pieces_BLK}
          skeleton={nodes.Pawn001.skeleton}
        />
        <skinnedMesh
          name="Pawn002"
          geometry={nodes.Pawn002.geometry}
          material={materials.Chess_Pieces_BLK}
          skeleton={nodes.Pawn002.skeleton}
          position={[0, 0.102, 0]}
        />
      </group>
    </group>
  );
}

// Make sure these paths match exactly
useGLTF.preload("/3D_Model/Robot_M_F-transformed.glb");
