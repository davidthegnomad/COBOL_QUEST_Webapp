"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Scroll, Terminal, ShieldCheck, ArrowRight } from 'lucide-react';
import { assetPath } from '@/lib/assetPath';

interface HeroProps {
    onEnter: () => void;
}

export default function Hero({ onEnter }: HeroProps) {
    return (
        <div className="relative min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-black overflow-hidden font-sans">

            {/* Left Side: The Silicon Sanctum (Glass Box) */}
            <div className="relative z-10 flex items-center justify-center p-6 lg:p-12 relative">
                {/* Background decorative elements for the left side */}
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-cyan-900/20 via-black to-black -z-10" />
                <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-gold-900/10 via-transparent to-transparent -z-10" />

                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="w-full max-w-2xl p-8 md:p-12 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden group"
                >
                    {/* Glass sheen effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/40 pointer-events-none" />

                    {/* Content Container */}
                    <div className="relative z-20">
                        <div className="mb-2 flex items-center gap-2">
                            <div className="w-12 h-[2px] bg-gold-500" />
                            <span className="text-gold-500 font-mono text-xs tracking-[0.3em] uppercase">System_Entry_Point</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-fantasy text-transparent bg-clip-text bg-gradient-to-b from-white to-stone-400 mb-2 tracking-tighter drop-shadow-lg">
                            COBOL QUEST
                        </h1>
                        <p className="text-xl md:text-2xl font-mono text-cyan-400 mb-8 tracking-[0.15em] uppercase border-l-4 border-cyan-500 pl-4">
                            The Silicon Sanctum
                        </p>

                        <p className="text-stone-300 font-serif text-lg leading-relaxed mb-10 border-t border-white/10 pt-6">
                            Enter the ancient mainframe where the spirits of the old code dwell. Master the rituals of <span className="text-gold-400">IDENTIFICATION</span>, <span className="text-gold-400">ENVIRONMENT</span>, <span className="text-gold-400">DATA</span>, and <span className="text-gold-400">PROCEDURE</span> to ascend as a Technomancer.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
                            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-black/40 border border-white/5 hover:border-gold-500/30 transition-colors group/item">
                                <Scroll size={24} className="text-gold-500 mb-2 group-hover/item:scale-110 transition-transform" />
                                <span className="text-stone-400 font-mono text-[10px] tracking-widest text-center">ANCIENT SYNTAX</span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-black/40 border border-white/5 hover:border-cyan-500/30 transition-colors group/item">
                                <Terminal size={24} className="text-cyan-500 mb-2 group-hover/item:scale-110 transition-transform" />
                                <span className="text-stone-400 font-mono text-[10px] tracking-widest text-center">MAINFRAME MAGIC</span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-black/40 border border-white/5 hover:border-purple-500/30 transition-colors group/item">
                                <ShieldCheck size={24} className="text-purple-500 mb-2 group-hover/item:scale-110 transition-transform" />
                                <span className="text-stone-400 font-mono text-[10px] tracking-widest text-center">LEGACY SECURED</span>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onEnter}
                            className="w-full py-5 bg-gradient-to-r from-gold-600 to-gold-500 text-black font-fantasy text-2xl rounded-xl transition-all duration-300 relative group overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.6)]"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                ENTER THE SANCTUM <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-white/30 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                        </motion.button>

                        <div className="mt-6 text-center">
                            <span className="text-stone-600 font-mono text-[10px] uppercase tracking-widest">* Adjust your ink, Adept. The Mainframe is patient. *</span>
                        </div>
                    </div>
                </motion.div>

                {/* Corner Decorative Elements for Glass Box */}
                <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-cyan-500/20 rounded-tl-3xl pointer-events-none" />
                <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-gold-500/20 rounded-br-3xl pointer-events-none" />
            </div>

            {/* Right Side: Hero Image */}
            <div className="relative h-full min-h-[50vh] lg:min-h-screen overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] hover:scale-105"
                    style={{ backgroundImage: `url('${assetPath('/hero.png')}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black lg:to-black/80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent lg:hidden" />

                {/* Floating Particles/Runes Overlay on Image */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-cyan-500/20 blur-[100px] animate-pulse" />
                    <div className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-purple-500/20 blur-[100px] animate-pulse delay-1000" />
                </div>
            </div>
        </div>
    );
}
