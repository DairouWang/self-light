import type { Metadata } from "next";
import { GardenStateProvider } from "@/components/garden/GardenStateProvider";
import { Cormorant_Garamond, Geist_Mono, Nunito } from "next/font/google";
import "./globals.css";

const gardenBody = Nunito({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const gardenDisplay = Cormorant_Garamond({
  variable: "--font-garden-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Self-Light — Your Thought Garden",
  description:
    "A visual reflection tool where your thoughts become path tiles in a growing garden.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${gardenBody.variable} ${gardenDisplay.variable} ${geistMono.variable} antialiased`}
      >
        <GardenStateProvider>{children}</GardenStateProvider>
      </body>
    </html>
  );
}
