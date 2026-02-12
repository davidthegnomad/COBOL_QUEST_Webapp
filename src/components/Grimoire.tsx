"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scroll, Skull, Zap, Brain, Hourglass, ChevronRight, ChevronLeft, ShieldCheck, Terminal, Database } from 'lucide-react';
import { validateLevel1, validateLevel17, validateLevel18, validateLevel19, validateLevel20, validateLevel21, validateLevel22, validateLevel23, validateLevel24, validateLevel25, validateLevel26, validateLevel27, validateLevel28, validateLevel29, validateLevel30, validateLevel31, validateLevel32, validateLevel33, ValidationResult } from '../lib/cobol';
import { useGame } from '../context/GameContext';
import GrimoireEditor from './GrimoireEditor';
import TechnomancerStats from './TechnomancerStats';
import MainframeMap from './MainframeMap';
import ArchitectAscensionModal from './ArchitectAscensionModal';
import LevelUpToast from './LevelUpToast';
import ElderMentor from './ElderMentor';
import { validateSpell } from '../app/actions/validateSpell';
import { getTechnomancerClass, getXPToNextLevel } from '../lib/levelLogic';

interface LevelConfig {
    id: number;
    title: string;
    lore: string;
    initialCode: string;
    validator: (code: string) => ValidationResult;
    insight: string;
}

