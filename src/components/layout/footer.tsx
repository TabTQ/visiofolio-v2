import { Github, Linkedin, Mail } from 'lucide-react';
import portfolioData from '@/config/portfolio-data.json'; // Import config data

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { github, linkedin } = portfolioData.personalInfo.socialLinks;
  const { email, name, footerCopyrightName } = portfolioData.personalInfo;

  return (
    <footer className="bg-primary text-primary-foreground mt-12 py-6">
      <div className="container mx-auto px-4 text-center">
         <div className="flex justify-center space-x-4 mb-4">
           {github && (
              <a href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-accent transition-colors">
                <Github className="h-6 w-6" />
              </a>
           )}
           {linkedin && (
              <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-accent transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
           )}
           {email && (
              <a href={`mailto:${email}`} aria-label="Email" className="hover:text-accent transition-colors">
                <Mail className="h-6 w-6" />
              </a>
           )}
         </div>
        <p className="text-sm text-muted-foreground">&copy; {currentYear} {footerCopyrightName}. All rights reserved.</p>
         <p className="text-xs text-muted-foreground/70 mt-1">Designed & Built by {name}</p>
      </div>
    </footer>
  );
};
