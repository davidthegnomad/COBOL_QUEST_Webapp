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

            <footer className="fixed bottom-4 w-full text-center text-[10px] uppercase tracking-widest text-purple-500 pointer-events-none font-bold">
                Created by David the Gnomad Inc
            </footer>
        </main>
    );
}
