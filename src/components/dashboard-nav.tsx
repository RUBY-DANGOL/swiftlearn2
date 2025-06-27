'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
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

function NavMenuItem({ item }: { item: typeof navItems[0] }) {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(item.exact ? pathname === item.href : pathname.startsWith(item.href));
  }, [pathname, item.href, item.exact]);

  return (
    <SidebarMenuItem className="mx-2">
      <SidebarMenuButton
        asChild
        isActive={isActive}
        tooltip={item.label}
        className="font-medium"
      >
        <Link href={item.href}>
          <item.icon />
          <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function DashboardNav() {
  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <NavMenuItem key={item.href} item={item} />
      ))}
    </SidebarMenu>
  );
}
