/**
 * 
 * 
 * 
 */

import * as THREE from 'three'
import { useMemo } from 'react'
import {
  Brush,
  Evaluator,
  SUBTRACTION
} from 'three-bvh-csg'

//*
export default function CSGTorus({
  radius = 1,
  tube = 0.45,
  radialSegments = 64,
  tubularSegments = 128,

  holeRadius = 0.25,
  holeLength = 1,
  holeRotation = [Math.PI / 2, 0, 0],
  holePosition = [0, 0, 0],

  material = new THREE.MeshStandardMaterial({ color: '#ff69b4' }),

  ...props
}) {
  const mesh = useMemo(() => {
    const evaluator = new Evaluator()

    // Base torus
    const torusBrush = new Brush(
      new THREE.TorusGeometry(
        radius,
        tube,
        radialSegments,
        tubularSegments
      ),
      material
    )

    // Cutter
    const cutterBrush = new Brush(
      new THREE.CylinderGeometry(
        holeRadius,
        holeRadius,
        holeLength,
        32
      ),
      material
    )

    cutterBrush.position.set(...holePosition)
    cutterBrush.rotation.set(...holeRotation)
    cutterBrush.updateMatrixWorld()

    // Boolean subtraction
    const result = evaluator.evaluate(
      torusBrush,
      cutterBrush,
      SUBTRACTION
    )

    result.geometry.computeVertexNormals()
    return result
  }, [
    radius,
    tube,
    radialSegments,
    tubularSegments,
    holeRadius,
    holeLength,
    holeRotation,
    holePosition,
    material
  ])

  return <primitive object={mesh} {...props} />
}
