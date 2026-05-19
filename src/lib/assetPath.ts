const base =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.NEXT_PUBLIC_STATIC_DEMO === 'true' ? '/DEMO/cobol-quest' : '')

/** Prefix public asset paths when hosted under basePath (e.g. davidcole.cloud demo). */
export function assetPath(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${base}${normalized}`
}
