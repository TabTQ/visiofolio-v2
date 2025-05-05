import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Briefcase, GraduationCap, Code, UserCircle, Menu, Phone } from 'lucide-react';
import portfolioData from '@/config/portfolio-data.json'; // Import config data

export const Header = () => {
  const { name, mobile } = portfolioData.personalInfo;

  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" passHref>
          <div className="flex flex-col items-start cursor-pointer hover:opacity-80 transition-opacity">
             <span className="text-2xl font-bold">{name}</span> {/* Use name from config */}
             <span className="text-xs text-muted-foreground/80 flex items-center mt-0.5">
                <Phone className="mr-1 h-3 w-3" /> {mobile} {/* Use mobile from config */}
            </span>
          </div>
        </Link>
        <div className="hidden md:flex space-x-2">
          <Button variant="ghost" asChild className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">
            <Link href="/"> <Home className="mr-1 h-4 w-4" /> Home</Link>
          </Button>
          <Button variant="ghost" asChild className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">
            <Link href="/projects"> <Code className="mr-1 h-4 w-4" /> Projects</Link>
          </Button>
           <Button variant="ghost" asChild className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">
            <Link href="/experience"> <Briefcase className="mr-1 h-4 w-4" /> Experience</Link>
          </Button>
           <Button variant="ghost" asChild className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">
            <Link href="/academics"> <GraduationCap className="mr-1 h-4 w-4" /> Academics</Link>
          </Button>
          <Button variant="ghost" asChild className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">
            <Link href="/skills"> <UserCircle className="mr-1 h-4 w-4" /> Skills</Link>
          </Button>
        </div>
         {/* TODO: Add mobile menu (Sheet component) here later if needed */}
        <div className="md:hidden">
           {/* Placeholder for mobile menu trigger */}
           <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80">
              <Menu className="h-6 w-6" /> {/* Use Lucide Menu icon */}
           </Button>
        </div>
      </nav>
    </header>
  );
};
