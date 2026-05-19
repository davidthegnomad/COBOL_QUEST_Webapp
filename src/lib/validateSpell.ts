import { getFlavorfulErrorMessage } from '@/lib/cobolFailures'

export interface SpellValidationResult {
  success: boolean
  message: string
  xpAwarded: number
}

/** Shared COBOL ritual checks (client + server). */
export function validateSpell(levelSlug: string, userCode: string): SpellValidationResult {
  const normalizedCode = userCode.toUpperCase().trim()

  if (!normalizedCode.includes('.')) {
    return { success: false, message: getFlavorfulErrorMessage('missing_period'), xpAwarded: 0 }
  }

  switch (levelSlug) {
    case 'level-1':
      if (!normalizedCode.includes('IDENTIFICATION DIVISION')) {
        return {
          success: false,
          message: getFlavorfulErrorMessage('identification_missing'),
          xpAwarded: 0,
        }
      }
      if (!normalizedCode.includes('PROGRAM-ID.')) {
        return {
          success: false,
          message: "You must declare your 'PROGRAM-ID.' to exist in the Mainframe.",
          xpAwarded: 0,
        }
      }
      break

    case 'level-17':
      if (!normalizedCode.includes('EXEC CICS')) {
        return { success: false, message: getFlavorfulErrorMessage('exec_sigil_missing'), xpAwarded: 0 }
      }
      if (!normalizedCode.includes('SEND TEXT')) {
        return { success: false, message: "You must 'SEND TEXT' to communicate.", xpAwarded: 0 }
      }
      break

    case 'level-22': {
      const hasExecSql = /EXEC\s+SQL/.test(normalizedCode)
      const hasEndExec = /END-EXEC/.test(normalizedCode)
      const hasHostVar = /:\w+/.test(normalizedCode)
      if (!hasExecSql || !hasEndExec) {
        return { success: false, message: getFlavorfulErrorMessage('exec_sigil_missing'), xpAwarded: 0 }
      }
      if (!hasHostVar) {
        return { success: false, message: getFlavorfulErrorMessage('sql_host_variable'), xpAwarded: 0 }
      }
      break
    }

    case 'level-30':
      if (!normalizedCode.includes('COMMIT') && !normalizedCode.includes('ROLLBACK')) {
        return { success: false, message: getFlavorfulErrorMessage('integrity'), xpAwarded: 0 }
      }
      if (!normalizedCode.includes('ENQ') || !normalizedCode.includes('DEQ')) {
        return { success: false, message: getFlavorfulErrorMessage('concurrency'), xpAwarded: 0 }
      }
      if (!normalizedCode.includes('SQLCODE') && !normalizedCode.includes('HANDLE CONDITION')) {
        return { success: false, message: getFlavorfulErrorMessage('error_handling'), xpAwarded: 0 }
      }
      {
        const hasModularity =
          normalizedCode.includes('LINKAGE SECTION') &&
          (normalizedCode.includes('GOBACK') || normalizedCode.includes('EXIT PROGRAM'))
        if (!hasModularity) {
          return { success: false, message: getFlavorfulErrorMessage('modularity'), xpAwarded: 0 }
        }
      }
      for (const line of userCode.split('\n')) {
        const trimmed = line.trim()
        const leadingSpaces = line.search(/\S/)
        if (trimmed.toUpperCase().includes('DIVISION') || trimmed.toUpperCase().includes('SECTION')) {
          if (leadingSpaces < 4 && leadingSpaces !== -1) {
            return { success: false, message: getFlavorfulErrorMessage('format'), xpAwarded: 0 }
          }
        }
      }
      break

    default: {
      const levelMatch = levelSlug.match(/level-(\d+)/)
      if (levelMatch) {
        const levelId = parseInt(levelMatch[1], 10)
        if (levelId <= 10 && !normalizedCode.includes('STOP RUN')) {
          if (normalizedCode.includes('PROCEDURE DIVISION')) {
            return {
              success: false,
              message: getFlavorfulErrorMessage('missing_stop_run'),
              xpAwarded: 0,
            }
          }
        }
        if (
          levelId > 10 &&
          levelId <= 20 &&
          !normalizedCode.includes('GOBACK') &&
          !normalizedCode.includes('EXIT PROGRAM')
        ) {
          if (normalizedCode.includes('PROCEDURE DIVISION')) {
            return {
              success: false,
              message: getFlavorfulErrorMessage('logic_fall_through'),
              xpAwarded: 0,
            }
          }
        }
        if (levelId > 20 && levelId <= 30 && normalizedCode.includes('EXEC SQL')) {
          if (!normalizedCode.includes('SQLCODE')) {
            return {
              success: false,
              message: getFlavorfulErrorMessage('incorrect_sqlcode_check'),
              xpAwarded: 0,
            }
          }
        }
      }
      break
    }
  }

  return {
    success: true,
    message: 'The ritual is complete! The Mainframe hums in approval.',
    xpAwarded: 100,
  }
}
