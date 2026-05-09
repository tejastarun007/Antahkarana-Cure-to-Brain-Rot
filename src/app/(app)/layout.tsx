'use client';
import { BottomNav } from '@/components/BottomNav';
import { useEffect } from 'react';
import { pullStateFromCloud, pushStateToCloud } from '@/lib/sync';
import { useStore } from '@/store/useStore';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Pull latest state on mount
    pullStateFromCloud();

    // Subscribe to local state changes and push to cloud
    const unsubscribe = useStore.subscribe((state) => {
      pushStateToCloud(state);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="phone">
      <div className="screens">
        {children}
        <BottomNav />
      </div>
    </div>
  );
}
