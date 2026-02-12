export interface ValidationResult {
    success: boolean;
    message: string;
    programId: string | null;
    statRewards: {
        logic: number;
        memory: number;
        legacy: number;
    };
    newClassType?: string;
}

export const validateLevel1 = (code: string): ValidationResult => {
    const lines = code.split('\n');
    let hasIdDiv = false;
    let hasProgramId = false;
    let programId = null;

    // Rules of the Grimoire
    const AREA_A_INDENT = 4; // Minimum spaces for Area A

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim(); // The essence of the line
        const leadingSpaces = line.search(/\S/);

        // Ignore empty scrolls
        if (trimmed.length === 0) continue;

        // Rule 1: The Sacred Period
        if (!trimmed.endsWith('.')) {
            return {
                success: false,
                message: "The Spell Fizzles! You have forgotten the Sacred Period (.) of termination on line " + (i + 1) + ".",
                programId: null,
                statRewards: { logic: -1, memory: 0, legacy: 0 }
            };
        }

        // Rule 2: Area A Compliance (Divisions and Sections)
        if (trimmed.toUpperCase().includes("DIVISION") || trimmed.toUpperCase().includes("PROGRAM-ID")) {
            if (leadingSpaces < AREA_A_INDENT) {
                return {
                    success: false,
                    message: "Alignment Error! The Ancient Structures must reside in Area A (start with at least 4 spaces) on line " + (i + 1) + ".",
                    programId: null,
                    statRewards: { logic: -2, memory: 0, legacy: 0 }
                };
            }
        }

        // Check for specific runes
        if (/IDENTIFICATION\s+DIVISION\./i.test(trimmed)) hasIdDiv = true;

        const progIdMatch = trimmed.match(/PROGRAM-ID\.\s+([A-Za-z0-9-_]+)\./i);
        if (progIdMatch) {
            hasProgramId = true;
            programId = progIdMatch[1];
        }
    }

    if (!hasIdDiv) {
        return {
            success: false,
            message: "The Scroll is formless! You must invoke the 'IDENTIFICATION DIVISION.' to begin.",
            programId: null,
            statRewards: { logic: -1, memory: 0, legacy: 0 }
        };
    }

    if (!hasProgramId) {
        return {
            success: false,
            message: "The Spirits of the Void do not know you! Inscribe your 'PROGRAM-ID'.",
            programId: null,
            statRewards: { logic: -1, memory: 0, legacy: 0 }
        };
    }

    if (programId === "____________") {
        return {
            success: false,
            message: "The illusion fails! You must replace the placeholder '____________' with your true Name.",
            programId: null,
            statRewards: { logic: 0, memory: 0, legacy: 0 }
        };
    }

    return {
        success: true,
        message: "The Runes Glow with Power! Your identity is etched into the Mainframe.",
        programId: programId,
        statRewards: { logic: 5, memory: 2, legacy: 100 }
    };
};

export const validateLevel17 = (code: string): ValidationResult => {
    const lines = code.split('\n');
    let hasExec = false;
    let hasEndExec = false;
    let hasSendText = false;

    for (let i = 0; i < lines.length; i++) {
        const trimmed = lines[i].trim().toUpperCase();

        if (trimmed.includes("EXEC CICS")) hasExec = true;
        if (trimmed.includes("END-EXEC")) hasEndExec = true;

        // Simple check for the command content (optional, but good for "The Map")
        if (trimmed.includes("SEND TEXT")) hasSendText = true;
    }

    if (!hasExec || !hasEndExec) {
        return {
            success: false,
            message: "The Transaction failed! Without the EXEC and END-EXEC sigils, the CICS spirits cannot hear your request.",
            programId: null,
            statRewards: { logic: -5, memory: 0, legacy: 0 }
        };
    }

    if (!hasSendText) {
        return {
            success: false,
            message: "The portal opens, but you speak nothing! You must SEND TEXT to the terminal.",
            programId: null,
            statRewards: { logic: -2, memory: 0, legacy: 0 }
        };
    }

    return {
        success: true,
        message: "The Crystal Screen flickers to life! 'WELCOME TO THE NETWORK' glows in green phosphor.",
        programId: null,
        statRewards: { logic: 20, memory: 10, legacy: 500 }
    };
};

