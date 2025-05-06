import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import portfolioData from '@/config/portfolio-data.json'; // Import config data
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/layout/sidebar-nav';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

// Generate metadata dynamically using the name from the config
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${portfolioData.personalInfo.name}'s VisioFolio`, // Use name from config
    description: 'A modern portfolio website showcasing skills and projects', // Keep description generic or enhance later
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
