import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react';

export interface SidebarLink {
  path: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
}

interface SidebarProps {
  links: SidebarLink[];
  title: string;
  accentColor?: string;
}

export default function Sidebar({ links, title, accentColor = 'primary' }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const gradientClass = accentColor === 'accent' ? 'gradient-accent' : 'gradient-primary';

  return (
    <aside
      className={`sticky top-16 h-[calc(100vh-4rem)] bg-surface border-r border-border-light flex flex-col transition-all duration-300 ${
        collapsed ? 'w-[72px]' : 'w-64'
      }`}
      style={{ boxShadow: 'var(--shadow-sidebar)' }}
    >
      {/* Sidebar header */}
      <div className={`p-4 flex items-center ${collapsed ? 'justify-center' : 'justify-between'} border-b border-border-light`}>
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg ${gradientClass} flex items-center justify-center`}>
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-text-primary truncate">{title}</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-primary-50 text-text-muted hover:text-primary-600 transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
        {links.map(({ path, label, icon: Icon, badge }) => (
          <Link
            key={path}
            to={path}
            title={collapsed ? label : undefined}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative ${
              isActive(path)
                ? `bg-primary-50 text-primary-700 border-l-3 border-primary-500`
                : 'text-text-secondary hover:bg-primary-50/50 hover:text-primary-600'
            }`}
          >
            <Icon className={`w-5 h-5 shrink-0 ${isActive(path) ? 'text-primary-600' : 'text-text-muted group-hover:text-primary-500'}`} />
            {!collapsed && (
              <>
                <span className="truncate">{label}</span>
                {badge !== undefined && badge > 0 && (
                  <span className="ml-auto bg-danger text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                    {badge}
                  </span>
                )}
              </>
            )}
            {collapsed && badge !== undefined && badge > 0 && (
              <span className="absolute -top-1 -right-1 bg-danger text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {badge > 9 ? '9+' : badge}
              </span>
            )}
          </Link>
        ))}
      </nav>

      {/* Bottom section */}
      {!collapsed && (
        <div className="p-4 border-t border-border-light">
          <p className="text-xs text-text-muted text-center">MediBook v1.0</p>
        </div>
      )}
    </aside>
  );
}
