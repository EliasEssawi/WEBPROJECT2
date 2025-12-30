import React, { ReactNode } from 'react';
import NavigationBar from './NavigationBar';

interface LayoutProps {
  // This "children" prop represents the 80% content area
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen w-full">
      {/* 1. SIDEBAR: Fixed 20% width */}
      <aside className="w-1/5 h-screen sticky top-0 bg-white border-r border-gray-200 overflow-y-auto">
        <NavigationBar />
      </aside>

      {/* 2. MAIN CONTENT: The "Parameter" content (80% width) */}
      <main className="w-4/5 min-h-screen bg-gray-50 p-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;