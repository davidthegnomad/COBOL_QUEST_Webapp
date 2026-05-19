'use client'
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Scroll } from 'lucide-react';

interface LevelUpToastProps {
    show: boolean;
    level: number;
    className: string;
    onClose: () => void;
}

export default function LevelUpToast({ show, level, className, onClose }: LevelUpToastProps) {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ y: -100, opacity: 0, scale: 0.8 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: -50, opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-full max-w-md pointer-events-auto"
                >
                    <div
                        className="relative p-8 overflow-hidden rounded-xl border-4 border-gold-500 bg-stone-900 shadow-[0_0_50px_rgba(212,175,55,0.4)] cursor-pointer group"
                        onClick={onClose}
                    >
                        {/* Background Texture Overlay */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay parchment-texture bg-repeat" />

                        {/* Animated Border Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-500/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

                        <div className="relative z-10 flex items-center gap-6">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gold-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
                                <div className="bg-ink-900 p-4 rounded-full border-2 border-gold-400 relative">
                                    <Sparkles className="text-gold-400 w-10 h-10 animate-pulse" />
                                </div>
                                <motion.div
                                    className="absolute -top-2 -right-2 bg-cyan-500 text-black font-bold text-xs px-2 py-1 rounded-full border border-white shadow-lg"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                >
                                    NEW
                                </motion.div>
                            </div>

                            <div className="flex-grow">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="h-px bg-gold-800 flex-grow" />
                                    <span className="font-mono text-gold-500 text-[10px] uppercase tracking-widest whitespace-nowrap">Ascension Manifest</span>
                                    <div className="h-px bg-gold-800 flex-grow" />
                                </div>

                                <h4 className="font-serif text-3xl font-bold bg-gradient-to-r from-gold-300 via-white to-gold-300 bg-clip-text text-transparent italic">
                                    Level {level} Attained
                                </h4>

                                <div className="flex items-center gap-2 mt-2">
                                    <Zap size={14} className="text-cyan-400" />
                                    <p className="font-mono text-cyan-100 text-sm tracking-tighter">
                                        Rank: <span className="text-cyan-400 font-bold uppercase">{className}</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Magical Runes (Decorative) */}
                        <div className="absolute bottom-1 right-4 opacity-10 pointer-events-none">
                            <span className="text-[40px] font-serif text-gold-200">𐕣 𐕤 𐕥</span>
                        </div>

                        {/* Bottom Close Indicator */}
                        <div className="mt-4 flex justify-center opacity-30 group-hover:opacity-60 transition-opacity">
                            <span className="text-[10px] font-mono text-gold-200 uppercase tracking-[0.3em]">Click to Close Ritual</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
