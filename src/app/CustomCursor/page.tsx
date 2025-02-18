"use client";
import gsap from "gsap";
import React from "react";

export default function page() {
  let onMouseMove = (event: any) => {
    console.log("onMouseMove", event);
    gsap.to(".cursor", {
      x: event.clientX,
      y: event.clientY,
      duration: 1,
      ease: "back.out",
    });
  };

  let onMouseEnter = () => {
    gsap.to(".cursor", {
      scale: 2,
    });
  };
  let onMouseLeave = () => {
    gsap.to(".cursor", {
      scale: 1,
    });
  };
  return (
    <div className="">
      <div className="cursor h-5 w-5 bg-slate-700 rounded-full fixed "></div>

      <div
        className="main w-screen h-screen bg-[#111] flex items-center justify-center"
        onMouseMove={(event) => onMouseMove(event)}
      >
        <div
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="image h-[30vw] w-[70vw] bg-red-300 bg-no-repeat bg-cover
  bg-[url(https://images.unsplash.com/photo-1738526787238-96d5352c2ba9?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]"
        ></div>
      </div>
    </div>
  );
}
