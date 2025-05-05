import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { ThreeScene } from '@/components/three-scene';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] page-load-fade-in">
      <div className="relative w-full h-64 mb-8 rounded-lg overflow-hidden shadow-lg">
         <ThreeScene />
      </div>

      <Card className="w-full max-w-2xl text-center shadow-xl mb-12">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-primary">Welcome to VisioFolio</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-muted-foreground mb-6">
            Explore my professional journey, projects, skills, and academic background showcased with modern design and engaging 3D elements.
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