const LEVELS: LevelConfig[] = [
    {
        id: 1,
        title: "The Identification Ritual",
        lore: "You stand before the Gilded Gate of the Mainframe. The silent hum of the Elder Code vibrates through the floor. To enter, you must inscribe your true name into the fabric of reality. The Spirits of the Void (Null Pointers) will consume the nameless. \n\nTask: Complete the IDENTIFICATION DIVISION to declare your PROGRAM-ID.",
        initialCode: `       IDENTIFICATION DIVISION.
       PROGRAM-ID. ____________.
       AUTHOR. ____________.`,
        validator: validateLevel1,
        insight: "Every program needs an identity. The 'PROGRAM-ID' is your true name in the system. Don't forget the period."
    },
    {
        id: 17,
        title: "The Gateway to CICS",
        lore: "The local archives are not enough. You must now reach out to the Great Network—the CICS (Customer Information Control System). In this realm, spells are not cast once and forgotten; they are triggered by 'Transactions'—short, powerful bursts of magic invoked by users across the kingdom. \n\nTask: Declare a CICS command to send a simple text map to a terminal.",
        initialCode: `       PROCEDURE DIVISION.
      * CICS spells are wrapped in special sigils.
           ____ CICS 
               SEND TEXT FROM('WELCOME TO THE NETWORK')
               ERASE
           ____ ____.
           GOBACK.`,
        validator: validateLevel17,
        insight: "All CICS commands must be wrapped in 'EXEC CICS' and 'END-EXEC'. It is the invocation of the network."
    },
    {
        id: 18,
        title: "The Screen Weaver",
        lore: "In the old ways, text flowed like a river. In the CICS realm, we use BMS Maps—ethereal templates that define exactly where runes appear on a screen. You do not just 'display'; you 'SEND MAP'. This allows the user to see fields for names, gold, and health in fixed positions. \n\nTask: Invoke the command to project the map named HEROMAP from the mapset MAPSET1.",
        initialCode: `       PROCEDURE DIVISION.
           EXEC CICS
               SEND ___('HEROMAP')
               MAPSET('MAPSET1')
               ERASE
           END-EXEC.
           GOBACK.`,
        validator: validateLevel18,
        insight: "To project a visual interface, you must 'SEND MAP'. The 'MAPSET' defines the collection of screens."
    },
    {
        id: 19,
        title: "The Commarea Pouch",
        lore: "Transactions are fleeting. When one ends, the Mainframe forgets everything—unless you store your essence in the COMMAREA. Think of it as a small pouch of memory passed from one spell to the next. If you do not check the length of this pouch, you may be reaching into nothingness. \n\nTask: In the LINKAGE SECTION, define the sacred name used by CICS to hold passed data, and then check if its length (EIBCALEN) is greater than zero.",
        initialCode: `       DATA DIVISION.
       LINKAGE SECTION.
       01  ___________.
           05 HERO-DATA  PIC X(100).

       PROCEDURE DIVISION.
           IF ________ > 0
               DISPLAY "DATA RECEIVED"
           ELSE
               DISPLAY "FIRST TIME INITIALIZATION"
           END-IF.
           GOBACK.`,
        validator: validateLevel19,
        insight: "The 'DFHCOMMAREA' is the sacred vessel for passing data. Check 'EIBCALEN' to see if it is empty."
    },
    {
        id: 20,
        title: "The Pulse of the User",
        lore: "A Master Technomancer must react to the user's gaze. Did they press the PF3 rune to flee? Or ENTER to strike? We use the HANDLE AID ritual to tell the program which paragraph to jump to based on the key pressed. \n\nTask: Set up a handler that jumps to the EXIT-RITUAL paragraph if the user presses PF3.",
        initialCode: `       PROCEDURE DIVISION.
           EXEC CICS
               HANDLE AID
               ___(EXIT-RITUAL)
           END-EXEC.
           
      * The program waits for user interaction here...`,
        validator: validateLevel20,
        insight: " The 'HANDLE AID' command allows you to trap specific keys like PF3. Direct the flow to 'EXIT-RITUAL'."
    },
    {
        id: 21,
        title: "The Shield of Stability",
        lore: "In the CICS realm, a single missing record can shatter a spell. You must raise a 'Shield of Stability.' By invoking HANDLE CONDITION, you tell the Mainframe: 'If the data is NOT FOUND, do not crash; instead, jump to this sanctuary (paragraph). \n\nTask: Set up a condition handler for the NOTFND (Not Found) event that directs the flow to a paragraph named RECORD-MISSING.",
        initialCode: `       PROCEDURE DIVISION.
           EXEC CICS
               HANDLE CONDITION
               ______(RECORD-MISSING)
           END-EXEC.
           
           EXEC CICS
               READ DATASET('HEROES')
               INTO(HERO-RECORD)
               RIDFLD(HERO-ID)
           END-EXEC.`,
        validator: validateLevel21,
        insight: "When a record vanishes, 'NOTFND' is raised. Use 'HANDLE CONDITION' to redirect execution to your error paragraph."
    },
    {
        id: 22,
        title: "The Dragon's Hoard",
        lore: "You have moved beyond simple scrolls (flat files). Now, you stand before the Dragon’s Hoard—the Relational Database. Here, data is stored in massive, interconnected tables. To retrieve gold or stats, you must embed a new language within your COBOL: the Structured Query Language (SQL). \n\nTask: Write a SELECT statement to find the GOLD_COUNT for a specific hero.",
        initialCode: `       PROCEDURE DIVISION.
      * SQL spells begin with EXEC SQL and end with END-EXEC.
           ________
               SELECT GOLD_COUNT
               INTO :WS-GOLD
               FROM HERO_TABLE
               WHERE HERO_ID = :WS-ID
           ________.`,
        validator: validateLevel22,
        insight: "In the SQL realm, use 'EXEC SQL'. Select columns INTO host variables (prefixed with a colon)."
    },
    {
        id: 23,
        title: "The Cursor's Compass",
        lore: "Sometimes the hoard is too vast to carry at once. A single SELECT cannot hold a thousand items. You must summon a Cursor—a magical compass that points to one row at a time. You must DECLARE it, OPEN it, and FETCH from it until the hoard is empty. \n\nTask: Define the command to retrieve the next row of data from the HOARD-CURSOR.",
        initialCode: `       PROCEDURE DIVISION.
           EXEC SQL OPEN HOARD-CURSOR END-EXEC.

           PERFORM UNTIL SQLCODE NOT = 0
               EXEC SQL
                   _____ HOARD-CURSOR
                   INTO :WS-ITEM-NAME
               END-EXEC
           END-PERFORM.

           EXEC SQL CLOSE HOARD-CURSOR END-EXEC.`,
        validator: validateLevel23,
        insight: "A cursor is a pointer. You must 'FETCH' the next row into your variables to process the hoard."
    },
    {
        id: 24,
        title: "The Vow of Finality",
        lore: "When dealing with the Dragon's Hoard (DB2), your changes are not permanent until you swear a Vow of Finality. If your spell is interrupted halfway through a gold transfer, the gold could vanish into the ether! You must COMMIT to save your work, or ROLLBACK to return the world to how it was before the ritual began. \n\nTask: Complete the logic to finalize the database changes if the transaction is successful.",
        initialCode: `       PROCEDURE DIVISION.
           IF SQLCODE = 0
               EXEC SQL ______ END-EXEC
               DISPLAY "THE HOARD IS UPDATED."
           ELSE
               EXEC SQL ________ END-EXEC
               DISPLAY "RITUAL FAILED. REALITY RESTORED."
           END-IF.`,
        validator: validateLevel24,
        insight: "The database waits for your word. 'COMMIT' seals the transaction; 'ROLLBACK' undoes it if errors occur."
    },
    {
        id: 25,
        title: "The JCL Chariot",
        lore: "You have written the spells, but now you must command the Chariot (The Operating System) to run them. JCL is the language of the Charioteers. It tells the Mainframe: 'Who is paying for this?', 'Which program are we running?', and 'Which scrolls (Files) should be loaded into the carriage?' \n\nTask: Identify the EXEC statement to run your compiled program named LVL-UP and define the Data Definition (DD) for the output.",
        initialCode: `//TECHJOB  JOB (ACCT),'MASTER ADEPT'
//STEP01   ____ PGM=LVL-UP
//SYSOUT   __ SYSOUT=*
//SYSIN    DD *
  (Input data goes here)
/*`,
        validator: validateLevel25,
        insight: "The JCL 'EXEC' statement runs the program. 'DD' defines the output destination, like 'SYSOUT=*'."
    },
    {
        id: 26,
        title: "The VSAM Shadow-Key",
        lore: "Standard scrolls are read from start to finish. But the VSAM Shadow-Keys allow you to teleport directly to any line in a massive archive instantly. You must define a KSDS (Key-Sequenced Data Set) and use the START command to position your gaze at a specific index before reading. \n\nTask: Complete the START command to position the file pointer at a specific HERO-ID before beginning a sequential read.",
        initialCode: `       PROCEDURE DIVISION.
           MOVE "H1024" TO HERO-ID-KEY.
           _____ SCROLL-FILE
               KEY IS NOT LESS THAN HERO-ID-KEY
               INVALID KEY
                   DISPLAY "KEY NOT IN ARCHIVE"
           END-START.`,
        validator: validateLevel26,
        insight: "VSAM files are keyed. Use 'START' to position the pointer at the 'HERO-ID-KEY' before you read."
    },
    {
        id: 27,
        title: "The Duel of Locks",
        lore: "In the Network, two Sorcerers may try to update the same Dragon's Hoard at once. This leads to the Curse of the Deadlock. You must ENQ (Enqueue) a resource to lock others out while you work, and DEQ (Dequeue) it to release the lock when your ritual is finished. \n\nTask: Secure the resource named 'GOLD-VAULT' so no other transaction can touch it.",
        initialCode: `       PROCEDURE DIVISION.
           EXEC CICS
               ___ RESOURCE('GOLD-VAULT')
               LENGTH(10)
           END-EXEC.
           
      * Perform the gold transfer logic here...
           
           EXEC CICS
               ___ RESOURCE('GOLD-VAULT')
               LENGTH(10)
           END-EXEC.`,
        validator: validateLevel27,
        insight: "Concurrency requires discipline. 'ENQ' acquires a lock on the resource, and 'DEQ' must release it."
    },
    {
        id: 28,
        title: "The Bridge to the New World",
        lore: "The kingdoms of the Outside (The Web) do not speak in fixed-width records. They speak in a tongue called JSON. You must use the TRANSFORM ritual to convert your internal Essence into a format that the Web Spirits can understand. \n\nTask: Use the CICS command to turn a COBOL data structure into a JSON container.",
        initialCode: `       PROCEDURE DIVISION.
           EXEC CICS
               ________ TRANSFORM
               JSONTRANSFORM('HERO-TO-JSON')
               CHANNEL('HERO-CHANNEL')
               CONTAINER('HERO-DATA')
           END-EXEC.`,
        validator: validateLevel28,
        insight: "To speak with the web, we use 'TRANSFORM'. It converts binary data into readable JSON."
    },
    {
        id: 29,
        title: "The Mirror Ritual",
        lore: "A Master Architect does not wait for one spell to finish before starting the next. You must learn to 'Fork' your consciousness. By using the START command, you can launch a background familiar to handle long-running tasks (like massive gold calculations) while your main ritual continues to serve the user. \n\nTask: Initiate a new transaction named GOLD to run in the background, passing it the HERO-DATA container.",
        initialCode: `       PROCEDURE DIVISION.
           EXEC CICS
               _____ TRANSID('GOLD')
               INTERVAL(0)
               FROM(HERO-DATA)
           END-EXEC.
           
           DISPLAY "BACKGROUND RITUAL INITIATED."
           GOBACK.`,
        validator: validateLevel29,
        insight: "To spawn a background process, use the 'START' command with a 'TRANSID'. It allows async processing."
    },
    {
        id: 30,
        title: "The Eternal Architect",
        lore: "You stand at the summit. The Mainframe is no longer a mystery, but a tool of your own design. For your final rite, you must architect the 'Golden Bridge'. You must receive a request from the Web, validate it against the Dragon's Hoard, and update the Ancient Scrolls—all while ensuring no other sorcerer interferes. \n\nTask: Complete the high-level logic flow for the Architect's program.",
        initialCode: `       PROCEDURE DIVISION.
      * Step 1: Lock the vault
           EXEC CICS ENQ RESOURCE('VAULT') END-EXEC.
           
      * Step 2: Fetch the current gold
           EXEC SQL _____ GOLD FROM HERO_TAB WHERE ID = :H-ID END-EXEC.
           
      * Step 3: Check for errors
           IF SQLCODE NOT = 0
               EXEC SQL ________ END-EXEC
           ELSE
      * Step 4: Finalize the update
               EXEC SQL ______ END-EXEC
           END-IF.

      * Step 5: Release the vault
           EXEC CICS DEQ RESOURCE('VAULT') END-EXEC.
           GOBACK.`,
        validator: validateLevel30,
        insight: "Combine your knowledge: Lock, Fetch, Update, Commit, and Release. The order is critical."
    },
    {
        id: 31,
        title: "The Legacy Ouroboros (Phase 1)",
        lore: "EMERGENCY! The Ancient Record has entered a Deadlock Loop. A rogue transaction is consuming all the Mainframe's Mana. If the Ouroboros isn't quelled, the entire database will revert to the 'Dark Ages'. \n\nTask: Find the missing COMMIT that is causing the database to hold a lock indefinitely.",
        initialCode: `       EXEC SQL
           UPDATE KINGDOM_TREASURY
           SET GOLD = GOLD - 1000
           WHERE REALM = 'CENTRAL'
       END-EXEC.

      * ERROR: The boss has "eaten" the next line.
      * What command must be placed here to release the locks?
       ________________.`,
        validator: validateLevel31,
        insight: "An unclosed transaction holds onto resources forever. You are missing a 'COMMIT' statement."
    },
    {
        id: 32,
        title: "The Legacy Ouroboros (Phase 2)",
        lore: "The Ouroboros launches a 'Transaction Storm'. Thousands of requests are hitting the terminal. \n\nTask: Implement a HANDLE CONDITION to catch the SYSIDERR (System ID Error) before the server crashes.",
        initialCode: `       EXEC CICS
           HANDLE CONDITION
           __________(TERMINATE-RITUAL)
       END-EXEC.`,
        validator: validateLevel32,
        insight: "When the system is overwhelmed, 'SYSIDERR' occurs. Trap this condition to fail gracefully."
    },
    {
        id: 33,
        title: "The Legacy Ouroboros (Phase 3)",
        lore: "The beast is weak. To defeat it, the user must write a perfect PROCEDURE that reads the final status of the 'Ouroboros' record and, if it exists, deletes it from the database. \n\nTask: Delete the corruption and commit the victory.",
        initialCode: `       EXEC SQL
           SELECT STATUS INTO :WS-STATUS
           FROM BOSS_TABLE WHERE ID = 'OUROBOROS'
       END-EXEC.

       IF SQLCODE = 0 AND WS-STATUS = 'WEAK'
           EXEC SQL
               ______ FROM BOSS_TABLE
               WHERE ID = 'OUROBOROS'
           END-EXEC
           EXEC SQL COMMIT END-EXEC
           DISPLAY "THE LEGACY IS SECURED!"
       ELSE
           DISPLAY "THE BEAST REGENERATES..."
       END-IF.`,
        validator: validateLevel33,
        insight: "To finish the beast, use 'DELETE' on the table. And critically, you must 'COMMIT' to seal its fate."
    }
];

