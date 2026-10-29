import type { Metadata } from "next";
import { Bodoni_Moda, Montserrat } from "next/font/google";
import ThemeRegistry from "@/theme/ThemeRegistry";
// import IntroSplash from "@/components/animations/IntroSplash";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";
import StickyCTA from "@/components/layout/StickyCTA";

const bodoni = Bodoni_Moda({ subsets: ["latin"], variable: "--font-bodoni" });
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Broffles",
  description: "Where every dish is a performance.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bodoni.variable} ${montserrat.variable}`}>
      <body>
        <ThemeRegistry>
          {/* <IntroSplash /> */}
          <Navbar />
          <main>{children}</main>
          <Footer />
          <StickyCTA />
        </ThemeRegistry>
      </body>
    </html>
  );
}
