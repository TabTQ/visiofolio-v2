import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import portfolioData from '@/config/portfolio-data.json'; // Import config data

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { github, linkedin } = portfolioData.personalInfo.socialLinks;
  const { email, name, mobile } = portfolioData.personalInfo; // Added mobile

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
        {/* Removed copyright line */}
         <p className="text-xs text-white opacity-90 mt-1">Designed & Built by {name}</p> {/* Updated class */}
         {/* Added mobile number below */}
          {mobile && (
            <p className="text-xs text-white flex items-center justify-center mt-1 opacity-90"> {/* Use text-white or primary-foreground */}
                <Phone className="mr-1 h-3 w-3" /> {mobile}
            </p>
          )}
      </div>
    </footer>
  );
};
