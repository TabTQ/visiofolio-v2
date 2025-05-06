
'use client'

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Menu } from 'lucide-react';
import portfolioData from '@/config/portfolio-data.json';
import { useSidebar } from '@/components/ui/sidebar'; // Import useSidebar

export default function Home() {
  const { setOpen, setOpenMobile, isMobile } = useSidebar(); // Get sidebar control functions

  const { name, bio } = portfolioData.personalInfo; // Removed profilePicture and profilePictureHint

  const openSidebar = () => {
    if (isMobile) {
      setOpenMobile(true);
    } else {
      setOpen(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] animate-fade-in py-12">

      {/* Profile Section */}
      <div className="flex flex-col items-center gap-8 md:gap-12 mb-12 w-full max-w-4xl">
        {/* Left Side: Description */}
        {/* Changed className from "flex-1" to "w-full max-w-2xl" to match explore card width */}
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

        {/* Right Side: Profile Picture - REMOVED FROM HERE */}
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