export const validateLevel18 = (code: string): ValidationResult => {
    // Level 18: SEND MAP
    const upperCode = code.toUpperCase();

    if (!upperCode.includes("SEND MAP")) {
        return {
            success: false,
            message: "The screen remains dark! You must Project the 'MAP' to the user's terminal.",
            programId: null,
            statRewards: { logic: -2, memory: 0, legacy: 0 }
        };
    }

    if (!upperCode.includes("HEROMAP")) {
        return {
            success: false,
            message: "Distorted visuals! You must specificy the 'HEROMAP' correctly.",
            programId: null,
            statRewards: { logic: 0, memory: -1, legacy: 0 }
        };
    }

    return {
        success: true,
        message: "The Interface Manifests! Fields for Name, Gold, and Health appear in perfect alignment.",
        programId: null,
        statRewards: { logic: 10, memory: 15, legacy: 1200 }
    };
};

export const validateLevel19 = (code: string): ValidationResult => {
    // Level 19: DFHCOMMAREA and EIBCALEN
    const upperCode = code.toUpperCase();

    // Check Linkage Section declaration
    if (!/01\s+DFHCOMMAREA\./.test(upperCode) && !/01\s+DFHCOMMAREA\s/.test(upperCode)) {
        return {
            success: false,
            message: "The Mainframe does not recognize the sacred vessel! You must define '01 DFHCOMMAREA' in the Linkage Section.",
            programId: null,
            statRewards: { logic: -5, memory: 0, legacy: 0 }
        };
    }

    // Check Procedure Division check
    if (!upperCode.includes("IF EIBCALEN > 0")) {
        return {
            success: false,
            message: "You are reaching into the Void blindly! You must check the 'EIBCALEN' to see if data exists.",
            programId: null,
            statRewards: { logic: -5, memory: 0, legacy: 0 }
        };
    }

    return {
        success: true,
        message: "The Memory Pouch is secured! Data flows safely from the previous transaction.",
        programId: null,
        statRewards: { logic: 20, memory: 10, legacy: 1500 }
    };
};

export const validateLevel20 = (code: string): ValidationResult => {
    // Level 20: HANDLE AID PF3
    const upperCode = code.toUpperCase();

    if (!upperCode.includes("HANDLE AID")) {
        return {
            success: false,
            message: "The program is deaf to the user! Invoke 'HANDLE AID' to listen.",
            programId: null,
            statRewards: { logic: -2, memory: 0, legacy: 0 }
        };
    }

    if (!upperCode.includes("PF3(EXIT-RITUAL)")) {
        return {
            success: false,
            message: "You ignore the user's desire to flee! You must bind 'PF3' to the 'EXIT-RITUAL'.",
            programId: null,
            statRewards: { logic: -2, memory: 0, legacy: 0 }
        };
    }

    return {
        success: true,
        message: "Reflexes Sharpened! The program now anticipates the user's keystrokes.",
        programId: null,
        statRewards: { logic: 15, memory: 5, legacy: 1300 }
    };
};

export const validateLevel21 = (code: string): ValidationResult => {
    // Level 21: HANDLE CONDITION NOTFND
    const upperCode = code.toUpperCase();

    if (!upperCode.includes("HANDLE CONDITION")) {
        return {
            success: false,
            message: "Chaos reigns! You must invoke 'HANDLE CONDITION' to raise the Shield of Stability.",
            programId: null,
            statRewards: { logic: -3, memory: 0, legacy: 0 }
        };
    }

    if (!upperCode.includes("NOTFND(RECORD-MISSING)")) {
        return {
            success: false,
            message: "The void consumes your search! You must bind 'NOTFND' to the sanctuary 'RECORD-MISSING'.",
            programId: null,
            statRewards: { logic: -3, memory: 0, legacy: 0 }
        };
    }

    return {
        success: true,
        message: "The Shield is Raised! Errors will flow harmlessly to the safety of your handler.",
        programId: null,
        statRewards: { logic: 20, memory: 5, legacy: 1800 }
    };
};

export const validateLevel22 = (code: string): ValidationResult => {
    // Level 22: Embedded SQL
    const upperCode = code.toUpperCase();

    // Check for SQL delimiters
    if (!upperCode.includes("EXEC SQL") || !upperCode.includes("END-EXEC")) {
        return {
            success: false,
            message: "The Dragon sleeps! You must wrap your query in 'EXEC SQL' and 'END-EXEC' sigils.",
            programId: null,
            statRewards: { logic: 0, memory: -5, legacy: 0 }
        };
    }

    // Check for SELECT/INTO/FROM/WHERE structure (basic check)
    if (!upperCode.includes("SELECT") || !upperCode.includes("INTO") || !upperCode.includes("FROM")) {
        return {
            success: false,
            message: "The incantation is garbled! Standard SQL syntax (SELECT... INTO... FROM...) is required.",
            programId: null,
            statRewards: { logic: -2, memory: 0, legacy: 0 }
        };
    }

    return {
        success: true,
        message: "The Hoard Opens! Gold flows from the Relational Tables into your variables.",
        programId: null,
        statRewards: { logic: 10, memory: 25, legacy: 2200 }
    };
};

