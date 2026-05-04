'use client';
import { useEffect, useState } from 'react';

export function TopBar() {
  const [timeStr, setTimeStr] = useState('9:41');

  useEffect(() => {
    const updateClock = () => {
      const d = new Date();
      const h = d.getHours();
      const m = d.getMinutes();
      setTimeStr(`${h % 12 || 12}:${m.toString().padStart(2, '0')}`);
    };
    updateClock();
    const iv = setInterval(updateClock, 15000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="sb">
      <span className="sb-t">{timeStr}</span>
      <div className="sb-r">
        <span>●●●</span>
        <span>⊟</span>
      </div>
    </div>
  );
}
