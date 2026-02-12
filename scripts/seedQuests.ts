
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const prisma = new PrismaClient();

async function main() {
    const quests = [
        // The Outer Rim (Levels 1-5)
        { slug: 'level-1-identification', title: 'The Identification Ritual', xpReward: 100, division: 'IDENTIFICATION', difficulty: 1, description: 'Learn the basics of Program ID.' },
        { slug: 'level-2-environment', title: 'The Environment', xpReward: 150, division: 'ENVIRONMENT', difficulty: 1, description: 'Configure the environment.' },
        { slug: 'level-3-data-weaving', title: 'Data Weaving', xpReward: 200, division: 'DATA', difficulty: 2, description: 'Define variables.' },
        { slug: 'level-5-alchemists-equation', title: 'The Alchemist\'s Equation', xpReward: 250, division: 'PROCEDURE', difficulty: 2, description: 'Basic arithmetic.' },

        // The Data Weaver (Levels 6-10)
        { slug: 'level-6-forked-path', title: 'The Forked Path', xpReward: 400, division: 'PROCEDURE', difficulty: 3, description: 'Conditional logic.' },
        { slug: 'level-10-reading-rite', title: 'The Reading Rite', xpReward: 500, division: 'PROCEDURE', difficulty: 4, description: 'File reading.' },

        // Mid-Tier
        { slug: 'level-14-sorting-ceremony', title: 'The Sorting Ceremony', xpReward: 1000, division: 'PROCEDURE', difficulty: 5, description: 'Sorting data.' },
        { slug: 'level-16-grand-synthesis', title: 'The Grand Synthesis', xpReward: 2500, division: 'ALL', difficulty: 6, description: 'Complete program.' },

        // The High-Tier Architect
        { slug: 'level-25-jcl-chariot', title: 'The JCL Chariot', xpReward: 5000, division: 'JCL', difficulty: 8, description: 'Job Control Language.' },

        // The Ouroboros
        { slug: 'level-30-eternal-architect', title: 'The Eternal Architect', xpReward: 10000, division: 'ARCHITECT', difficulty: 10, description: 'Final Boss.' },
    ];

    console.log('Start seeding Quests...');

    for (const quest of quests) {
        const result = await prisma.quest.upsert({
            where: { slug: quest.slug },
            update: { xpReward: quest.xpReward },
            create: {
                slug: quest.slug,
                title: quest.title,
                description: quest.description,
                division: quest.division,
                difficulty: quest.difficulty,
                xpReward: quest.xpReward,
                statReward: 'LOGIC', // Default
                statAmount: 10 // Default
            },
        });
        console.log(`Upserted quest: ${result.slug} with XP: ${result.xpReward}`);
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