export default function Grimoire() {
    const { stats, updateStats } = useGame();

    // Level State
    const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
    const currentLevel = LEVELS[currentLevelIndex];

    const [code, setCode] = useState(currentLevel.initialCode);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [showVictoryModal, setShowVictoryModal] = useState(false);
    const [isInsightRevealed, setIsInsightRevealed] = useState(false);

    // Level Up State
    const [showLevelUp, setShowLevelUp] = useState(false);
    const [levelUpData, setLevelUpData] = useState({ level: 1, className: "Novice Technomancer" });

    // Reset code when level changes
    useEffect(() => {
        setCode(currentLevel.initialCode);
        setFeedback(null);
        setIsSuccess(false);
        setIsInsightRevealed(false);
    }, [currentLevelIndex]);

    // Theme logic - The Master's Console
    const isEternalArchitect = stats.classType === "Eternal Architect";

    const handleCompile = async () => {
        // 1. Client-Side Validation (Immediate feedback)
        const localResult = currentLevel.validator(code);

        // 2. Server-Side Validation (The "Ancient Laws")
        // We run this to ensure security and robust checking, but we can assume localResult is a good preliminary check.
        // For now, we'll combine them or prioritize the Server Action if it returns specific errors.

        let finalSuccess = localResult.success;
        let finalMessage = localResult.message;
        let statRewards = localResult.statRewards;
        let newClassType = localResult.newClassType;

        try {
            const serverResult = await validateSpell(`level-${currentLevel.id}`, code);
            if (!serverResult.success) {
                // If the server rejects it, it overrides the client (or adds to it)
                finalSuccess = false;
                finalMessage = serverResult.message;
            } else if (serverResult.success && !localResult.success) {
                // Rare case: Server says OK but Local says No. usually trust Local if it's more specific, or Server if it's authoritative.
                // Let's stick to local result for the complex logic that the server might not have fully implemented yet.
            }
        } catch (e) {
            console.error("Server validation failed:", e);
        }

        if (finalSuccess) {
            setIsSuccess(true);
            setFeedback(finalMessage);

            // XP and Leveling Logic
            let newXP = stats.legacy + statRewards.legacy;
            let newLevelNum = stats.level;
            let leveledUp = false;

            // Check for Level Up (Overflow XP)
            while (newXP >= getXPToNextLevel(newLevelNum)) {
                newXP -= getXPToNextLevel(newLevelNum);
                newLevelNum++;
                leveledUp = true;
            }

            const updates: any = {
                legacy: newXP,
                logic: stats.logic + statRewards.logic,
                memory: stats.memory + statRewards.memory,
                level: newLevelNum
            };

            // Handle Class Promotion via Level
            if (leveledUp) {
                const newClass = getTechnomancerClass(newLevelNum);

                // Trigger Toast
                setLevelUpData({ level: newLevelNum, className: newClass });
                setShowLevelUp(true);
                setTimeout(() => setShowLevelUp(false), 6000); // 6s to allow reading

                if (newClass !== stats.classType) {
                    updates.classType = newClass;
                }
            }

            // Handle Specific Class Promotion (e.g. Boss Rewards overrides)
            if (newClassType) {
                updates.classType = newClassType;
                // If they become the Eternal Architect (Level 33 or 30 depending on config), show the victory modal
                if (newClassType === "Eternal Architect" && currentLevel.id >= 30) {
                    setTimeout(() => setShowVictoryModal(true), 2000); // Slight delay for dramatic effect
                }
            }

            updateStats(updates);

            try {
                await fetch('/api/progress', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        questId: `level-${currentLevel.id}`,
                        status: "COMPLETED",
                        codeSubmission: code
                    })
                });
            } catch (err) {
                console.error("Failed to scribe progress to the Archive", err);
            }

        } else {
            setIsSuccess(false);
            setFeedback(finalMessage);
            updateStats({
                logic: Math.max(0, stats.logic + statRewards.logic)
            });
        }
    };

    const nextLevel = () => {
        if (currentLevelIndex < LEVELS.length - 1) {
            setCurrentLevelIndex(prev => prev + 1);
        }
    };

    const prevLevel = () => {
        if (currentLevelIndex > 0) {
            setCurrentLevelIndex(prev => prev - 1);
        }
    };

    return (
        <div className={`min-h-screen p-8 flex flex-col items-center justify-center transition-colors duration-1000 relative overflow-hidden ${isEternalArchitect ? 'bg-black text-cyan-400 font-mono' : 'bg-[#0c0a09] text-ink-DEFAULT'}`}>

            {/* Background Image Layer */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
                    style={{ backgroundImage: "url('/fantasy_mainframe_bg.png')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80" />
            </div>

            {/* Layout Container */}
            <div className="relative z-10 flex items-stretch gap-[15px] max-w-7xl w-full min-h-[85vh] h-auto">

                {/* Left Side: Stats HUD */}
                <div className="w-[300px] flex-shrink-0 hidden lg:block self-start sticky top-8">
                    <TechnomancerStats logic={stats.logic} memory={stats.memory} legacy={stats.legacy} className="min-h-[600px]" />
                </div>

                {/* Right Side: The Master's Console */}
                <div className="flex-grow flex flex-col min-w-0">
                    {/* Mobile Stats / Compact Header */}
                    <div className="lg:hidden w-full mb-4">
                        <TechnomancerStats logic={stats.logic} memory={stats.memory} legacy={stats.legacy} />
                    </div>

                    <div className={`relative flex-grow flex flex-col rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] transition-all duration-1000 ${isEternalArchitect
                        ? 'border-4 border-cyan-500 shadow-[0_0_50px_rgba(6,182,212,0.3)]'
                        : 'border-4 border-stone-800'
                        }`}>

                        {/* Top Section: The Terminal (Editor) - Fixed Height */}
                        <div className="h-[350px] shrink-0 relative bg-black border-b-4 border-stone-800">
                            <GrimoireEditor
                                initialCode={code}
                                onChange={(val) => setCode(val || '')}
                                onValidate={handleCompile}
                            />
                        </div>

                        {/* Bottom Section: The Active Routine (Lore & Feedback) - Dynamic Height */}
                        <div className={`p-8 relative flex flex-col flex-grow ${isEternalArchitect
                            ? 'bg-black/95 text-cyan-100'
                            : 'bg-[#1a1816] text-stone-300 shadow-inner'
                            }`}>

                            {!isEternalArchitect && (
                                <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('/parchment-texture.png')] bg-repeat mix-blend-overlay" />
                            )}

                            <div className="relative z-10 flex flex-col h-full">
                                <header className={`border-b border-stone-800 pb-3 mb-4 flex justify-between items-end flex-shrink-0`}>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gold-600 animate-pulse" />
                                            <span className="font-mono text-gold-600 text-[9px] uppercase tracking-widest">Active Routine</span>
                                        </div>
                                        <h1 className={`text-xl md:text-2xl lg:text-3xl font-bold flex items-center gap-3 ${isEternalArchitect ? 'text-cyan-400 font-mono tracking-widest' : 'text-white'}`}>
                                            {isEternalArchitect ? <Terminal className="w-6 h-6" /> : <Scroll className="w-6 h-6 text-gold-DEFAULT" />}
                                            {currentLevel.title}
                                        </h1>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => setShowMap(true)}
                                            className={`px-4 py-2 bg-stone-900 border border-gold-500/50 rounded flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] hover:bg-gold-500/10 hover:border-gold-500 hover:text-gold-400 transition-all text-stone-400 group shadow-lg shadow-black/40`}
                                        >
                                            <Database size={14} className="text-gold-600 group-hover:text-gold-400 transition-colors" />
                                            <span>Access Map</span>
                                        </button>
                                        <span className="font-mono text-[9px] text-stone-700 uppercase">Artifact {currentLevel.id}</span>
                                    </div>
                                </header>

                                <div className={`flex-grow mb-4`}>
                                    {/* Feedback Section (Moved to Top) */}
                                    <div className="mb-6 empty:hidden">
                                        <ElderMentor message={!isSuccess ? feedback : null} />

                                        {feedback && isSuccess && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="p-4 bg-green-950/20 border border-green-500/30 rounded-lg text-green-100 flex items-center gap-3 shadow-[0_0_20px_rgba(34,197,94,0.05)]"
                                            >
                                                <div className="bg-green-500 rounded-full p-1 flex-shrink-0">
                                                    <ShieldCheck size={14} className="text-black" />
                                                </div>
                                                <div>
                                                    <p className="font-mono font-bold text-[10px] tracking-widest text-green-400 uppercase leading-none mb-1">Ritual Complete</p>
                                                    <p className="text-sm text-green-100/80 italic font-lore">"{feedback}"</p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>

                                    {/* Lore & Task Split Rendering */}
                                    {(() => {
                                        // Use regex to split on "Task:" with optional newlines, capturing the rest
                                        const parts = currentLevel.lore.split(/\s*Task:\s*/);
                                        const mainLore = parts[0];
                                        const taskText = parts.length > 1 ? parts[1] : null;

                                        return (
                                            <>
                                                <p className="font-lore text-sm md:text-base lg:text-xl leading-relaxed text-stone-300 first-letter:text-3xl lg:first-letter:text-5xl first-letter:font-bold first-letter:text-gold-500 first-letter:mr-2 first-letter:float-left first-letter:mt-1">
                                                    {mainLore}
                                                </p>
                                                {taskText && (
                                                    <div className="mt-6 p-3 bg-stone-950/40 border-l-2 border-gold rounded-r">
                                                        <span className="block font-mono text-xs text-gold/60 uppercase tracking-widest mb-1 font-bold">Current Protocol</span>
                                                        <p className="font-lore text-[#eac124] italic text-sm md:text-base lg:text-xl">
                                                            "Task: {taskText}"
                                                        </p>
                                                    </div>
                                                )}
                                            </>
                                        );
                                    })()}

                                    <div
                                        onClick={() => setIsInsightRevealed(true)}
                                        className={`mt-6 p-4 bg-stone-950/50 border border-stone-800 rounded-lg text-sm italic cursor-pointer group transition-all duration-500 hover:border-gold-500/30 relative overflow-hidden`}
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <Hourglass size={14} className="text-gold-600" />
                                            <span className="font-mono text-[9px] text-gold-600 uppercase tracking-widest">Architect's Insight</span>
                                        </div>

                                        <div className="relative">
                                            <span className={`text-stone-400 font-lore transition-all duration-700 block ${isInsightRevealed ? 'blur-0 opacity-100' : 'blur-md opacity-30 select-none'}`}>
                                                {currentLevel.insight}
                                            </span>

                                            {!isInsightRevealed && (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="text-gold-500 font-mono text-[10px] uppercase tracking-widest bg-black/80 px-4 py-2 rounded border border-gold-500/30 backdrop-blur-sm group-hover:bg-gold-500/20 group-hover:scale-105 transition-all shadow-lg shadow-black/50">
                                                        Tap to Decrypt
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Level Navigation Controls */}
                                <div className={`mt-auto pt-4 border-t border-stone-800 flex justify-between items-center flex-shrink-0`}>
                                    <button
                                        onClick={prevLevel}
                                        disabled={currentLevelIndex === 0}
                                        className={`group flex items-center gap-2 px-3 py-1.5 rounded transition-all ${currentLevelIndex === 0 ? 'opacity-0' : 'opacity-100 hover:bg-stone-800'}`}
                                    >
                                        <ChevronLeft size={16} className="text-stone-600 group-hover:text-gold-400 transition-colors" />
                                        <span className="font-mono text-[9px] text-stone-500 group-hover:text-stone-200 uppercase tracking-widest">Prev</span>
                                    </button>

                                    <div className="flex items-center gap-1.5">
                                        {[...Array(Math.min(5, LEVELS.length))].map((_, i) => (
                                            <div key={i} className={`h-1 w-3 rounded-full transition-all ${i === (currentLevelIndex % 5) ? 'bg-gold-500 w-6' : 'bg-stone-800'}`} />
                                        ))}
                                    </div>

                                    <button
                                        onClick={nextLevel}
                                        disabled={currentLevelIndex === LEVELS.length - 1}
                                        className={`group flex items-center gap-2 px-3 py-1.5 rounded transition-all ${currentLevelIndex === LEVELS.length - 1 ? 'opacity-0' : 'opacity-100 hover:bg-stone-800'}`}
                                    >
                                        <span className="font-mono text-[9px] text-stone-500 group-hover:text-stone-200 uppercase tracking-widest">Next</span>
                                        <ChevronRight size={16} className="text-stone-600 group-hover:text-gold-400 transition-colors" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-500/5 blur-[100px] pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Sub-footer detail */}
            <div className="relative z-10 text-[10px] font-mono text-stone-500 uppercase tracking-[0.4em] mt-8">
                Mainframe Connection: <span className="text-green-500 animate-pulse">SECURE_NODE_ALPHA</span>
            </div>

            {/* Map Modal */}
            {showMap && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-8" onClick={() => setShowMap(false)}>
                    <div className="w-full max-w-5xl" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-cinzel text-gold-500">The Silicon Sanctum</h2>
                            <button onClick={() => setShowMap(false)} className="text-stone-400 hover:text-white">✕ CLOSE</button>
                        </div>
                        <MainframeMap
                            currentLevel={stats.level}
                            onLevelSelect={(id) => {
                                const idx = LEVELS.findIndex(l => l.id === id);
                                if (idx !== -1) {
                                    setCurrentLevelIndex(idx);
                                    setShowMap(false);
                                }
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Victory Modal */}
            <ArchitectAscensionModal
                isOpen={showVictoryModal}
                onClose={() => setShowVictoryModal(false)}
                heroName={stats.classType === "Novice" ? "Novice Coder" : "Master Adept"}
            />

            {/* Level Up Toast */}
            <LevelUpToast
                show={showLevelUp}
                level={levelUpData.level}
                className={levelUpData.className}
                onClose={() => setShowLevelUp(false)}
            />
        </div>
    );
}
