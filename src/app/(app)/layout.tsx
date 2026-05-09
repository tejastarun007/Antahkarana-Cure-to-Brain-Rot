'use client';
import { BottomNav } from '@/components/BottomNav';
import { useState, useEffect } from 'react';
import { pullStateFromCloud, pushStateToCloud } from '@/lib/sync';
import { useStore } from '@/store/useStore';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [mounted] = useState(() => typeof window !== 'undefined');

  useEffect(() => {
    if (!mounted) return;
    
    // Pull latest state on mount
    pullStateFromCloud();

    // Subscribe to local state changes and push to cloud
    const unsubscribe = useStore.subscribe((state) => {
      pushStateToCloud(state);
    });

    return () => unsubscribe();
  }, [mounted]);

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
