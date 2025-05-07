
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Github, Linkedin, Mail, Phone } from 'lucide-react'; 
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { PersonalInfo, PortfolioData } from '@/types/portfolio-data';

export const Header = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [loading, setLoading] = useState(true);
  // Not explicitly handling error display in header for brevity, but can be added

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/portfolio-data');
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        const data: PortfolioData = await response.json();
        setPersonalInfo(data.personalInfo || null);
      } catch (err) {
        console.error("Error fetching personal info for header:", err);
        setPersonalInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  if (loading) {
    return (
      <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold">Loading...</span>
          </div>
          <div className="flex items-center space-x-3">
            {/* Placeholder for icons while loading */}
          </div>
        </nav>
      </header>
    );
  }
  
  if (!personalInfo) {
     return (
      <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link href="/" passHref>
              <div className="flex flex-col items-start cursor-pointer hover:opacity-80 transition-opacity">
                <span className="text-2xl font-bold">Portfolio</span>
              </div>
            </Link>
          </div>
        </nav>
      </header>
    );
  }

  const { name, mobile, email, profilePicture, profilePictureHint, socialLinks } = personalInfo;
  const { github, linkedin } = socialLinks || {};


  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link href="/" passHref>
            <div className="flex flex-col items-start cursor-pointer hover:opacity-80 transition-opacity">
              <span className="text-2xl font-bold">{name}</span>
              {mobile && (
                <div className="flex items-center text-xs text-primary-foreground/80 mt-0.5">
                  <Phone className="mr-1 h-3 w-3" />
                  <span>{mobile}</span>
                </div>
              )}
            </div>
          </Link>
        </div>
        <div className="flex items-center space-x-3">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-accent transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-accent transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              aria-label="Email"
              className="hover:text-accent transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
          )}
          {profilePicture && (
            <Avatar className="h-16 w-16 ml-2 border-2 border-primary-foreground/50">
              <AvatarImage src={profilePicture} alt={name} data-ai-hint={profilePictureHint} />
              <AvatarFallback>{name ? name.substring(0, 1) : 'P'}</AvatarFallback>
            </Avatar>
          )}
        </div>
      </nav>
    </header>
  );
};
