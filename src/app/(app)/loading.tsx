export default function Loading() {
  return (
    <div className="phone">
      <div className="screens">
        <div className="screen on" style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', background: 'var(--deep)'
        }}>
          {/* Pulsing mandala loader */}
          <div style={{
            position: 'relative', width: '80px', height: '80px',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <div style={{
              position: 'absolute', width: '80px', height: '80px', borderRadius: '50%',
              border: '1px solid rgba(212,150,60,.2)',
              animation: 'breatheRing 2.5s ease-in-out infinite'
            }} />
            <div style={{
              position: 'absolute', width: '50px', height: '50px', borderRadius: '50%',
              border: '1px solid rgba(212,150,60,.15)',
              animation: 'breatheRing 2.5s ease-in-out infinite .5s'
            }} />
            <div style={{
              fontFamily: 'var(--deva)', fontSize: '22px', color: 'var(--gold2)',
              opacity: 0.7, lineHeight: 1
            }}>अ</div>
          </div>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '3px',
            textTransform: 'uppercase', color: 'var(--t3)', marginTop: '20px'
          }}>Loading</div>
        </div>
      </div>
    </div>
  );
}
