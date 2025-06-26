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
  { href: '/dashboard-nepali', label: 'गृह', icon: Home, exact: true },
  { href: '/dashboard-nepali/physics', label: 'भौतिक विज्ञान', icon: Atom },
  { href: '/dashboard-nepali/chemistry', label: 'रसायन विज्ञान', icon: FlaskConical },
  { href: '/dashboard-nepali/biology', label: 'जीव विज्ञान', icon: Dna },
  { href: '/dashboard-nepali/mathematics', label: 'गणित', icon: Sigma },
  { href: '/dashboard-nepali/computers', label: 'कम्प्युटर विज्ञान', icon: Code },
];

export function DashboardNavNepali() {
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
