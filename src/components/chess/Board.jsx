/**
 * 
 * 
 * 
 */

import { Text } from "@react-three/drei"

function Tile({ position, dark }) {
  return (
    <mesh position={position} receiveShadow>
      <boxGeometry args={[1, 0.1, 1]} />
      <meshStandardMaterial color={dark ? "#333" : "#eee"} />
    </mesh>
  );
}

function FileLabels() {
  const files = ["A", "B", "C", "D", "E", "F", "G", "H"];

  return (
    <>
      {files.map((letter, i) => (
        <Text
          key={letter}
          position={[i - 3.5, 0.12, -4.2]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.35}
          color="darkgrey"
          anchorX="center"
          anchorY="middle"
        >
          {letter}
        </Text>
      ))}
    </>
  );
}

function RankLabels() {
  return (
    <>
      {[...Array(8)].map((_, i) => (
        <Text
          key={i}
          position={[-4.2, 0.12, i - 3.5]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.35}
          // backgroundcolor ='green'
          color="darkgrey"
          anchorX="center"
          anchorY="middle"
        >
          {i + 1}
        </Text>
      ))}
    </>
  );
}

function SquareHighlight({ position, color = "#66ccff", opacity = 0.35 }) {
  return (
    <mesh
      position={[position[0], position[1] + 0.01, position[2]]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={opacity}
      />
    </mesh>
  );
}


//
export default function Board({rotation}) {
  const tiles = [];

  for (let x = 0; x < 8; x++) {

    // <Billboard position={[0, 1, 0.5]}>
    // <Text
    //   position={[0, 1, 0]}
    //   fontSiye={1}
    //   color="red"
    // >
    //   A
    // </Text>
    // </Billboard>

    for (let y = 0; y < 8; y++) {
      tiles.push(
        <Tile
          key={`${x}-${y}`}
          position={[x - 3.5, 0, y - 3.5]}
          dark={(x + y) % 2 === 1}
        />
      )
    }
  }

  return (
    <group rotation={rotation}>
      {tiles}
      {/* <Text
      // key={`${x}-${y}`}
      position={[4.005, 0.45, -4]}
      fontSize={1}
      color="green"
    >
    </Text> */}
      <FileLabels />
      <RankLabels />
    </group>
  )
}
