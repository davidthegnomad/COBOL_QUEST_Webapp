"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { STATIC_DEMO, loadStats, saveStats, type StoredStats } from '@/lib/demoStorage';

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
    isStaticDemo: boolean;
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
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const hydrate = async () => {
            if (STATIC_DEMO) {
                setStats(loadStats());
                setIsLoading(false);
                return;
            }

            try {
                const res = await fetch('/api/user');
                if (res.ok) {
                    const data = await res.json();
                    setStats({
                        logic: data.logic,
                        memory: data.memory,
                        legacy: data.xp,
                        level: data.level,
                        classType: data.classType
                    });
                }
            } catch (error) {
                console.error("Failed to fetch user stats", error);
                setStats(loadStats());
            } finally {
                setIsLoading(false);
            }
        };

        hydrate();
    }, []);

    const updateStats = useCallback(async (updates: Partial<GameStats>) => {
        setStats(prev => {
            const next = { ...prev, ...updates };
            if (STATIC_DEMO || typeof window !== 'undefined') {
                const stored: StoredStats = {
                    logic: next.logic,
                    memory: next.memory,
                    legacy: next.legacy,
                    level: next.level,
                    classType: next.classType,
                };
                saveStats(stored);
            }
            return next;
        });

        if (STATIC_DEMO) return;

        try {
            const payload: Record<string, unknown> = { ...updates };
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
        }
    }, []);

    return (
        <GameContext.Provider value={{ stats, updateStats, isLoading, isStaticDemo: STATIC_DEMO }}>
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
