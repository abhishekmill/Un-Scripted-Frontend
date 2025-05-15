import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations, Box } from "@react-three/drei";
import * as THREE from "three";
export function Model(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/3D_Model/Robot_M_F.glb");
  const { actions } = useAnimations(animations, group);

  console.log(actions);

  const [isMaleKnightMoved, setIsMaleKnightMoved] = useState(false);
  const [isFemaleKnightMoved, setIsFemaleKnightMoved] = useState(false);
  const [isAnimRunning, setIsAnimRunning] = useState(false);

  const handleRepeat = () => {
    setIsAnimRunning(true);
    console.log("animation is running ");

    setTimeout(() => {
      setIsAnimRunning(false);
      console.log("animation is finished ");
    }, 3000);
  };

  function playAnimation(name, reverse = false) {
    handleRepeat();
    const action = actions[name];
    if (!action) return;

    const clipDuration = action.getClip().duration;

    // If already playing in this direction, skip
    if (action.isRunning() && action.timeScale > 0 === !reverse) return;

    action.reset();
    action.setLoop(THREE.LoopOnce, 1);
    action.clampWhenFinished = true;

    action.timeScale = reverse ? -1 : 1;
    action.time = reverse ? clipDuration : 0;

    action.play();

    if (reverse) {
      // Manually stop action when time reaches 0 (since mixer doesn't auto-stop in reverse)
      const onLoopFinished = () => {
        if (action.time <= 0) {
          action.stop();
          action.getMixer().removeEventListener("finished", onLoopFinished);
        }
      };

      action.getMixer().addEventListener("finished", onLoopFinished);
    }
  }

  const maleMoveKnightForward = () => {
    setIsMaleKnightMoved(true);
    playAnimation("Male_Move_Knight", false);
    playAnimation("CP_M_Knight_Move_Forward", false);
  };

  const maleMoveKnightReverse = () => {
    setIsMaleKnightMoved(false);
    playAnimation("Male_Move_Knight", true);
    playAnimation("CP_M_Knight_Move_Forward", true);
  };

  const femaleMoveKnightForward = () => {
    setIsFemaleKnightMoved(true);
    playAnimation("Female_Move_Knight", false);
    playAnimation("CP_F_Knight_Move_Forward", false);
  };

  const femaleMoveKnightReverse = () => {
    setIsFemaleKnightMoved(false);
    playAnimation("Female_Move_Knight", true);
    playAnimation("CP_F_Knight_Move_Forward", true);
  };

  const femaleLook = () => {
    playAnimation("Female_Look", false);
  };

  const maleLook = () => {
    playAnimation("Male_Look", false);
  };

  const chessDead = () => {
    playAnimation("CP_F_Dead", false);
  };
  const chessEntry = () => {
    playAnimation("CP_F_Drop_Entry", false);
  };
  const chessFemaleKnightForwardDead = () => {
    playAnimation("CP_F_Knight_Forward_Dead", false);
  };
  const chessMaleKnightForwardDead = () => {
    playAnimation("CP_M_Knight_Forward_Dead", false);
  };
  const chessWobble = () => {
    playAnimation("CP_F_Wobble", false);
    playAnimation("CP_M_Wobble", false);
  };

  useEffect(() => {
    if (
      actions["Female_Look"] &&
      actions["Male_Look"] &&
      actions["CP_M_Knight_Move_Forward"] &&
      actions["Male_Move_Knight"] &&
      actions["Female_Move_Knight"]
    ) {
      // chessWobble();
    }

    return () => {
      Object.values(actions).forEach((action) => {
        if (action?.fadeOut) action.fadeOut(0.3);
      });
    };
  }, []);

  console.log(nodes);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature">
          <group name="Male_Rob">
            <Box
              onPointerMove={(e) => {
                e.stopPropagation();
                if (isAnimRunning) return;
                maleLook();
              }}
              position={[-0.5, 1.5, 0]}
              scale={[0.3, 0.3, 0.4]}
            >
              <meshStandardMaterial transparent opacity={0} />
            </Box>
            <Box
              onPointerMove={(e) => {
                e.stopPropagation();
                if (isAnimRunning) return;
                if (!isMaleKnightMoved) {
                  maleMoveKnightForward();
                } else {
                  maleMoveKnightReverse();
                }
              }}
              position={[-0.6, 1, 0.2]}
              scale={[0.3, 0.6, 0.4]}
            >
              <meshStandardMaterial transparent opacity={0} />
            </Box>
            <skinnedMesh
              onPointerEnter={(e) => {
                e.stopPropagation();
                if (!isMaleKnightMoved) {
                  maleMoveKnightForward;
                } else {
                  maleMoveKnightReverse;
                }
              }}
              name="Male"
              geometry={nodes.Male.geometry}
              material={materials.Male}
              skeleton={nodes.Male.skeleton}
            >
              <meshStandardMaterial
                color={"black"}
                roughness={0.4}
                metalness={0.6}
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
            <Box
              onPointerMove={(e) => {
                e.stopPropagation();
                if (isAnimRunning) return;
                femaleLook();
              }}
              position={[0.5, 1.5, 0]}
              scale={[0.3, 0.3, 0.4]}
            >
              <meshStandardMaterial transparent opacity={0} />
            </Box>
            <Box
              onPointerMove={(e) => {
                e.stopPropagation();
                if (isAnimRunning) return;
                if (!isFemaleKnightMoved) {
                  femaleMoveKnightForward();
                } else {
                  femaleMoveKnightReverse();
                }
              }}
              position={[0.6, 1, 0.2]}
              scale={[0.3, 0.6, 0.4]}
            >
              <meshStandardMaterial transparent opacity={0} />
            </Box>
            <skinnedMesh
              name="Female"
              geometry={nodes.Female.geometry}
              material={materials.Female}
              skeleton={nodes.Female.skeleton}
            >
              <meshStandardMaterial
                color={"black"}
                roughness={0.4}
                metalness={0.6}
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
              material={materials.Eyes2}
              skeleton={nodes.Female_2.skeleton}
            />
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
        <group
          onPointerMove={(e) => {
            e.stopPropagation();
            if (isAnimRunning) return;
          }}
          name="__OUTER_BOARD"
        >
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

useGLTF.preload("/3D_Model/Robot_M_F.glb");
