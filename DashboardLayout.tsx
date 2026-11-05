import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar, { type SidebarLink } from './Sidebar';

interface DashboardLayoutProps {
  sidebarLinks: SidebarLink[];
  sidebarTitle: string;
  accentColor?: string;
}

export default function DashboardLayout({ sidebarLinks, sidebarTitle, accentColor }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <div className="hidden lg:block">
          <Sidebar links={sidebarLinks} title={sidebarTitle} accentColor={accentColor} />
        </div>
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
