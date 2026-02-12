"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareText, ShieldAlert } from 'lucide-react';

interface ElderMentorProps {
    message: string | null;
}

export default function ElderMentor({ message }: ElderMentorProps) {
    return (
        <AnimatePresence>
            {message && (
                <motion.div
                    initial={{ opacity: 0, x: -50, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.9 }}
                    className="mt-6 relative"
                >
                    {/* The Speech Bubble */}
                    <div className="bg-stone-900 border-2 border-gold-600/50 p-4 rounded-2xl shadow-[5px_5px_0px_rgba(212,175,55,0.2)] relative">
                        <div className="absolute -top-3 left-6 bg-stone-950 px-2 flex items-center gap-1">
                            <MessageSquareText size={14} className="text-gold-DEFAULT" />
                            <span className="text-[10px] font-mono text-gold-DEFAULT uppercase tracking-widest">Elder Technomancer</span>
                        </div>

                        <p className="text-stone-300 font-serif italic leading-relaxed">
                            "{message}"
                        </p>

                        {/* Little arrow for bubble */}
                        <div className="absolute -bottom-2 left-10 w-4 h-4 bg-stone-900 border-b-2 border-r-2 border-gold-600/50 rotate-45" />
                    </div>

                    {/* Hint about periods or specific COBOL quirks if error */}
                    {message.toLowerCase().includes("period") && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-3 flex items-center gap-2 text-[10px] font-mono text-red-400 bg-red-950/20 p-2 rounded border border-red-900/30"
                        >
                            <ShieldAlert size={12} />
                            SYNTAX LAW: EVERY STATEMENT REQUIRES TERMINATION (PERIOD).
                        </motion.div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
