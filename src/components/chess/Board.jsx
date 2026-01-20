function Tile({ position, dark }) {
  return (
    <mesh position={position} receiveShadow>
      <boxGeometry args={[1, 0.1, 1]} />
      <meshStandardMaterial color={dark ? "#333" : "#eee"} />
    </mesh>
  );
}


//
export default function Board() {
  const tiles = [];
  for (let x = 0; x < 8; x++) {
    for (let z = 0; z < 8; z++) {
      tiles.push(
        <Tile
          key={`${x}-${z}`}
          position={[x - 3.5, 0, z - 3.5]}
          dark={(x + z) % 2 === 1}
        />
      );
    }
  }
  return <group>{tiles}</group>;
}
