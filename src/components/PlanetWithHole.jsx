import * as THREE from 'three'

export default function PlanetWithHole({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
    const shape = new THREE.Shape()

    // Outer rectangle
    shape.moveTo(-1, -1)

    shape.lineTo(1, -1)
    shape.lineTo(1, 1)
    shape.lineTo(-1, 1)
    shape.lineTo(-1, -1)

    // Circular hole
    // Hole definitions
    const holes = [
        { x: -0.75, y: 0.75, r: 0.1 },
        { x: 0, y: 0.75, r: 0.1 },
        { x: 0.75, y: 0.75, r: 0.1 },
    ]

    holes.forEach(({ x, y, r }) => {
        const hole = new THREE.Path()
        hole.absarc(x, y, r, 0, Math.PI * 2, false)
        shape.holes.push(hole)
    })


    //
    return (
        <mesh position={position} rotation={rotation}>
            <shapeGeometry args={[shape]} />
            <meshStandardMaterial side={THREE.DoubleSide} />
        </mesh>
    )
}
