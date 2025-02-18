"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect } from "react";
gsap.registerPlugin(ScrollTrigger);
export default function page() {
  const tl = gsap.timeline();
  useEffect(() => {
    gsap.from(".box", {
      opacity: 0,
      delay: 0.4,
      duration: 0.5,
    });
    tl.from(".box", {
      opacity: 0,
      delay: 0.2,
      duration: 0.5,
    }).fromTo(
      ".text",
      {
        skewX: 65,
        opacity: 0,
        x: 300,
      },
      {
        opacity: 1,
        skewX: 0,
        x: 0,
        delay: 0.2,
        duration: 0.5,
      }
    );
  }, []);
  return (
    <div className="bg-[#4CAA80] w-screen h-screen p-3">
      <div className="box bg-[#A3D9CE] w-40 h-40">
        <p className="text text-black">Hom nay la thu 3</p>
      </div>
    </div>
  );
}
