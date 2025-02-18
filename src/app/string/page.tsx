"use client";
import gsap from "gsap";
import React from "react";

type Props = {};

export default function page({}: Props) {
  let initialPath = "M 10 100 Q 500 100 1330 100";
  let finalPath = "M 10 100 Q 500 100 1330 100";
  let onMouseMove = (e: any) => {
    // console.log("Entered X", e.clientX);
    // console.log("Entered Y", e.clientY);
    initialPath = `M 10 100 Q ${e.clientX} ${e.clientY} 1330 100`;

    // console.log(initialPath);
    gsap.to("svg path", {
      attr: {
        d: initialPath,
      },
      duration: 0.5,
      ease: "power3.out",
    });
  };
  let onMouseLeave = () => {
    console.log("onMouseLeave");
    gsap.to("svg path", {
      attr: { d: finalPath },
      duration: 0.7,
      ease: "elastic.out(1,0.2)",
    });
  };
  return (
    <div className=" bg-[#171717]">
      <div
        className="string"
        onMouseMove={(dets) => onMouseMove(dets)}
        onMouseLeave={onMouseLeave}
      >
        <svg width="1360" height="250">
          <path
            d="M 10 100 Q 500 100 1330 100"
            stroke="white"
            fill="transparent"
          />
        </svg>
      </div>
      <div
        className="string"
        onMouseMove={(dets) => onMouseMove(dets)}
        onMouseLeave={onMouseLeave}
      >
        <svg width="1360" height="250">
          <path
            d="M 10 100 Q 500 100 1330 100"
            stroke="white"
            fill="transparent"
          />
        </svg>
      </div>
      <div
        className="string"
        onMouseMove={(dets) => onMouseMove(dets)}
        onMouseLeave={onMouseLeave}
      >
        <svg width="1360" height="190">
          <path
            d="M 10 100 Q 500 100 1330 100"
            stroke="white"
            fill="transparent"
          />
        </svg>
      </div>
    </div>
  );
}
