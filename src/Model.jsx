import React, { useEffect, useMemo, useRef, useState } from "react";
import { useGLTF, useAnimations, Box } from "@react-three/drei";
import { useControls } from "leva";
import * as THREE from "three";
export function Model(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/3D_Model/Robot_M_F.glb");
  const { actions, mixer } = useAnimations(animations, group);
  const animationNames = useMemo(() => Object.keys(actions), [actions]);

  const { currentAnimation } = useControls({
    currentAnimation: {
      options: animationNames,
      value: animationNames[0],
    },
  });

  useEffect(() => {
    const action = actions[currentAnimation];

    if (!action) return;

    action.reset();
    action.setLoop(THREE.LoopOnce, 1);
    action.clampWhenFinished = true;
    action.fadeIn(0.3).play();

    const handleFinished = (e) => {
      if (e.action === action) {
        console.log("Animation finished:", currentAnimation);
      }
    };

    action.getMixer().addEventListener("finished", handleFinished);

    return () => {
      action.getMixer().removeEventListener("finished", handleFinished);
    };
  }, [currentAnimation, actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature">
          <group name="Male_Rob">
            <skinnedMesh
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
            <Box position={[-0.5, 1, 0.2]} scale={[0.3, 0.5, 0.5]}>
              <meshStandardMaterial transparent opacity={1} />
            </Box>
          </group>
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
          <group name="Female_Rob">
            <skinnedMesh
              name="Female"
              geometry={nodes.Female.geometry}
              material={materials.Female}
              skeleton={nodes.Female.skeleton}
            />
            <skinnedMesh
              name="Female_1"
              geometry={nodes.Female_1.geometry}
              material={materials.Mask}
              skeleton={nodes.Female_1.skeleton}
            />
            <skinnedMesh
              name="Female_2"
              geometry={nodes.Female_2.geometry}
              material={materials.Eyes2}
              skeleton={nodes.Female_2.skeleton}
            />
            <Box position={[0.5, 1, 0.2]} scale={[0.3, 0.5, 0.5]}>
              <meshStandardMaterial transparent opacity={1} />
            </Box>
          </group>
          <primitive object={nodes.Root_1} />
          <primitive object={nodes.CTRL_COG_1} />
          <primitive object={nodes.CTRL_IK_LEG_L_1} />
          <primitive object={nodes.CTRL_IK_POLE_VECTOR_L_1} />
          <primitive object={nodes.CTRL_IK_LEG_R_1} />
          <primitive object={nodes.CTRL_IK_POLE_VECTOR_R_1} />
          <primitive object={nodes.CTRL_IK_ARM_R_1} />
          <primitive object={nodes.CTRL_IK_ARM_L_1} />
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
            material={materials["Outer_Board.001"]}
          />
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
        <group name="Chess_Board_Root">
          <skinnedMesh
            name="Pawn001"
            geometry={nodes.Pawn001.geometry}
            material={materials.Chess_Pieces_BLK}
            skeleton={nodes.Pawn001.skeleton}
          />
          <primitive object={nodes.Bone001} />
        </group>
        <group name="Chess_Board_Root002" position={[0, 0.102, 0]}>
          <skinnedMesh
            name="Pawn002"
            geometry={nodes.Pawn002.geometry}
            material={materials.Chess_Pieces_BLK}
            skeleton={nodes.Pawn002.skeleton}
          />
          <primitive object={nodes.Bone001_1} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/Robot_M_F.glb");
