export default function VideoBackground() {
  return (
    <>
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: 0,
          pointerEvents: 'none',
          filter: 'brightness(1.25) contrast(1.08) saturate(1.15)',
        }}
      >
        <source src="/video/showroom.mp4" type="video/mp4" />
      </video>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 1,
          pointerEvents: 'none',
          background:
            'linear-gradient(180deg, rgba(6,6,8,0.68) 0%, rgba(6,6,8,0.55) 18%, rgba(6,6,8,0.7) 42%, rgba(6,6,8,0.88) 70%, rgba(6,6,8,0.96) 100%)',
        }}
      />
    </>
  );
}
