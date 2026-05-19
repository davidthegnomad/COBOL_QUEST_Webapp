/** Browser persistence for static demo builds (no API / database). */

export const STATIC_DEMO = process.env.NEXT_PUBLIC_STATIC_DEMO === 'true'

const STATS_KEY = 'cobol-quest-stats-v1'
const PROGRESS_KEY = 'cobol-quest-progress-v1'

export interface StoredStats {
  logic: number
  memory: number
  legacy: number
  level: number
  classType: string
}

const defaultStats: StoredStats = {
  logic: 10,
  memory: 10,
  legacy: 0,
  level: 1,
  classType: 'Novice',
}

export function loadStats(): StoredStats {
  if (typeof window === 'undefined') return defaultStats
  try {
    const raw = window.localStorage.getItem(STATS_KEY)
    return raw ? { ...defaultStats, ...JSON.parse(raw) } : defaultStats
  } catch {
    return defaultStats
  }
}

export function saveStats(stats: StoredStats): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STATS_KEY, JSON.stringify(stats))
  } catch {
    // private mode / quota
  }
}

export function markQuestComplete(questId: string, codeSubmission: string): void {
  if (typeof window === 'undefined') return
  try {
    const raw = window.localStorage.getItem(PROGRESS_KEY)
    const progress: Record<string, { status: string; codeSubmission: string }> = raw
      ? JSON.parse(raw)
      : {}
    progress[questId] = { status: 'COMPLETED', codeSubmission }
    window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress))
  } catch {
    // ignore
  }
}
