import { Github, Linkedin, Mail } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-primary text-primary-foreground mt-12 py-6">
      <div className="container mx-auto px-4 text-center">
         <div className="flex justify-center space-x-4 mb-4">
           <a href="#" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-accent transition-colors">
             <Github className="h-6 w-6" />
           </a>
           <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-accent transition-colors">
             <Linkedin className="h-6 w-6" />
           </a>
           <a href="mailto:your.email@example.com" aria-label="Email" className="hover:text-accent transition-colors">
             <Mail className="h-6 w-6" />
           </a>
         </div>
        <p className="text-sm text-muted-foreground">&copy; {currentYear} VisioFolio. All rights reserved.</p>
         <p className="text-xs text-muted-foreground/70 mt-1">Designed & Built by [Your Name]</p>
      </div>
    </footer>
  );
};
