import type { Metadata } from "next";
import { Inter, Pinyon_Script } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const monolina = Pinyon_Script({
    weight: "400",
    subsets: ["latin"],
    variable: '--font-monolina',
    display: 'swap',
});

export const metadata: Metadata = {
    title: "Kingscribe — Graphic Design",
    description: "A minimalist portfolio showcasing creative graphic design work",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${monolina.variable} font-sans`}>
                <Navigation />
                <main className="min-h-screen">
                    {children}
                </main>
            </body>
        </html>
    );
}