export const validateLevel23 = (code: string): ValidationResult => {
    // Level 23: Cursor Fetch
    const upperCode = code.toUpperCase();

    if (!upperCode.includes("FETCH HOARD-CURSOR")) {
        return {
            success: false,
            message: "The Compass spins wildly! You must 'FETCH' from the 'HOARD-CURSOR' to retrieve the next item.",
            programId: null,
            statRewards: { logic: -4, memory: 0, legacy: 0 }
        };
    }

    if (!upperCode.includes("INTO :WS-ITEM-NAME")) {
        return {
            success: false,
            message: "You grasp at air! You must specify 'INTO :WS-ITEM-NAME' to hold the fetched treasure.",
            programId: null,
            statRewards: { logic: -2, memory: 0, legacy: 0 }
        };
    }

    return {
        success: true,
        message: "The Compass Guides You! One by one, the items of the hoard are revealed.",
        programId: null,
        statRewards: { logic: 30, memory: 10, legacy: 3000 }
    };
};

export const validateLevel24 = (code: string): ValidationResult => {
    // Level 24: COMMIT and ROLLBACK
    const upperCode = code.toUpperCase();

    if (!upperCode.includes("EXEC SQL COMMIT")) {
        return {
            success: false,
            message: "The Hoard is in flux! You must 'COMMIT' your changes to make them permanent.",
            programId: null,
            statRewards: { logic: -3, memory: 0, legacy: 0 }
        };
    }

    if (!upperCode.includes("EXEC SQL ROLLBACK")) {
        return {
            success: false,
            message: "Danger! If the spell fails, you must 'ROLLBACK' to restore the timeline.",
            programId: null,
            statRewards: { logic: -3, memory: 0, legacy: 0 }
        };
    }

    return {
        success: true,
        message: "The Vow is Sealed! The Dragon's Hoard is consistent, and reality is stable.",
        programId: null,
        statRewards: { logic: 25, memory: 5, legacy: 2500 }
    };
};

export const validateLevel25 = (code: string): ValidationResult => {
    // Level 25: JCL EXEC and DD
    const upperCode = code.toUpperCase();

    if (!upperCode.includes("EXEC PGM=")) {
        return {
            success: false,
            message: "The Chariot won't budge! Without the 'EXEC' command, the Mainframe doesn't know which spell to cast.",
            programId: null,
            statRewards: { logic: 0, memory: -5, legacy: 0 }
        };
    }

    // Check for DD statement (Data Definition)
    // regex to look for "DD" surrounded by spaces or at appropriate spots
    if (!/\sDD\s/.test(upperCode) && !/\sDD$/.test(upperCode)) {
        return {
            success: false,
            message: "The carriage has no cargo! You must define the files (Data Definition) using 'DD'.",
            programId: null,
            statRewards: { logic: -2, memory: 0, legacy: 0 }
        };
    }

    return {
        success: true,
        message: "The Engines Roar! The Job Control Chariot launches your program into the Processor Core!",
        programId: null,
        statRewards: { logic: 20, memory: 50, legacy: 5000 }
    };
};

export const validateLevel26 = (code: string): ValidationResult => {
    // Level 26: VSAM START
    const upperCode = code.toUpperCase();

    // Check for START command
    if (!/START\s+[A-Z0-9-]+/.test(upperCode)) {
        return {
            success: false,
            message: "You gaze blindly at the scroll! You must use 'START' to position your eye at the Shadow-Key.",
            programId: null,
            statRewards: { logic: 0, memory: -5, legacy: 0 }
        };
    }

    if (!upperCode.includes("KEY IS NOT LESS THAN")) {
        return {
            success: false,
            message: " The Shadow-Key is lost! You must specify the 'KEY IS NOT LESS THAN' condition.",
            programId: null,
            statRewards: { logic: -2, memory: 0, legacy: 0 }
        };
    }

    return {
        success: true,
        message: "The Shadow-Key Turns! You are instantly transported to the correct record in the archive.",
        programId: null,
        statRewards: { logic: 20, memory: 30, legacy: 3500 }
    };
};

