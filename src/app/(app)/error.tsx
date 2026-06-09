'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="phone">
      <div className="screens">
        <div className="screen on" style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', padding: '40px 24px', textAlign: 'center',
          background: 'var(--deep)'
        }}>
          <div style={{
            width: '60px', height: '60px', borderRadius: '50%',
            background: 'rgba(192,64,64,.1)', border: '1px solid rgba(192,64,64,.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '24px', marginBottom: '20px'
          }}>⚠️</div>
          <div style={{
            fontFamily: 'var(--serif)', fontSize: '22px', color: 'var(--gold2)',
            marginBottom: '8px'
          }}>Something went wrong</div>
          <div style={{
            fontFamily: 'var(--deva)', fontSize: '14px', color: 'var(--gold3)',
            opacity: 0.7, marginBottom: '16px'
          }}>क्षमा करें · Please forgive</div>
          <div style={{
            fontSize: '13px', color: 'var(--t2)', lineHeight: 1.6,
            marginBottom: '24px', maxWidth: '280px'
          }}>
            {error.message || 'An unexpected error occurred. Your practice data is safe.'}
          </div>
          <button
            className="btn btn-g"
            onClick={() => reset()}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
