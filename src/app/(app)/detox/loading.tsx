'use client';
import { useEffect, useState } from 'react';

export default function DetoxLoading() {
  const [visible, setVisible] = useState(false);

  // Trigger fade-in after mount so the 0.5s transition plays
  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <div
      className="phone"
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }}
    >
      <div className="screens">
        <div
          className="screen on"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--deep)',
            gap: '0',
          }}
        >
          {/* Concentric rings — echo the detox mandala */}
          <div style={{ position: 'relative', width: '110px', height: '110px', marginBottom: '28px' }}>
            {/* Outer slow ring */}
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              border: '1px solid rgba(192,64,64,0.25)',
              animation: 'breatheRing 3s ease-in-out infinite',
            }} />
            {/* Mid ring */}
            <div style={{
              position: 'absolute', inset: '14px', borderRadius: '50%',
              border: '1px dashed rgba(192,64,64,0.18)',
              animation: 'breatheRing 3s ease-in-out infinite 0.6s',
            }} />
            {/* Inner ring */}
            <div style={{
              position: 'absolute', inset: '28px', borderRadius: '50%',
              border: '1px solid rgba(112,96,192,0.22)',
              animation: 'breatheRing 3s ease-in-out infinite 1.2s',
            }} />
            {/* Centre glyph */}
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{
                fontFamily: 'var(--deva)',
                fontSize: '26px',
                color: 'var(--sindoor2)',
                opacity: 0.8,
                lineHeight: 1,
                textShadow: '0 0 20px rgba(192,64,64,0.35)',
              }}>विष</span>
            </div>
          </div>

          {/* Label */}
          <div style={{
            fontFamily: 'var(--mono)',
            fontSize: '10px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: 'var(--sindoor2)',
            opacity: 0.7,
            marginBottom: '8px',
          }}>
            Algo Detox
          </div>

          {/* Sub-label */}
          <div style={{
            fontFamily: 'var(--serif)',
            fontSize: '13px',
            fontStyle: 'italic',
            color: 'var(--t3)',
          }}>
            Preparing the diagnosis…
          </div>
        </div>
      </div>
    </div>
  );
}