export const validateLevel27 = (code: string): ValidationResult => {
    // Level 27: ENQ and DEQ
    const upperCode = code.toUpperCase();

    if (!upperCode.includes("EXEC CICS ENQ")) {
        return {
            success: false,
            message: "The Hoard is unguarded! You must 'ENQ' (Enqueue) the resource to claim exclusive rights.",
            programId: null,
            statRewards: { logic: -3, memory: 0, legacy: 0 }
        };
    }

    if (!upperCode.includes("EXEC CICS DEQ")) {
        return {
            success: false,
            message: "You are hoarding the magic! You must 'DEQ' (Dequeue) the resource to release it for others.",
            programId: null,
            statRewards: { logic: -3, memory: 0, legacy: 0 }
        };
    }

    return {
        success: true,
        message: "The Lock is Secured and Released! The Curse of the Deadlock is broken.",
        programId: null,
        statRewards: { logic: 35, memory: 5, legacy: 4000 }
    };
};

export const validateLevel28 = (code: string): ValidationResult => {
    // Level 28: JSON TRANSFORM
    const upperCode = code.toUpperCase();

    if (!upperCode.includes("EXEC CICS TRANSFORM")) {
        return {
            success: false,
            message: "The Web Spirits are confused! You must 'TRANSFORM' your essence into their tongue.",
            programId: null,
            statRewards: { logic: -4, memory: 0, legacy: 0 }
        };
    }

    if (!upperCode.includes("JSONTRANSFORM")) {
        return {
            success: false,
            message: "The dialect is wrong! You must specify 'JSONTRANSFORM' to bridge the worlds.",
            programId: null,
            statRewards: { logic: -2, memory: 0, legacy: 0 }
        };
    }

    return {
        success: true,
        message: "The Data Transcends! Your ancient COBOL records are reborn as modern JSON.",
        programId: null,
        statRewards: { logic: 40, memory: 10, legacy: 5000 }
    };
};

export const validateLevel29 = (code: string): ValidationResult => {
    // Level 29: EXEC CICS START
    const upperCode = code.toUpperCase();

    // Check for START command
    if (!upperCode.includes("EXEC CICS START")) {
        return {
            success: false,
            message: " The Mirror is broken! You must use 'EXEC CICS START' to create a new reflection (transaction).",
            programId: null,
            statRewards: { logic: -2, memory: 0, legacy: 0 }
        };
    }

    if (!upperCode.includes("TRANSID('GOLD')")) {
        return {
            success: false,
            message: "The reflection has no name! You must identify the 'TRANSID'.",
            programId: null,
            statRewards: { logic: -2, memory: 0, legacy: 0 }
        };
    }

    return {
        success: true,
        message: "The Reflection Steps Forth! A background ritual begins, leaving you free to cast other spells.",
        programId: null,
        statRewards: { logic: 40, memory: 0, legacy: 6000 }
    };
};

export const validateLevel30 = (code: string): ValidationResult => {
    // Level 30: The Eternal Architect
    const upperCode = code.toUpperCase();
    const lines = code.split('\n');

    // Pillar 5: Geometry (Area A)
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();
        const leadingSpaces = line.search(/\S/);
        if (trimmed.toUpperCase().includes('DIVISION') || trimmed.toUpperCase().includes('SECTION')) {
            if (leadingSpaces < 4 && leadingSpaces !== -1) {
                return {
                    success: false,
                    message: "The geometry is profane! Your Division headers have drifted out of Area A on line " + (i + 1) + ". The Mainframe demands symmetry.",
                    programId: null,
                    statRewards: { logic: -5, memory: 0, legacy: 0 }
                };
            }
        }
    }

    // Pillar 1: Integrity (COMMIT/ROLLBACK)
    if (!upperCode.includes("COMMIT") && !upperCode.includes("ROLLBACK")) {
        return {
            success: false,
            message: "You have left the Dragon's Hoard in a state of flux. Without a COMMIT, your changes are but ghosts that will vanish.",
            programId: null,
            statRewards: { logic: -10, memory: 0, legacy: 0 }
        };
    }

    // Pillar 2: Concurrency (ENQ/DEQ)
    if (!upperCode.includes("ENQ") || !upperCode.includes("DEQ")) {
        return {
            success: false,
            message: "The Vault is unguarded! Without an ENQ lock, another sorcerer could rewrite reality at the same moment you do.",
            programId: null,
            statRewards: { logic: -15, memory: 0, legacy: 0 }
        };
    }

    // Pillar 3: Error Handling (SQLCODE/HANDLE CONDITION)
    if (!upperCode.includes("SQLCODE") && !upperCode.includes("HANDLE CONDITION")) {
        return {
            success: false,
            message: "You are casting spells in the dark! A true Architect always probes the SQLCODE to see if the database spirits were pleased.",
            programId: null,
            statRewards: { logic: -10, memory: 0, legacy: 0 }
        };
    }

    // Pillar 4: Modularity (LINKAGE SECTION and GOBACK/EXIT PROGRAM)
    const hasModularity = upperCode.includes('LINKAGE SECTION') && (upperCode.includes('GOBACK') || upperCode.includes('EXIT PROGRAM'));
    if (!hasModularity) {
        return {
            success: false,
            message: "The bridge back to the caller is broken. You have entered the sub-routine but provided no path for the mana to return.",
            programId: null,
            statRewards: { logic: -10, memory: 0, legacy: 0 }
        };
    }

    return {
        success: true,
        message: "THE ARCHITECTURE IS COMPLETE. You have woven the final spell, bridging the ancient and the new. You are the Eternal Architect.",
        programId: null,
        statRewards: { logic: 100, memory: 100, legacy: 10000 },
        newClassType: "Eternal Architect"
    };
};

