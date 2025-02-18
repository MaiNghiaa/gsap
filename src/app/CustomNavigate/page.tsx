"use client";
import gsap from "gsap";
import React, { useEffect } from "react";

type Props = {};

export default function page() {
  let tl = gsap.timeline();

  let onClickOpen = () => {
    tl.play();
  };
  let onClickClose = () => {
    tl.reverse();
  };
  useEffect(() => {
    tl.to(".nav-full", {
      right: 0,
      duration: 0.6,
    });
    tl.from(".nav-full h4", {
      x: 150,
      duration: 1,
      stagger: 0.4,
      opacity: 0,
    });

    tl.pause();
  }, []);
  return (
    <div className="h-full w-full bg-blue-300 overflow-x-hidden">
      <div
        className="main h-screen w-screen bg-blue-300 bg-cover bg-no-repeat 
 bg-[url(https://images.unsplash.com/photo-1500390365106-166bb67248d6?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]"
      >
        <div className="nav flex items-center justify-between py-10 px-[50px] text-white">
          <h2 className="text-[16px] font-bold">Nghia</h2>
          <img
            onClick={onClickOpen}
            className="w-[30px] h-[30px] object-cover font-bold"
            src="/menu.svg"
            alt=""
          />
          <div
            className="nav-full h-[100%] w-[40%] absolute bg-[rgba(255,255,255,0.544)] top-0 right-[-40%] backdrop-blur-[10px]
          py-[150px] px-[50px]"
          >
            <img
              onClick={onClickClose}
              className="w-[30px] h-[30px] object-cover font-bold absolute top-[100px] right-[50px] bg-white rounded-full"
              src="/closesvg.svg"
              alt=""
            />
            <h4 className="text-[50px] font-semibold mb-[5px]">Work</h4>
            <h4 className="text-[50px] font-semibold mb-[5px]">About</h4>
            <h4 className="text-[50px] font-semibold mb-[5px]">Services</h4>
            <h4 className="text-[50px] font-semibold mb-[5px]">Courses</h4>
            <h4 className="text-[50px] font-semibold mb-[5px]">Contact us</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
