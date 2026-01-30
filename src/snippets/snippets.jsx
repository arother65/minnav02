const geometry = useMemo(
  () =>
    new THREE.ExtrudeGeometry(shape02, {
      depth: 0.01,
      steps: 32,
      bevelEnabled: true,
      bevelSize: 0.15,
      bevelSegments: 8,
    }),
  [shape02]
)

const material = useMemo(
  () =>
    new THREE.MeshStandardMaterial({
      color: yellow[500],
      metalness: 0.95,
      roughness: 0.45,
      side: THREE.DoubleSide,
    }),
  []
)

{Array.from({ length: 200 }).map((_, index) => (
  <mesh
    key={index}
    geometry={geometry}
    material={material}
    position={[-5 + index / 50, 0.15, 3]}
    rotation={[0, 0, 0.8]}
    receiveShadow
  />
))}
