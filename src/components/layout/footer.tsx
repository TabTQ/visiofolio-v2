
'use client';

import { useState, useEffect } from 'react';
import type { PersonalInfo, PortfolioData } from '@/types/portfolio-data';

export const Footer = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [loading, setLoading] = useState(true);
  // Not handling error display in footer for simplicity, but you could add it.

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
        console.error("Error fetching personal info for footer:", err);
        setPersonalInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);
  
  if (loading) {
    return (
      <footer className="bg-primary text-primary-foreground mt-12 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-white opacity-90 mt-1">Loading footer...</p>
        </div>
      </footer>
    );
  }

  if (!personalInfo) {
    return (
      <footer className="bg-primary text-primary-foreground mt-12 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-white opacity-90 mt-1">Designed & Built by [Name Unavailable]</p>
        </div>
      </footer>
    );
  }

  const { name } = personalInfo;

  return (
    <footer className="bg-primary text-primary-foreground mt-12 py-6">
      <div className="container mx-auto px-4 text-center">
         <p className="text-xs text-white opacity-90 mt-1">Designed & Built by {name}</p>
      </div>
    </footer>
  );
};
