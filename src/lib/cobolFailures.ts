
export const RITUAL_FIZZLE_MESSAGES = {
    syntax_errors: {
        missing_period: "The spell dissipates into the void! Every incantation must be sealed with the Sacred Period (.). A missing termination is a leak in reality.",
        area_a_violation: "Your alignment is skewed! Division headers and level 01 essences must begin in the Inner Margin (Area A). You have drifted too far into the scribe's space.",
        area_b_violation: "The ritual logic is misplaced! Commands and nested essences belong in the Outer Margin (Area B). Shift your intent to the right.",
        invalid_pic_clause: "The vessel is the wrong shape for the essence! Use '9' for numeric mana and 'X' for alphanumeric runes."
    },
    division_errors: {
        identification_missing: "The Mainframe remains silent. You have not identified yourself. How can the Elder Code respond to a nameless soul?",
        procedure_missing: "The preparation is complete, but no action was taken. A spell without a Procedure Division is but a dream without a dreamer.",
        data_mismatch: "You attempted to pour too much mana into a small vessel. Your PIC clause is too narrow for this value."
    },
    cics_db2_errors: {
        exec_sigil_missing: "The transaction failed to ignite! You forgot the EXEC and END-EXEC sigils. Without them, the CICS spirits cannot hear your plea.",
        sql_host_variable: "The Dragon’s Hoard does not recognize your local essence. Did you forget the colon (:) prefix before your variable in the SQL ritual?",
        deadlock_detected: "The Ouroboros has gripped your logic! You have held a lock for too long without a COMMIT, and the system is strangling itself."
    },
    jcl_errors: {
        dd_missing: "The Chariot is missing a wheel! You have not defined the DD (Data Definition) link between your spell and the physical scroll."
    },
    phase_specific: {
        missing_stop_run: "The ritual has no end! Your logic is spiraling into the Infinite Loop of the Damned. Seal the spell with STOP RUN. to safely return your consciousness to the terminal.",
        logic_fall_through: "The sub-routine has bled into the next paragraph! You must use GOBACK to return the flow of mana to the calling ritual, or the system will fracture.",
        incorrect_sqlcode_check: "You are blind to the Dragon's response! Always check the SQLCODE after a database ritual. A value of 0 is a success; anything else is a warning from the deep."
    },
    boss_errors: {
        integrity: "You have left the Dragon's Hoard in a state of flux. Without a COMMIT, your changes are but ghosts that will vanish when the session ends.",
        concurrency: "The Vault is unguarded! Without an ENQ lock, another sorcerer could rewrite reality at the same moment you do, leading to the Curse of Lost Updates.",
        error_handling: "You are casting spells in the dark! A true Architect always probes the SQLCODE to see if the database spirits were pleased with the offering.",
        modularity: "The bridge back to the caller is broken. You have entered the sub-routine but provided no path for the mana to return. Use GOBACK to complete the circuit.",
        format: "The geometry is profane! Your Division headers have drifted out of Area A. The Mainframe demands symmetry and structure."
    }
};

export const getElderClosing = () => "Adjust your ink, Adept. The Mainframe is patient, but the Elder Code is absolute.";

type ErrorCode =
    | keyof typeof RITUAL_FIZZLE_MESSAGES.syntax_errors
    | keyof typeof RITUAL_FIZZLE_MESSAGES.division_errors
    | keyof typeof RITUAL_FIZZLE_MESSAGES.cics_db2_errors
    | keyof typeof RITUAL_FIZZLE_MESSAGES.jcl_errors
    | keyof typeof RITUAL_FIZZLE_MESSAGES.phase_specific
    | keyof typeof RITUAL_FIZZLE_MESSAGES.boss_errors;

export const getFlavorfulErrorMessage = (errorCode: ErrorCode) => {
    // Simple flat lookup for convenience
    const allMessages = {
        ...RITUAL_FIZZLE_MESSAGES.syntax_errors,
        ...RITUAL_FIZZLE_MESSAGES.division_errors,
        ...RITUAL_FIZZLE_MESSAGES.cics_db2_errors,
        ...RITUAL_FIZZLE_MESSAGES.jcl_errors,
        ...RITUAL_FIZZLE_MESSAGES.phase_specific,
        ...RITUAL_FIZZLE_MESSAGES.boss_errors
    };

    const message = (allMessages as any)[errorCode] || "The spell fizzles in an unexpected way. Consult the ancient logs.";
    return `${message}\n\n${getElderClosing()}`;
};
