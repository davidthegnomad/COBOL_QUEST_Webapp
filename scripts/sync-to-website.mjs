#!/usr/bin/env node
import { cpSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const websiteDemo = resolve(root, '..', 'Website-Stuff', 'public', 'DEMO', 'cobol-quest')

process.chdir(root)
execSync('node scripts/build-site-demo.mjs', { stdio: 'inherit' })

rmSync(websiteDemo, { recursive: true, force: true })
mkdirSync(websiteDemo, { recursive: true })
cpSync(resolve(root, 'out'), websiteDemo, { recursive: true })

console.log(`Synced demo → ${websiteDemo}`)
