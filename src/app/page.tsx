import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import portfolioData from '@/config/portfolio-data.json'; // Import config data

export default function Home() {
  const { name, bio, profilePicture, profilePictureHint } = portfolioData.personalInfo;

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] animate-fade-in py-12">

      {/* Profile Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-12 w-full max-w-4xl">
        {/* Left Side: Description */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Hi, I&apos;m {name}
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            {bio}
          </p>
           {/* You can add a CTA button here if desired */}
           {/*
           <Button size="lg">
            Contact Me <Mail className="ml-2 h-4 w-4" />
           </Button>
           */}
        </div>

        {/* Right Side: Profile Picture */}
        <div className="flex-shrink-0 w-48 h-48 md:w-64 md:h-64 relative rounded-full overflow-hidden shadow-lg border-4 border-primary">
          <Image
            src={profilePicture}
            alt="Profile Picture"
            layout="fill"
            objectFit="cover"
            data-ai-hint={profilePictureHint}
            className="bg-muted" // Background color while loading
          />
          {/* Optional: Add an overlay or border */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/projects" passHref>
              <Button variant="default" className="w-full subtle-hover bg-primary hover:bg-primary/90">
                View Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/experience" passHref>
              <Button variant="outline" className="w-full subtle-hover">
                My Experience <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/academics" passHref>
              <Button variant="outline" className="w-full subtle-hover">
                Academic Details <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/skills" passHref>
              <Button variant="outline" className="w-full subtle-hover">
                Skills Showcase <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
