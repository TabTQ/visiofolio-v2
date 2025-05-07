
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import path from 'path';
import fs from 'fs/promises';
import type { PortfolioData } from '@/types/portfolio-data';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const portfolioDataPath = path.join(process.cwd(), 'src', 'config', 'portfolio-data.json');

async function getPortfolioDataForMetadata(): Promise<PortfolioData> {
  try {
    const jsonData = await fs.readFile(portfolioDataPath, 'utf-8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error("Failed to read portfolio data for metadata:", error);
    // Fallback to prevent build/runtime errors if file is missing or corrupt
    return {
      personalInfo: { name: "Portfolio", bio: "", socialLinks: {} },
      projects: [],
      experiences: [],
      academics: [],
      skills: [],
    };
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const portfolioData = await getPortfolioDataForMetadata();
  return {
    title: `${portfolioData.personalInfo.name}'s VisioFolio`,
    description: 'A modern portfolio website showcasing skills and projects',
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} font-sans antialiased flex flex-col min-h-screen bg-secondary`}
      >
        <SidebarProvider defaultOpen={true}>
          <Sidebar collapsible="icon" side="left" className="border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
            <SidebarNav />
          </Sidebar>
          <SidebarInset>
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <Footer />
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
