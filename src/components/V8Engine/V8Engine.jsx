/**
 * 
 * 
 * 
 */


// function Cylinder({ phase }) {
function Cylinder() {

   return (
      <group>
         {/* Cylinder wall */}
         <mesh>
            <cylinderGeometry args={[0.35, 0.35, 1.5, 16]} />
            <meshStandardMaterial color="#333" />
         </mesh>

         {/* Piston */}
         {/* <Piston phase={phase} /> */}
      </group>
   )
}  // Cylinder()

//
function CylinderBank({ angle = 0, offsetX = 0 }) {
   
   return (
      <group rotation={[0, 0, angle]} position={[offsetX, 0, 0]}>
         {[0, 1, 2, 3].map((i) => (
            <group key={i} position={[0, 0, i * 1.2]}>
               <Cylinder phase={i * Math.PI / 2} />
            </group>
         ))}
      </group>
   )
}  // CylinderBank()


//
export default function V8Engine({ position = [1,0,5] }) {

   return (
      <group position = { position }>
         {/* Engine block */}
         <mesh position={[0, -1, 1.8]}>
            <boxGeometry args={[3, 1, 5]} />
            <meshStandardMaterial color="#555" />
         </mesh>

         {/* Left bank */}
         <CylinderBank angle={Math.PI / 6} offsetX={-1} />

         {/* Right bank */}
         <CylinderBank angle={-Math.PI / 6} offsetX={1} />
      </group>
   )
}  // V8Engine()
