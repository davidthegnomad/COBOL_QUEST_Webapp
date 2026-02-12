'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StatProps {
    label: string;
    value: number;
    maxValue: number;
    color: string; // e.g., 'bg-blue-500' for Logic, 'bg-purple-500' for Memory
    icon?: string;
}

const AVATARS = [
    { id: 'wizard', name: 'Code Wizard', src: '/avatars/wizard.png' },
    { id: 'wizard_f', name: 'Code Enchantress', src: '/avatars/wizard_f.png' },
    { id: 'mage', name: 'Data Mage', src: '/avatars/mage.png' },
    { id: 'mage_f', name: 'Data Sorceress', src: '/avatars/mage_f.png' },
    { id: 'necromancer', name: 'Bit Necromancer', src: '/avatars/necromancer.png' },
    { id: 'necromancer_f', name: 'Bit Witch', src: '/avatars/necromancer_f.png' },
    { id: 'geomancer', name: 'Logic Geomancer', src: '/avatars/geomancer.png' },
    { id: 'geomancer_f', name: 'Logic Druid', src: '/avatars/geomancer_f.png' },
];

function AvatarSelector() {
    const [selected, setSelected] = useState(AVATARS[0]);
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="flex flex-col items-center mb-8 relative z-40">
            <div className="relative">
                {/* Main Avatar (Clickable) */}
                <motion.div
                    onClick={() => setIsExpanded(!isExpanded)}
                    whileHover={{ scale: 1.05 }}
                    className="w-24 h-24 rounded-full border-4 border-stone-800 cursor-pointer overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:border-gold-500 transition-colors bg-stone-900 relative z-20 group"
                >
                    <img src={selected.src} alt={selected.name} className="w-full h-full object-cover pixelated" style={{ imageRendering: 'pixelated' }} />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                        <span className="text-[9px] uppercase tracking-widest text-gold-500 font-mono font-bold">Swap</span>
                    </div>
                </motion.div>

                {/* Expansion Container */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 10 }}
                            exit={{ opacity: 0, scale: 0.8, y: -10 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 bg-stone-950 border border-stone-700 p-2.5 rounded-xl shadow-2xl z-50 backdrop-blur-xl grid grid-cols-4 gap-2 w-max"
                        >
                            {AVATARS.map((avatar) => (
                                <button
                                    key={avatar.id}
                                    onClick={() => {
                                        setSelected(avatar);
                                        setIsExpanded(false);
                                    }}
                                    className={`relative w-12 h-12 rounded-full border-2 overflow-hidden transition-all group ${selected.id === avatar.id ? 'border-gold-500 scale-110 ring-2 ring-gold-500/20' : 'border-stone-600 opacity-60 hover:opacity-100 hover:scale-105 hover:border-stone-400'}`}
                                >
                                    <img src={avatar.src} alt={avatar.name} className="w-full h-full object-cover pixelated" style={{ imageRendering: 'pixelated' }} />
                                    {selected.id === avatar.id && (
                                        <div className="absolute inset-0 bg-gold-500/10 pointer-events-none" />
                                    )}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="mt-3 text-center">
                <h4 className="text-gold-500 font-mono text-sm uppercase tracking-widest font-bold">{selected.name}</h4>
                <div className="h-0.5 w-12 bg-gradient-to-r from-transparent via-stone-700 to-transparent mx-auto mt-1" />
            </div>
        </div>
    );
}

export default function TechnomancerStats({ logic, memory, legacy, items = [], className = "" }: { logic: number, memory: number, legacy: number, items?: any[], className?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`p-5 bg-stone-950 border border-stone-800 rounded-xl backdrop-blur-md shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col relative z-30 ${className}`}
        >
            <div className="flex items-center justify-between mb-6 border-b border-stone-800 pb-3">
                <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-stone-600 uppercase tracking-widest leading-none mb-1">System_Status</span>
                    <h3 className="text-xl font-mono text-gold-500 uppercase tracking-[0.2em] font-bold">
                        Technomancer
                    </h3>
                </div>
                <div className="flex gap-1.5 bg-stone-900 px-2 py-1 rounded border border-stone-800">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_5px_#22c55e]" />
                    <div className="w-2 h-2 rounded-full bg-stone-700" />
                </div>
            </div>

            <AvatarSelector />

            <div className="space-y-4 flex-grow relative overflow-y-auto custom-scrollbar pr-2">
                <div>
                    <ProgressBar label="Logic_Attunement" value={logic} maxValue={500} color="bg-cyan-500" icon="⚡" />
                </div>
                <div>
                    <ProgressBar label="Memory_Archive" value={memory} maxValue={500} color="bg-indigo-500" icon="🧠" />
                </div>

                <div className="pt-6 mt-4 border-t border-stone-900">
                    <div className="flex justify-between items-center bg-stone-900/50 p-4 rounded-lg border border-stone-800/50 group hover:border-gold-500/30 transition-colors">
                        <span className="font-mono text-stone-500 uppercase text-xs tracking-widest">Legacy_XP</span>
                        <div className="flex flex-col items-end">
                            <span className="font-mono text-gold-400 font-bold text-lg tracking-tighter">{legacy}</span>
                            <div className="w-16 h-1 bg-stone-800 mt-1 overflow-hidden rounded-full">
                                <motion.div
                                    className="h-full bg-gold-600"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(legacy % 100)}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <Satchel items={items} />
            </div>

            {/* Decorative bottom detail */}
            <div className="mt-auto pt-4 flex flex-col gap-1 items-center opacity-20 pointer-events-none">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-stone-700 to-transparent" />
                <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-stone-500">Ancient.Protocol.v7</span>
            </div>
        </motion.div>
    );
}

const ProgressBar = ({ label, value, maxValue, color, icon }: StatProps) => {
    const percentage = Math.min((value / maxValue) * 100, 100);

    return (
        <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
                <span className="font-mono text-stone-400 text-xs uppercase tracking-wider flex items-center gap-1">
                    {icon && <span className="opacity-50">{icon}</span>}
                    {label}
                </span>
                <span className="text-stone-500 font-mono text-xs">{value} / {maxValue}</span>
            </div>
            <div className="h-1.5 w-full bg-stone-900 border border-stone-800 rounded-full overflow-hidden relative">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={`h-full ${color} shadow-[0_0_10px_rgba(255,255,255,0.1)]`}
                />
            </div>
        </div>
    );
};
const Satchel = ({ items }: { items: any[] }) => (
    <div className="mt-4 border-t border-stone-800 pt-3">
        <h4 className="text-stone-500 font-mono mb-2 uppercase tracking-widest text-[9px]">Inventory</h4>
        <div className="flex gap-2 flex-wrap">
            <AnimatePresence>
                {items.map((item, index) => (
                    <motion.div
                        key={item.id || index}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="w-8 h-8 bg-stone-900 border border-stone-800 rounded flex items-center justify-center cursor-help hover:border-gold-500/50 transition-all shadow-sm group relative"
                    >
                        <span className="text-lg">{item.icon || '📜'}</span>
                        <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 w-max px-2 py-1 bg-black text-white text-[8px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 border border-stone-800">
                            {item.name}
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
            {items.length === 0 && (
                <p className="text-stone-700 text-[9px] italic font-mono">Archive Empty</p>
            )}
        </div>
    </div>
);
