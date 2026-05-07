'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function TopBar() {
  const pathname = usePathname();
  const isHome = pathname === '/dashboard';

  return (
    <div className="topbar" style={{ 
      display: 'flex', 
      justifyContent: 'flex-end', 
      alignItems: 'center', 
      padding: isHome ? '15px 20px' : '6px 20px',
      minHeight: isHome ? '68px' : '28px',
      width: '100%',
      zIndex: 100,
      position: 'relative'
    }}>
      {isHome && (
        <Link href="/profile" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: '36px', height: '36px', borderRadius: '50%',
          backgroundColor: 'rgba(200, 144, 42, 0.05)', 
          border: '1px solid rgba(200, 144, 42, 0.25)',
          color: 'var(--gold2)',
          transition: 'all 0.3s ease'
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
        </Link>
      )}
    </div>
  );
}
