import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const CircularLoading: React.FC = () => {
  const circleRef = useRef<SVGCircleElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onUpdate: () => {
        setProgress(Math.round(tl.progress() * 100));
      },
      repeat: -1, // Lặp vô hạn
      repeatDelay: 0.5,
    });

    tl.to(circleRef.current, {
      strokeDashoffset: 0, // Điểm kết thúc của nét vẽ
      duration: 2,
      ease: "power2.out",
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "120px", height: "120px" }}>
      {/* Vòng tròn nền */}
      <svg width="120" height="120" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#ddd"
          strokeWidth="6"
        />
        {/* Vòng tròn chạy */}
        <circle
          ref={circleRef}
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#3498db"
          strokeWidth="6"
          strokeDasharray="251.2"
          strokeDashoffset="251.2"
          strokeLinecap="round"
        />
      </svg>
      {/* Hiển thị phần trăm */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        {progress}%
      </div>
    </div>
  );
};

export default CircularLoading;
