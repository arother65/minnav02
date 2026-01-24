               {/** wheel with one tyre on rim  */}
               <group position={[0.5, 0.05, -2]}>
                  {/** rim in metal */}
                  <mesh rotation={[Math.PI / 2, 0, 1.65]} position={[3.25, 0.375, 5.5]}>
                     <latheGeometry args={[rimProfileSM, 64]} />
                     <meshStandardMaterial
                        metalness={1}
                        roughness={0.35}
                        envMapIntensity={0.5}
                        color='green'
                     />
                  </mesh>

                  {/* inner rim, wireframe */}
                  <instancedMesh
                     args={[0, 0, 12]}
                     rotation={[Math.PI / 2, 0, 1.55]}
                     position={[2.95, 0.375, 5.5]}
                  >
                     <cylinderGeometry args={[0.15, 0.125, LEGO.STUD_HEIGHT, 16]} />
                     <meshStandardMaterial
                        wireframe={true}
                        roughness={0.95}
                        metalness={1}
                        envMapIntensity={0.5}
                        color={'green'} />
                  </instancedMesh>

                  {/* tyre */}
                  <mesh rotation={[0.15, 1.5, 0]} position={[2.9, 0.4, 5.5]}>
                     <torusGeometry args={[0.3, 0.2, 40, 75]} />
                     <meshStandardMaterial color="black" metalness={0} roughness={0.9} />
                  </mesh>
               </group>