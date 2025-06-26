'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Atom,
  FlaskConical,
  Dna,
  Sigma,
  Code,
} from 'lucide-react';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

const navItems = [
  { href: '/dashboard', label: 'Home', icon: Home, exact: true },
  { href: '/dashboard/physics', label: 'Physics', icon: Atom },
  { href: '/dashboard/chemistry', label: 'Chemistry', icon: FlaskConical },
  { href: '/dashboard/biology', label: 'Biology', icon: Dna },
  { href: '/dashboard/mathematics', label: 'Mathematics', icon: Sigma },
  { href: '/dashboard/computers', label: 'Computer Science', icon: Code },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => {
        const isActive = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href);
        return (
        <SidebarMenuItem key={item.href} className="mx-2">
          <Link href={item.href} legacyBehavior passHref>
            <SidebarMenuButton
              isActive={isActive}
              tooltip={item.label}
              className="font-medium"
            >
              <item.icon />
              <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
        )
      })}
    </SidebarMenu>
  );
}
