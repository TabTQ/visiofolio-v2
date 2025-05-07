
'use client'

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Menu } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar'; 
import type { PortfolioData } from '@/types/portfolio-data';

export default function Home() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setOpen, setOpenMobile, isMobile } = useSidebar(); 

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/portfolio-data');
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        const data: PortfolioData = await response.json();
        setPortfolioData(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching portfolio data:", err);
        setError(err instanceof Error ? err.message : String(err));
        setPortfolioData(null); 
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  const openSidebar = () => {
    if (isMobile) {
      setOpenMobile(true);
    } else {
      setOpen(true);
    }
  };

  if (loading) {
    return <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] py-12">Loading...</div>;
  }

  if (error) {
    return <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] py-12 text-destructive">Error: {error}</div>;
  }

  if (!portfolioData || !portfolioData.personalInfo) {
    return <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] py-12">Portfolio data not available.</div>;
  }

  const { name, bio } = portfolioData.personalInfo;

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] animate-fade-in py-12">

      {/* Profile Section */}
      <div className="flex flex-col items-center gap-8 md:gap-12 mb-12 w-full max-w-4xl">
        {/* Left Side: Description */}
        <div className="w-full max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 text-center md:text-left">
            Hi, I&apos;m {name}
          </h1>
          {/* Text box for bio */}
          <div className="bg-card p-6 rounded-lg shadow-lg text-justify">
            <p className="text-lg text-foreground">
              {bio}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Links Card */}
      <Card className="w-full max-w-2xl text-center shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">Explore My Work</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-muted-foreground mb-6">
            Dive deeper into my professional journey, projects, skills, and academic background.
          </p>
          <div className="flex justify-center">
            <Button
              variant="default"
              size="lg"
              className="subtle-hover bg-primary hover:bg-primary/90 px-3 [&_svg]:size-6"
              onClick={openSidebar}
              aria-label="Explore Sections"
            >
              <Menu />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
