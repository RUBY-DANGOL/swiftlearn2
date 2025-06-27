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
  { href: '/dashboard-nepali', label: 'गृह', icon: Home, exact: true },
  { href: '/dashboard-nepali/physics', label: 'भौतिक विज्ञान', icon: Atom },
  { href: '/dashboard-nepali/chemistry', label: 'रसायन विज्ञान', icon: FlaskConical },
  { href: '/dashboard-nepali/biology', label: 'जीव विज्ञान', icon: Dna },
  { href: '/dashboard-nepali/mathematics', label: 'गणित', icon: Sigma },
  { href: '/dashboard-nepali/computers', label: 'कम्प्युटर विज्ञान', icon: Code },
];

function NavMenuItemNepali({ item }: { item: typeof navItems[0] }) {
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

export function DashboardNavNepali() {
  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <NavMenuItemNepali key={item.href} item={item} />
      ))}
    </SidebarMenu>
  );
}
