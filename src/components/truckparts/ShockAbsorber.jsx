/**
 * 
 * 
 * 
 */

//* Imports
import MetalSpring from '../MetalSpring'
import { blue, brown, green, grey, orange, purple, red, yellow } from "@mui/material/colors"


//* Main Component
export default function ShockAbsorber({ position = [0, 0, 0], rotation = [0, 0, 0] }) {

    return (
        <group position={position} rotation={rotation}>
            {/** Spring */}
            <MetalSpring position={[0.45, 0.025, 0]} />
            
            {/** mount, lower */}
            <mesh position={[0.45, 0.015, 0]} receiveShadow>
                {/* Cylinder is vertical on Y axis */}
                <cylinderGeometry args={[0.02, 0.04, 0.05, 64]} />
                <meshStandardMaterial color={grey[900]}
                    metalness={0.25}
                    roughness={0.65}
                    envMapIntensity={0.75} />
            </mesh>
            {/** mount, upper */}
            <mesh position={[0.45, 0.175, 0]} rotation={[3.05, 0, 0]} receiveShadow>
                {/* Cylinder is vertical on Y axis */}
                <cylinderGeometry args={[0.02, 0.04, 0.05, 64]} />
                <meshStandardMaterial color={grey[900]}
                    metalness={0.25}
                    roughness={0.65}
                    envMapIntensity={0.75} />
            </mesh>
            {/** shock absorber */}
            <mesh position={[0.45, 0.1, 0]} rotation={[0, 0, 0]} receiveShadow>
                <cylinderGeometry args={[0.015, 0.015, 0.125, 32]} />
                <meshStandardMaterial
                    metalness={0.95}
                    roughness={0.45}
                    // normalScale={[1, 1]} // directional brushing
                    envMapIntensity={0.95}
                    color={'white'} />
            </mesh>
            <mesh position={[0.45, 0.05, 0]} rotation={[0, 0, 0]} receiveShadow>
                <cylinderGeometry args={[0.02, 0.02, 0.05, 32]} />
                <meshStandardMaterial
                    metalness={0.95}
                    roughness={0.35}
                    // normalScale={[1, 1]} // directional brushing
                    envMapIntensity={0.95}
                    color={grey[900]} />
            </mesh>
        </group>
    )
}  // ShockAbsorber()
