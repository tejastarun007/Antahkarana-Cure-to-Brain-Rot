'use client';
import { BottomNav } from '@/components/BottomNav';
import { useEffect, useState } from 'react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    // Auth is now handled by middleware.ts — no client-side check needed
  }, []);

  if (!mounted) return null;

  return (
    <div className="phone">
      <div className="screens">
        {children}
        <BottomNav />
      </div>
    </div>
  );
}
