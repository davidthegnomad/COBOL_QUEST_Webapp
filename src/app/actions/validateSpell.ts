'use server'

import { validateSpell as runValidateSpell } from '@/lib/validateSpell'

export async function validateSpell(levelSlug: string, userCode: string) {
  return runValidateSpell(levelSlug, userCode)
}
