export default function BackgroundLayer() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-dark" />

      {/* Coral blob — top right */}
      <div
        className="blob-animated absolute"
        style={{
          width: "55vw",
          height: "45vh",
          top: "2%",
          right: "-8%",
          background:
            "radial-gradient(ellipse, rgba(255,60,95,0.18) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "float 25s ease-in-out infinite",
        }}
      />

      {/* Indigo blob — center left */}
      <div
        className="blob-animated absolute"
        style={{
          width: "50vw",
          height: "50vh",
          top: "35%",
          left: "-10%",
          background:
            "radial-gradient(ellipse, rgba(88,86,214,0.15) 0%, transparent 70%)",
          filter: "blur(90px)",
          animation: "float 30s ease-in-out infinite reverse",
        }}
      />

      {/* Lime blob — bottom center */}
      <div
        className="blob-animated absolute"
        style={{
          width: "40vw",
          height: "35vh",
          bottom: "8%",
          left: "25%",
          background:
            "radial-gradient(ellipse, rgba(52,199,89,0.12) 0%, transparent 70%)",
          filter: "blur(90px)",
          animation: "float 35s ease-in-out infinite",
          animationDelay: "5s",
        }}
      />

      {/* Amber accent — top left */}
      <div
        className="blob-animated absolute"
        style={{
          width: "30vw",
          height: "25vh",
          top: "15%",
          left: "10%",
          background:
            "radial-gradient(ellipse, rgba(255,159,10,0.10) 0%, transparent 70%)",
          filter: "blur(100px)",
          animation: "float 28s ease-in-out infinite",
          animationDelay: "8s",
        }}
      />

      {/* Cyan accent — bottom right */}
      <div
        className="blob-animated absolute"
        style={{
          width: "35vw",
          height: "30vh",
          bottom: "15%",
          right: "5%",
          background:
            "radial-gradient(ellipse, rgba(90,200,250,0.10) 0%, transparent 70%)",
          filter: "blur(100px)",
          animation: "float 32s ease-in-out infinite reverse",
          animationDelay: "12s",
        }}
      />
    </div>
  );
}
