'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{
        margin: 0, padding: 0, background: '#0a0712',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: '100vh', fontFamily: 'system-ui, sans-serif', color: '#fff'
      }}>
        <div style={{
          textAlign: 'center', padding: '40px 24px', maxWidth: '360px'
        }}>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>⚠️</div>
          <h2 style={{
            fontSize: '22px', fontWeight: 300, marginBottom: '8px',
            color: '#f6cc60'
          }}>Something went wrong</h2>
          <p style={{
            fontSize: '14px', color: '#b4a484', lineHeight: 1.6,
            marginBottom: '24px'
          }}>
            {error.message || 'An unexpected error occurred.'}
          </p>
          <button
            onClick={() => reset()}
            style={{
              fontFamily: 'monospace', fontSize: '11px', letterSpacing: '1px',
              textTransform: 'uppercase', padding: '12px 22px', borderRadius: '50px',
              border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg, #b87428, #f6cc60)',
              color: '#08060e'
            }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
