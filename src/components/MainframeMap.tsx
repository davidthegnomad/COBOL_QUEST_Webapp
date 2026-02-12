'use client'
import React from 'react';
import { motion } from 'framer-motion';

// Define the structure of the map nodes
// We'll create a "Circuit Board" layout with 3 distinct zones.
interface LevelNode {
    id: number;
    x: number;
    y: number;
    label: string;
    zone: 'Outer Rim' | 'Inner Core' | 'Ethereal Plane';
}

const LEVEL_NODES: LevelNode[] = [
    // --- The Outer Rim (Batch COBOL) ---
    { id: 1, x: 50, y: 350, label: 'IDENTIFICATION', zone: 'Outer Rim' },
    { id: 2, x: 120, y: 350, label: 'ENVIRONMENT', zone: 'Outer Rim' },
    { id: 3, x: 190, y: 350, label: 'DATA', zone: 'Outer Rim' },
    { id: 4, x: 190, y: 280, label: 'PROCEDURE', zone: 'Outer Rim' }, // Up
    { id: 5, x: 120, y: 280, label: 'VERBS', zone: 'Outer Rim' },     // Left
    { id: 6, x: 50, y: 280, label: 'CONDITIONAL', zone: 'Outer Rim' },// Left
    { id: 7, x: 50, y: 210, label: 'PERFORM', zone: 'Outer Rim' },    // Up
    { id: 8, x: 120, y: 210, label: 'TABLES', zone: 'Outer Rim' },    // Right
    { id: 9, x: 190, y: 210, label: 'FILES', zone: 'Outer Rim' },     // Right
    { id: 10, x: 260, y: 210, label: 'SORT', zone: 'Outer Rim' },     // Right
    { id: 11, x: 260, y: 280, label: 'MERGE', zone: 'Outer Rim' },    // Down
    { id: 12, x: 330, y: 280, label: 'REPORT', zone: 'Outer Rim' },   // Right
    { id: 13, x: 330, y: 350, label: 'CALL', zone: 'Outer Rim' },     // Down
    { id: 14, x: 400, y: 350, label: 'COPY', zone: 'Outer Rim' },     // Right
    { id: 15, x: 400, y: 280, label: 'INSPECT', zone: 'Outer Rim' },  // Up
    { id: 16, x: 400, y: 210, label: 'STRING', zone: 'Outer Rim' },   // Up - END of Outer Rim

    // --- The Inner Core (CICS & DB2) ---
    { id: 17, x: 480, y: 210, label: 'CICS INTRO', zone: 'Inner Core' }, // Enter Core
    { id: 18, x: 550, y: 210, label: 'BMS MAPS', zone: 'Inner Core' },
    { id: 19, x: 550, y: 140, label: 'COMMAREA', zone: 'Inner Core' },   // Up
    { id: 20, x: 480, y: 140, label: 'HANDLE AID', zone: 'Inner Core' }, // Left
    { id: 21, x: 480, y: 70, label: 'CONDITIONS', zone: 'Inner Core' },  // Up
    { id: 22, x: 550, y: 70, label: 'DB2 SELECT', zone: 'Inner Core' },  // Right
    { id: 23, x: 620, y: 70, label: 'CURSORS', zone: 'Inner Core' },     // Right
    { id: 24, x: 620, y: 140, label: 'COMMIT', zone: 'Inner Core' },     // Down
    { id: 25, x: 620, y: 210, label: 'JCL', zone: 'Inner Core' },        // Down - End of Core

    // --- The Ethereal Plane (Advanced Architecture) ---
    { id: 26, x: 700, y: 210, label: 'VSAM', zone: 'Ethereal Plane' },   // Right
    { id: 27, x: 700, y: 140, label: 'ENQ/DEQ', zone: 'Ethereal Plane' },// Up
    { id: 28, x: 700, y: 70, label: 'JSON', zone: 'Ethereal Plane' },    // Up
    { id: 29, x: 770, y: 70, label: 'ASYNC', zone: 'Ethereal Plane' },   // Right
    { id: 30, x: 770, y: 350, label: 'ARCHITECT', zone: 'Ethereal Plane' } // The Final Boss (Big jump down or separate node)
    // Adjusted 30 to be a "Central Processor" look
];

