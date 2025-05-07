'use client';

import Link from 'next/link';
import { Home, Briefcase, GraduationCap, Code, UserCircle, PanelLeft, Award } from 'lucide-react'; // Award icon is suitable for Certifications
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import type { FC } from 'react';
import { useSidebar } from '@/components/ui/sidebar';

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
  { href: '/certifications', label: 'Certifications', icon: Award },
  { href: '/skills', label: 'Skills', icon: UserCircle },
];

export const SidebarNav: FC = () => {
  const pathname = usePathname();
  const { open, setOpen, toggleSidebar } = useSidebar(); // Removed isMobile, setOpenMobile

  const handleNavItemClick = () => {
    // Always close the sidebar if it's open when a nav item is clicked.
    if (open) {
      setOpen(false);
    }
  };

  return (
    <>
      <SidebarHeader className="border-b border-sidebar-border h-[60px] flex items-center p-2">
        <SidebarMenuButton
            onClick={toggleSidebar}
            className="justify-start w-full"
            tooltip={{ children: open ? "Collapse" : "Expand", side: 'right', align: 'center' }}
        >
            <PanelLeft />
            <span>{open ? "Collapse" : "Expand"}</span>
        </SidebarMenuButton>
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
                onClick={handleNavItemClick}
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
    </>
  );
};
