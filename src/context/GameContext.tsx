"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface GameStats {
    logic: number;
    memory: number;
    legacy: number;
    level: number;
    classType: string;
}

interface GameContextType {
    stats: GameStats;
    updateStats: (updates: Partial<GameStats>) => void;
    isLoading: boolean;
}

const defaultStats: GameStats = {
    logic: 10,
    memory: 10,
    legacy: 0,
    level: 1,
    classType: "Novice"
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
    const [stats, setStats] = useState<GameStats>(defaultStats);
    const [isLoading, setIsLoading] = useState(false);

    // List of keys allowed to be sent to the API to avoid sending unrelated state
    const ALLOWED_STATS = ['logic', 'memory', 'legacy', 'level'];

    useEffect(() => {
        const fetchUser = async () => {
            setIsLoading(true);
            try {
                const res = await fetch('/api/user');
                if (res.ok) {
                    const data = await res.json();
                    setStats({
                        logic: data.logic,
                        memory: data.memory,
                        legacy: data.xp, // Map DB 'xp' to App 'legacy'
                        level: data.level,
                        classType: data.classType
                    });
                }
            } catch (error) {
                console.error("Failed to fetch user stats", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);

    const updateStats = async (updates: Partial<GameStats>) => {
        // Optimistic UI update
        setStats(prev => ({ ...prev, ...updates }));

        try {
            // Map App 'legacy' back to DB 'xp' if present
            const payload: any = { ...updates };
            if (payload.legacy !== undefined) {
                payload.xp = payload.legacy;
                delete payload.legacy;
            }

            await fetch('/api/user', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
        } catch (error) {
            console.error("Failed to save stats", error);
            // In a real app, we might revert the optimistic update here
        }
    };

    return (
        <GameContext.Provider value={{ stats, updateStats, isLoading }}>
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
}
