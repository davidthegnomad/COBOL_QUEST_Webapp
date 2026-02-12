'use client';
import { motion, AnimatePresence } from 'framer-motion';
// import { useRouter } from 'next/navigation'; // Removed for now as we don't have the route yet

interface ArchitectAscensionModalProps {
    isOpen: boolean;
    onClose: () => void;
    heroName: string;
}

export default function ArchitectAscensionModal({ isOpen, onClose, heroName }: ArchitectAscensionModalProps) {
    // const router = useRouter();

    const handleClaimReward = () => {
        // Navigate to a "Hall of Fame" or "New Game+"
        // router.push('/hall-of-fame'); 
        alert("Reward Claimed! (Feature coming soon)");
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.8, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.8, y: 50 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="relative bg-gradient-to-br from-stone-900 to-black p-8 md:p-12 rounded-3xl border-4 border-gold-600 shadow-2xl text-center max-w-2xl w-full overflow-hidden"
                    >
                        {/* Confetti/Sparkle Effect */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold-400 rounded-full mix-blend-screen animate-pulse opacity-20 blur-3xl" />
                            <div className="absolute top-1/4 left-3/4 w-32 h-32 bg-cyan-400 rounded-full mix-blend-screen animate-pulse delay-200 opacity-20 blur-2xl" />
                        </div>

                        <h2 className="font-medieval text-5xl text-gold-400 mb-6 drop-shadow-lg leading-tight">
                            The Grand Ascendance!
                        </h2>
                        <p className="font-mono text-xl text-stone-200 mb-4">
                            <span className="text-gold-200">{heroName}</span>, you have woven the threads of the Mainframe into a tapestry of unparalleled power.
                        </p>
                        <p className="font-medieval text-3xl text-cyan-400 mb-8 tracking-widest">
                            You are now an <br /><span className="text-4xl text-cyan-300 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">ETERNAL ARCHITECT</span>!
                        </p>

                        <button
                            onClick={handleClaimReward}
                            className="bg-gold-700 hover:bg-gold-600 text-white font-medieval py-3 px-8 rounded-full text-xl shadow-lg transition-all duration-300 transform hover:scale-105 border-2 border-gold-400 hover:shadow-[0_0_20px_rgba(234,179,8,0.6)]"
                        >
                            Claim Your Rewards!
                        </button>
                        <p className="text-stone-400 text-sm mt-4">Your legacy is etched into the very core of the Mainframe.</p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
