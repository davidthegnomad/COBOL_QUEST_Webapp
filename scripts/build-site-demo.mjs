#!/usr/bin/env node
/**
 * Static export for davidcole.cloud (no API routes — progress in localStorage).
 */
import { existsSync, mkdirSync, renameSync, rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const apiDir = resolve(root, 'src/app/api')
const stashDir = resolve(root, '.demo-build-stash/api')

process.chdir(root)

if (existsSync(resolve(root, '.next'))) {
  rmSync(resolve(root, 'out'), { recursive: true, force: true })
  rmSync(resolve(root, '.next'), { recursive: true, force: true })
}

let movedApi = false
if (existsSync(apiDir)) {
  mkdirSync(resolve(root, '.demo-build-stash'), { recursive: true })
  if (existsSync(stashDir)) {
    rmSync(stashDir, { recursive: true, force: true })
  }
  renameSync(apiDir, stashDir)
  movedApi = true
}

try {
  execSync('npx next build', {
    stdio: 'inherit',
    env: {
      ...process.env,
      BUILD_DEMO: 'true',
      NEXT_PUBLIC_STATIC_DEMO: 'true',
      NEXT_PUBLIC_BASE_PATH: '/DEMO/cobol-quest',
    },
  })
} finally {
  if (movedApi && existsSync(stashDir)) {
    if (existsSync(apiDir)) {
      rmSync(apiDir, { recursive: true, force: true })
    }
    renameSync(stashDir, apiDir)
  }
}

console.log('Static demo build → out/')
