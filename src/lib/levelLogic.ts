
export const getTechnomancerClass = (level: number): string => {
    if (level >= 30) return "Eternal Architect";
    if (level >= 25) return "System Overlord";
    if (level >= 17) return "CICS Commmander";
    if (level >= 10) return "Procedural Sorcerer";
    if (level >= 5) return "Data Weaver";
    return "Novice Technomancer";
};

/**
 * Formula: Level * Level * 100
 * Level 1 -> 2 needs 100 XP
 * Level 2 -> 3 needs 400 XP
 * Level 10 -> 11 needs 10,000 XP
 */
export const getXPToNextLevel = (currentLevel: number) => {
    return Math.pow(currentLevel, 2) * 100;
};
