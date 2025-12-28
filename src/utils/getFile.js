/*
*  Stand: 31.10.2025
*/

import { fs } from 'node:fs'

// 
export function getData() {
  return JSON.parse(fs.readFileSync('data.json', 'utf8'))
}  // getData()