export const validateLevel31 = (code: string): ValidationResult => {
    // Level 31: The Legacy Ouroboros - Phase 1 (COMMIT)
    // The user must input EXEC SQL COMMIT END-EXEC to release the locks.
    const upperCode = code.toUpperCase();

    if (!upperCode.includes("EXEC SQL COMMIT")) {
        return {
            success: false,
            message: " The Ouroboros tightens its grip! The locks remain held. You must 'COMMIT' the transaction to free the database.",
            programId: null,
            statRewards: { logic: -5, memory: 0, legacy: 0 }
        };
    }

    return {
        success: true,
        message: "The Locks Shatter! The database breathes again, but the storm is not over...",
        programId: null,
        statRewards: { logic: 50, memory: 20, legacy: 5000 }
    };
};

export const validateLevel32 = (code: string): ValidationResult => {
    // Level 32: The Legacy Ouroboros - Phase 2 (HANDLE CONDITION SYSIDERR)
    // The user must handle the SYSIDERR condition.
    const upperCode = code.toUpperCase();

    if (!upperCode.includes("SYSIDERR")) {
        return {
            success: false,
            message: "The Transaction Storm overwhelms you! The System ID is failing. Catch the 'SYSIDERR'!",
            programId: null,
            statRewards: { logic: -5, memory: 0, legacy: 0 }
        };
    }

    if (!upperCode.includes("HANDLE CONDITION")) {
        return {
            success: false,
            message: " Your shield is down! Raise the 'HANDLE CONDITION' barrier!",
            programId: null,
            statRewards: { logic: -5, memory: 0, legacy: 0 }
        };
    }

    return {
        success: true,
        message: "The Storm Breaks! Your error handler deflects the chaotic requests. Now for the killing blow.",
        programId: null,
        statRewards: { logic: 50, memory: 20, legacy: 5000 }
    };
};

export const validateLevel33 = (code: string): ValidationResult => {
    // Level 33: The Legacy Ouroboros - Phase 3 (The Killing Blow)
    // Delete the Ouroboros record and Commit.
    const upperCode = code.toUpperCase();

    const hasDelete = upperCode.includes("DELETE") && upperCode.includes("BOSS_TABLE");
    const hasCommit = upperCode.includes("COMMIT");

    if (!hasDelete) {
        return {
            success: false,
            message: "You hesitate! You must 'DELETE' the corruption from the BOSS_TABLE.",
            programId: null,
            statRewards: { logic: -10, memory: 0, legacy: 0 }
        };
    }

    if (!hasCommit) {
        return {
            success: false,
            message: "The beast regenerates! You forgot to 'COMMIT' the final blow!",
            programId: null,
            statRewards: { logic: -10, memory: 0, legacy: 0 }
        };
    }

    // Ensure logic correctness (basic check)
    if (upperCode.indexOf("DELETE") > upperCode.indexOf("COMMIT")) {
        return {
            success: false,
            message: "Chronology Error! You committed before striking. The beast lives.",
            programId: null,
            statRewards: { logic: -5, memory: 0, legacy: 0 }
        };
    }

    return {
        success: true,
        message: "THE OUROBOROS FALLS! The Legacy is secured. You have ascended beyond the system.",
        programId: null,
        statRewards: { logic: 500, memory: 500, legacy: 50000 },
        newClassType: "Eternal Architect"
    };
};
