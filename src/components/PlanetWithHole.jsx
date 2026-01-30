/**
 * 
 * 
 * 
 */


//*
import * as THREE from 'three'
import { useTexture } from '@react-three/drei'


//*
export default function PlanetWithHole({
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    texture = 'cardboard'
}) {
    const shape = new THREE.Shape()

    // Outer rectangle
    shape.moveTo(-0.5, -0.5)

    shape.lineTo(0.5, -0.5)
    shape.lineTo(0.5, 0.5)
    shape.lineTo(-0.5, 0.5)
    shape.lineTo(-0.5, -0.5)

    // Circular hole
    // Hole definitions
    const holes = [
        { x: -0.35, y: 0.35, r: 0.05 },
        { x: 0, y: 0.35, r: 0.05 },
        { x: 0.35, y: 0.35, r: 0.05 },

        { x: -0.35, y: 0.15, r: 0.05 },
        { x: 0, y: 0.15, r: 0.05 },
        { x: 0.35, y: 0.15, r: 0.05 },

        { x: -0.35, y: 0, r: 0.05 },
        { x: 0, y: 0, r: 0.05 },
        { x: 0.35, y: 0, r: 0.05 },

        { x: -0.35, y: -0.15, r: 0.05 },
        { x: 0, y: -0.15, r: 0.05 },
        { x: 0.35, y: -0.15, r: 0.05 },

        { x: -0.35, y: -0.35, r: 0.05 },
        { x: 0, y: -0.35, r: 0.05 },
        { x: 0.35, y: -0.35, r: 0.05 }
    ]

    holes.forEach(({ x, y, r }) => {
        const hole = new THREE.Path()
        hole.absarc(x, y, r, 0, Math.PI * 2, false)
        shape.holes.push(hole)
    })

    // create texture here
    let textureCardboard = useTexture('/textures/cardboard.png')
    let textureWood = useTexture('/textures/wood.jpg')
    let textureRust = useTexture('/textures/rust/speckled-rust_albedo.png')

    switch (texture) {
        case 'cardboard':
            texture = textureCardboard
            break;
        case 'wood':
            texture = textureWood
            break;
        case 'rust':
            texture = textureRust
            break;

        default:
            break;
    }
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(1, 1)

    // const shape = createShapeSM()

    //
    return (
        <mesh position={position} rotation={rotation}>
            <shapeGeometry args={[shape]} />
            <meshStandardMaterial
                color="white"
                roughness={0.55}
                metalness={0.95}
                map={texture}
                side={THREE.DoubleSide}
            />
        </mesh>
    )
}
