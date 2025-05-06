
'use client';

import Link from 'next/link';
import { Home, Briefcase, GraduationCap, Code, UserCircle, PanelLeft } from 'lucide-react'; // Added PanelLeft
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  // SidebarTrigger, // Removed SidebarTrigger as we are replacing its functionality here
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
  { href: '/skills', label: 'Skills', icon: UserCircle },
];

export const SidebarNav: FC = () => {
  const pathname = usePathname();
  const { isMobile, setOpenMobile, open, setOpen, toggleSidebar } = useSidebar();

  const handleNavItemClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    } else {
      if (open) {
        setOpen(false);
      }
    }
  };

  return (
    <>
      {/* Modified SidebarHeader to contain a SidebarMenuButton for toggling */}
      <SidebarHeader className="border-b border-sidebar-border h-[60px] flex items-center p-2">
        <SidebarMenuButton
            onClick={toggleSidebar}
            className="justify-start w-full" // Ensure it spans full width and aligns left
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
      {/* Example of SidebarFooter if needed in the future
      <SidebarSeparator />
      <SidebarFooter className="p-2">
        <p className="text-xs text-sidebar-foreground/70">&copy; {new Date().getFullYear()}</p>
      </SidebarFooter>
      */}
    </>
  );
};

