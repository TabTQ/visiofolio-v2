
'use client';

import Link from 'next/link';
import { Home, Briefcase, GraduationCap, Code, UserCircle } from 'lucide-react'; // Added UserCircle
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import type { FC } from 'react';
import { useSidebar } from '@/components/ui/sidebar'; // Import useSidebar

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
  { href: '/skills', label: 'Skills', icon: UserCircle }, // Added Skills link
];

export const SidebarNav: FC = () => {
  const pathname = usePathname();
  const { isMobile, setOpenMobile, open, setOpen } = useSidebar(); // Get sidebar context

  const handleNavItemClick = () => {
    if (isMobile) {
      setOpenMobile(false); // Close mobile sheet
    } else {
      // For desktop, if sidebar is collapsible (icon mode) and currently expanded, collapse it
      // This assumes the main sidebar in layout.tsx uses collapsible="icon"
      if (open) { // 'open' here refers to the expanded state of the desktop sidebar
        setOpen(false);
      }
    }
  };

  return (
    <>
      <SidebarHeader className="p-4 border-b border-sidebar-border h-[60px]">
        {/* Name removed from here */}
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
                onClick={handleNavItemClick} // Add onClick handler here
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

