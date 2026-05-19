import type { Metadata } from "next";
import { Cinzel, Courier_Prime, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import { GameProvider } from "@/context/GameContext";
import { assetPath } from "@/lib/assetPath";

const cinzel = Cinzel({
    subsets: ["latin"],
    variable: "--font-cinzel",
    display: "swap",
});

const courier = Courier_Prime({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-courier",
    display: "swap",
});

const loreFont = Libre_Baskerville({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-lore",
    display: "swap",
});

export const metadata: Metadata = {
    title: "COBOL Quest | Master the Ancient Code",
    description: "Embark on a gamified journey through the Silicon Sanctum. Learn COBOL, CICS, and DB2 in an immersive RPG-style experience.",
    keywords: ["COBOL", "Mainframe", "RPG", "Learning", "Coding Quest", "Programming Games"],
    authors: [{ name: "The Technomancer" }],
    openGraph: {
        title: "COBOL Quest: The Silicon Sanctum",
        description: "Master the sacred syntax of the ancients in this RPG coding adventure.",
        images: ["/hero.png"],
    },
    metadataBase: new URL(
        process.env.NEXT_PUBLIC_SITE_URL ?? "https://davidcole.cloud/DEMO/cobol-quest"
    ),
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const parchment = assetPath("/parchment-texture.png");

    return (
        <html lang="en" style={{ ["--parchment-texture" as string]: `url('${parchment}')` }}>
            <body className={`${cinzel.variable} ${courier.variable} ${loreFont.variable} font-fantasy antialiased`}>
                <GameProvider>
                    {children}
                </GameProvider>
            </body>
        </html>
    );
}
