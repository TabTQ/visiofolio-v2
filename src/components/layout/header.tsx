import Link from 'next/link';
import portfolioData from '@/config/portfolio-data.json';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Github, Linkedin, Mail } from 'lucide-react'; // Import icons

export const Header = () => {
  const { name } = portfolioData.personalInfo;
  const { github, linkedin } = portfolioData.personalInfo.socialLinks;
  const { email } = portfolioData.personalInfo;

  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center"> {/* Changed py-3 to py-6 */}
        <div className="flex items-center gap-3">
          <SidebarTrigger className="text-primary-foreground hover:bg-primary/80 data-[state=open]:bg-primary/80 [&_svg]:text-primary-foreground" />
          <Link href="/" passHref>
            <div className="flex flex-col items-start cursor-pointer hover:opacity-80 transition-opacity">
              <span className="text-2xl font-bold">{name}</span>
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
              <Github className="h-5 w-5" /> {/* Adjusted icon size for header */}
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
              <Linkedin className="h-5 w-5" /> {/* Adjusted icon size for header */}
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              aria-label="Email"
              className="hover:text-accent transition-colors"
            >
              <Mail className="h-5 w-5" /> {/* Adjusted icon size for header */}
            </a>
          )}
        </div>
      </nav>
    </header>
  );
};
