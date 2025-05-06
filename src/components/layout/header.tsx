import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UserCircle } from 'lucide-react';
import portfolioData from '@/config/portfolio-data.json';
import { SidebarTrigger } from '@/components/ui/sidebar';


export const Header = () => {
  const { name } = portfolioData.personalInfo;

  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="text-primary-foreground hover:bg-primary/80 data-[state=open]:bg-primary/80 [&_svg]:text-primary-foreground" />
          <Link href="/" passHref>
            <div className="flex flex-col items-start cursor-pointer hover:opacity-80 transition-opacity">
              <span className="text-2xl font-bold">{name}</span>
            </div>
          </Link>
        </div>
        <div className="flex items-center">
          <Button variant="ghost" asChild className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">
            <Link href="/skills"> <UserCircle className="mr-1 h-4 w-4" /> Skills</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
};
