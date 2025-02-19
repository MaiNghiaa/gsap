"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const CircularLoading: React.FC = () => {
  const circleRef = useRef<SVGCircleElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onUpdate: () => {
        setProgress(Math.round(tl.progress() * 100));
      },
    });

    tl.to(circleRef.current, {
      strokeDashoffset: 0,
      duration: 2,
      ease: "power2.out",
    });

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      let tl2 = gsap.timeline();

      tl2
        .to(".processing", {
          opacity: 0,
          delay: 0.3,
          duration: 0.8,
          ease: "power2.out",
        })
        .to(containerRef.current, {
          scale: 3,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        })
        .to(
          imageRef.current,
          {
            borderRadius: 0,
            opacity: 2,
            scale: 1.1,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.8"
        ); // Chạy song song với animation trên
    }
  }, [progress]);

  return (
    <div className="main h-screen bg-black w-screen flex justify-center items-center">
      {/* Container vòng tròn */}
      <div
        ref={containerRef}
        className="relative w-[120px] h-[120px] transition-all"
      >
        <svg width="120" height="120" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#ddd"
            strokeWidth="6"
          />
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

        <div
          className="processing w-full h-full absolute top-[50%] left-[50%] text-[18px] font-bold flex justify-center items-center"
          style={{
            transform: "translate(-50%, -50%)",
            color: "white",
          }}
        >
          {progress}%
        </div>
      </div>
      <div
        ref={imageRef}
        className="absolute w-screen h-screen bg-cover rounded-[50%] opacity-0 transition-all"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1620370219275-65b5d008f41a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fA%3D%3D)",
        }}
      ></div>
    </div>
  );
};

export default CircularLoading;