// Special adjustment for Level 30 to look like a CPU socket
LEVEL_NODES[29] = { id: 30, x: 750, y: 300, label: 'THE ARCHITECT', zone: 'Ethereal Plane' };


export default function MainframeMap({ currentLevel, onLevelSelect }: { currentLevel: number, onLevelSelect?: (id: number) => void }) {

    // Calculate SVG path for connections
    const getPath = (start: LevelNode, end: LevelNode) => {
        return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
    };

    return (
        <div className="relative w-full aspect-[2/1] bg-stone-950 rounded-xl border-4 border-stone-800 overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]">

            {/* Background Grid / Circuit Texture */}
            <div className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}
            />

            <svg className="w-full h-full relative z-10" viewBox="0 0 850 400">
                <defs>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Zone Labels */}
                <text x="50" y="30" className="fill-stone-600 font-mono text-xs uppercase tracking-widest">Sector 1: Outer Rim</text>
                <text x="480" y="30" className="fill-stone-600 font-mono text-xs uppercase tracking-widest">Sector 2: Inner Core</text>
                <text x="700" y="30" className="fill-stone-600 font-mono text-xs uppercase tracking-widest">Sector 3: Ethereal Plane</text>

                {/* Connections (Traces) */}
                {LEVEL_NODES.map((node, i) => {
                    if (i === 0) return null;
                    const prevNode = LEVEL_NODES[i - 1];
                    const isUnlocked = currentLevel >= node.id;

                    return (
                        <motion.path
                            key={`path-${node.id}`}
                            d={`M ${prevNode.x} ${prevNode.y} L ${node.x} ${node.y}`}
                            stroke={isUnlocked ? (node.zone === 'Ethereal Plane' ? '#a855f7' : '#06b6d4') : '#292524'}
                            strokeWidth="3"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1.5, delay: i * 0.05 }}
                        />
                    );
                })}

                {/* Nodes (Components) */}
                {LEVEL_NODES.map((node) => {
                    const isUnlocked = currentLevel >= node.id;
                    const isActive = currentLevel === node.id;
                    const isCompleted = currentLevel > node.id;

                    let nodeColor = '#44403c'; // Locked (Stone-700)
                    if (isUnlocked) {
                        if (node.zone === 'Outer Rim') nodeColor = '#eab308'; // Yellow/Gold
                        if (node.zone === 'Inner Core') nodeColor = '#06b6d4'; // Cyan
                        if (node.zone === 'Ethereal Plane') nodeColor = '#a855f7'; // Purple
                    }

                    return (
                        <g
                            key={node.id}
                            onClick={() => isUnlocked && onLevelSelect && onLevelSelect(node.id)}
                            className={isUnlocked ? "cursor-pointer hover:opacity-80" : "cursor-not-allowed opacity-50"}
                        >
                            {/* Pulse effect for active node */}
                            {isActive && (
                                <motion.circle
                                    cx={node.x} cy={node.y}
                                    r={20}
                                    fill="none"
                                    stroke={nodeColor}
                                    strokeWidth="2"
                                    initial={{ scale: 0.5, opacity: 1 }}
                                    animate={{ scale: 1.5, opacity: 0 }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                            )}

                            {/* Node Circle */}
                            <motion.circle
                                cx={node.x} cy={node.y}
                                r={isActive ? 8 : 5}
                                fill={isUnlocked ? "#1c1917" : "#0c0a09"} // Dark background
                                stroke={nodeColor}
                                strokeWidth={isActive ? 3 : 2}
                                filter={isActive ? "url(#glow)" : ""}
                                whileHover={isUnlocked ? { scale: 1.5 } : {}}
                            />

                            {/* Label */}
                            {(isActive || isUnlocked) && (
                                <text
                                    x={node.x}
                                    y={node.y + 20}
                                    className="font-medieval text-[9px] uppercase"
                                    textAnchor="middle"
                                    fill={isActive ? '#f5f5f4' : '#78716c'}
                                >
                                    {node.label}
                                </text>
                            )}
                        </g>
                    );
                })}
            </svg>

            {/* Status Overlay */}
            <div className="absolute bottom-4 right-4 bg-black/80 border border-stone-800 p-2 rounded text-xs font-mono text-stone-400">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div> Batch Logic
                </div>
                <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 rounded-full bg-cyan-500"></div> CICS Network
                </div>
                <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div> Cloud Arch.
                </div>
            </div>
        </div>
    );
}
