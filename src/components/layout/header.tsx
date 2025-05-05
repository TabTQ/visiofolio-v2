import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Briefcase, GraduationCap, Code, UserCircle } from 'lucide-react'; // Minimalist line icons

export const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" passHref>
          <span className="text-2xl font-bold cursor-pointer hover:opacity-80 transition-opacity">[Your Name]</span>
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
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
           </Button>
        </div>
      </nav>
    </header>
  );
};
