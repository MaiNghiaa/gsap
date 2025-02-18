"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect } from "react";
gsap.registerPlugin(ScrollTrigger);
export default function page() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".box-C",
      toggleActions: "play pause reverse pause",
      //play, pause, resume, reverse, restart, complete,none
      markers: true,
      // start: "20px 80%",
      start: "center center",
      end: "bottom 200px",
      // end: "+=300%",
      // end: "top 100px",
      scrub: true,
    },
  });
  useEffect(() => {
    gsap.to(".box-A", {
      x: 400,
      rotation: 360,
      duration: 3,
    });

    tl.to(".box-C", {
      x: 400,
      rotation: 360,
      duration: 3,
    });
  }, []);

  return (
    <div className="bg-[#4CAA80] w-full h-full  overflow-hidden">
      <div className="flex items-start flex-col gap-[500px] p-8 overflow-hidden">
        <div className="box-A bg-[#A3D9CE] w-40 h-40 flex items-center justify-center">
          <p className="text text-black text-xl">A</p>
        </div>
        <div className="box-B bg-[#A3D9CE] w-40 h-40 flex items-center justify-center">
          <p className="text text-black text-xl">B</p>
        </div>
        <div className="box-C bg-[#A3D9CE] w-40 h-40 flex items-center justify-center">
          <p className="text text-black text-xl">C</p>
        </div>
        <div className="box-D bg-[#A3D9CE] w-40 h-40 flex items-center justify-center">
          <p className="text text-black text-xl">D</p>
        </div>
      </div>
    </div>
  );
}
