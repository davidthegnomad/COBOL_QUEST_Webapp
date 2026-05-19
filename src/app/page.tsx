"use client";

import React, { useState } from 'react';
import Grimoire from '@/components/Grimoire';
import Hero from '@/components/Hero';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
    const [entered, setEntered] = useState(false);

    return (
        <main className="min-h-screen bg-black">
            <AnimatePresence mode="wait">
                {!entered ? (
                    <motion.div
                        key="hero"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 1 }}
                    >
                        <Hero onEnter={() => setEntered(true)} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="grimoire"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5 }}
                    >
                        <Grimoire />
                    </motion.div>
                )}
            </AnimatePresence>

            <footer className="fixed bottom-4 w-full text-center text-[10px] uppercase tracking-widest text-purple-500 font-bold z-20">
                <span className="pointer-events-none">David the Gnomad Inc</span>
                <span className="mx-2 pointer-events-none opacity-40">·</span>
                <a
                    href="https://davidcole.cloud/projects/cobol-quest"
                    className="pointer-events-auto text-purple-400 hover:text-purple-300 underline"
                >
                    Portfolio
                </a>
                <span className="mx-2 pointer-events-none opacity-40">·</span>
                <a
                    href="https://github.com/davidthegnomad/COBOL_QUEST_Webapp"
                    className="pointer-events-auto text-purple-400 hover:text-purple-300 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    GitHub
                </a>
            </footer>
        </main>
    );
}
