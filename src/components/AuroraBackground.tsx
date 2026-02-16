export default function AuroraBackground() {
  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full opacity-[0.12]"
          style={{
            width: 600, height: 600, top: '-20%', left: '-10%',
            background: '#64ffda', filter: 'blur(120px)',
            animation: 'aurora-float 25s ease-in-out infinite',
          }}
        />
        <div
          className="absolute rounded-full opacity-[0.10]"
          style={{
            width: 500, height: 500, top: '40%', right: '-15%',
            background: '#bd93f9', filter: 'blur(120px)',
            animation: 'aurora-float 20s ease-in-out infinite',
            animationDelay: '-5s',
          }}
        />
        <div
          className="absolute rounded-full opacity-[0.08]"
          style={{
            width: 400, height: 400, bottom: '-10%', left: '30%',
            background: '#57cbff', filter: 'blur(120px)',
            animation: 'aurora-float 22s ease-in-out infinite',
            animationDelay: '-10s',
          }}
        />
      </div>
      {/* Grid overlay */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(100,255,218,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(100,255,218,0.015) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 20%, transparent 100%)',
        }}
      />
    </>
  )
}
