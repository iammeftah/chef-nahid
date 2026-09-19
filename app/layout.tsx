import { IBM_Plex_Sans, Pacifico } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

// A rounded script face for the brand name and menu-item names — paired
// with the clean sans body font, this is what gives the page a warm,
// boutique-restaurant feel instead of a stiff, corporate serif look.
const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("antialiased", ibmPlexSans.variable, pacifico.variable, "font-sans")}
    >
      <body>{children}</body>
    </html>
  );
}