import { DashboardNav } from '@/components/dashboard-nav';
import { Rocket, UserCircle } from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarTrigger,
  SidebarHeader,
  SidebarContent,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            <Rocket className="w-8 h-8 text-primary"/>
            <h1 className="text-2xl font-bold font-headline group-data-[collapsible=icon]:hidden">SwiftStudy</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
            <DashboardNav />
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b bg-card md:justify-end">
            <SidebarTrigger className="md:hidden"/>
            <Button variant="ghost" size="icon">
                <UserCircle className="w-6 h-6" />
                <span className="sr-only">User Profile</span>
            </Button>
        </header>
        <main className="p-4 md:p-6 bg-background">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
