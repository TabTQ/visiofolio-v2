'use client';

import Link from 'next/link';
import { Home, Briefcase, GraduationCap, Code } from 'lucide-react';
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import portfolioData from '@/config/portfolio-data.json';
import { usePathname } from 'next/navigation';
import type { FC } from 'react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/projects', label: 'Projects', icon: Code },
  { href: '/experience', label: 'Experience', icon: Briefcase },
  { href: '/academics', label: 'Academics', icon: GraduationCap },
];

export const SidebarNav: FC = () => {
  const { name } = portfolioData.personalInfo;
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <Link href="/" passHref>
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            {/* You can add a small logo/icon here if desired */}
            <span className="text-xl font-bold text-sidebar-foreground">{name}</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                className="justify-start"
                tooltip={{ children: item.label, side: 'right', align: 'center' }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      {/* Example of SidebarFooter if needed in the future
      <SidebarSeparator />
      <SidebarFooter className="p-2">
        <p className="text-xs text-sidebar-foreground/70">&copy; {new Date().getFullYear()}</p>
      </SidebarFooter>
      */}
    </>
  );
};
