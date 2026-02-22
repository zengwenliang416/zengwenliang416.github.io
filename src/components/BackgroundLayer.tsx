const BLOBS = [
  {
    width: "55vw",
    height: "45vh",
    top: "2%",
    right: "-8%",
    background:
      "radial-gradient(ellipse, rgba(255,60,95,0.18) 0%, transparent 70%)",
    filter: "blur(80px)",
    animation: "float 25s ease-in-out infinite",
    willChange: "transform" as const,
  },
  {
    width: "50vw",
    height: "50vh",
    top: "35%",
    left: "-10%",
    background:
      "radial-gradient(ellipse, rgba(88,86,214,0.15) 0%, transparent 70%)",
    filter: "blur(90px)",
    animation: "float 30s ease-in-out infinite reverse",
    willChange: "transform" as const,
  },
  {
    width: "40vw",
    height: "35vh",
    bottom: "8%",
    left: "25%",
    background:
      "radial-gradient(ellipse, rgba(52,199,89,0.12) 0%, transparent 70%)",
    filter: "blur(90px)",
    animation: "float 35s ease-in-out infinite",
    animationDelay: "5s",
    willChange: "transform" as const,
  },
  {
    width: "30vw",
    height: "25vh",
    top: "15%",
    left: "10%",
    background:
      "radial-gradient(ellipse, rgba(255,159,10,0.10) 0%, transparent 70%)",
    filter: "blur(100px)",
    animation: "float 28s ease-in-out infinite",
    animationDelay: "8s",
    willChange: "transform" as const,
  },
  {
    width: "35vw",
    height: "30vh",
    bottom: "15%",
    right: "5%",
    background:
      "radial-gradient(ellipse, rgba(90,200,250,0.10) 0%, transparent 70%)",
    filter: "blur(100px)",
    animation: "float 32s ease-in-out infinite reverse",
    animationDelay: "12s",
    willChange: "transform" as const,
  },
] as const;

export default function BackgroundLayer() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-dark" />
      {BLOBS.map((style, i) => (
        <div key={i} className="blob-animated absolute" style={style} />
      ))}
    </div>
  );
}
