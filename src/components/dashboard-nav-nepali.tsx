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
  { href: '/dashboard-nepali', label: 'गृह', icon: Home },
  { href: '#', label: 'भौतिक विज्ञान', icon: Atom },
  { href: '#', label: 'रसायन विज्ञान', icon: FlaskConical },
  { href: '#', label: 'जीव विज्ञान', icon: Dna },
  { href: '#', label: 'गणित', icon: Sigma },
  { href: '#', label: 'कम्प्युटर विज्ञान', icon: Code },
];

export function DashboardNavNepali() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href} className="mx-2">
          <Link href={item.href} legacyBehavior passHref>
            <SidebarMenuButton
              isActive={pathname === item.href}
              tooltip={item.label}
              className="font-medium"
            >
              <item.icon />
              <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
