"use client";
import gsap from "gsap";
import { ScrambleTextPlugin, SplitText } from "gsap-trial/all";
import { CustomEase } from "gsap/all";
import React, { useRef, useEffect, useState } from "react";

export default function Page() {
  // Animation refs
  gsap.registerPlugin(ScrambleTextPlugin, SplitText);

  const text = "Mai Trung Nghia";
  const [content, setContent] = useState("");

  useEffect(() => {
    // Chia text thành các <span>
    const arrayString = text.split("").map((char, i) => (
      <span key={i} className="inline-block">
        {char}
      </span>
    ));
    setContent(arrayString);

    setTimeout(() => {
      // Animation 1
      gsap.from("h1 span", {
        y: 50,
        opacity: 0,
        duration: 0.5,
        delay: 0.5,
        smoothOrigin: true,
        repeat: -1,
        stagger: 0.1,
      });

      // Animation 2
      gsap.from("h2 span", {
        y: (i) => Math.sin(i * 0.5) * 20,
        duration: 0.2,
        repeat: -1,
        yoyo: true,
        stagger: 0.1,
        ease: "power1.inOut",
      });
      gsap.fromTo(
        ".animation3 span",
        { y: -50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.1,
          ease: "rough({ strength: 2, points: 50, template: none.out, randomize: true })",
        }
      );

      gsap.to(".animation4", {
        duration: 4,
        scrambleText: "THIS IS NEW TEXT",
      });
    }, 100);
  }, []);
  let onMouseOver = () => {
    const tl = gsap.timeline();

    tl.to(".first-text", {
      x: "-20px",
      ease: "expo.inOut",
    })
      .to(".first-text-2", {
        x: "20px",
        ease: "expo.inOut",
      })
      .to(".windmill", {
        opacity: 1,
        duration: 1,
        x: -40,
        y: -50,
      })
      .to(".circle", {
        duration: 1,
        opacity: 1,
        rotate: 180,
        x: 30,
        y: -70,
      })
      .to(".spin", {
        duration: 1,
        opacity: 1,
        rotation: 360,
        transformOrigin: "center",
        y: -70,
      });
  };

  let onMouseLeave = () => {
    const tl = gsap.timeline();

    tl.to(".first-text, .first-text-2", {
      x: "0",
      ease: "expo.inOut",
      stagger: 0,
    }).to(".windmill, .circle, .spin", {
      duration: 0.3,
      opacity: 0,
      y: 0,
      rotation: 360,
      transformOrigin: "center",
      stagger: 0,
    });
  };

  let onClickAnimateQuote = () => {
    var tl = gsap.timeline(),
      mySplitText = new SplitText("#quote", { type: "words,chars" }),
      chars = mySplitText.chars; //an array of all the divs that wrap each character

    gsap.set("#quote", { perspective: 400 });

    console.log(chars);

    tl.from(chars, {
      duration: 0.8,
      opacity: 0,
      scale: 0,
      y: 80,
      rotationX: 180,
      transformOrigin: "0% 50% -50",
      ease: "back",
      stagger: 0.01,
    });

    tl.restart();
  };

  return (
    <div className="h-screen w-screen flex justify-start items-start flex-wrap bg-blue-200 content-start">
      <div className="h-[200px] w-[300px] flex items-center justify-center border p-3 border-[#000000]">
        <h1 className="text-[#000000] font-semibold text-[30px]">{content}</h1>
      </div>
      <div className="h-[200px] w-[300px] flex items-center justify-center border p-3 border-[#000000]">
        <h2 className="text-[#000000] font-semibold text-[30px]">{content}</h2>
      </div>
      <div className="h-[200px] w-[300px] flex items-center justify-center border p-3 border-[#000000]">
        <p className="animation3 text-[#000000] font-semibold text-[30px]">
          {content}
        </p>
      </div>
      <div className="h-[200px] w-[300px] flex items-center justify-center border p-3 border-[#000000]">
        <p className="animation4 text-[#000000] font-semibold text-[30px]">
          {content}
        </p>
      </div>
      <div className="h-[200px] w-[300px] flex items-center justify-center border p-3 border-[#000000]">
        <p className="animation4 text-[#000000] font-semibold text-[30px]">
          {content}
        </p>
      </div>
      <div className="bg-[#DFDDFF] h-[200px] w-[300px] flex items-center justify-center border p-3 border-[#000000]">
        <button
          onMouseOver={onMouseOver}
          onMouseLeave={onMouseLeave}
          className="relative w-[300px] flex justify-center gap-[3px] items-center px-8 py-4 border-[2px] border-[#000000] text-[#000000] bg-[#DFDDFF] rounded-full text-[16px] font-bold"
        >
          <span className="first-text">Thu</span>{" "}
          <span className="first-text-2">Nghiem</span>
          <div className="absolute left-[115px]">
            <div className="windmill  opacity-0 w-[20px] h-[20px] object-cover top-[10px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                fill="none"
                width={6.2}
                height={6.3}
                viewBox="0 0 62 63"
                aria-hidden="true"
              >
                <path
                  fill="url(#paint0_radial_2771_42684)"
                  d="m34.246 27.525 10.197-13.201a.26.26 0 0 1 .362-.047L61.76 27.372a.26.26 0 0 1 .046.366c-7.386 9.336-20.882 11.074-30.391 3.919l16.975 13.112c.112.087.133.25.046.362L35.34 62.085a.26.26 0 0 1-.365.046c-9.41-7.444-11.1-21.093-3.746-30.616l-13.255 17.16a.259.259 0 0 1-.362.046L.658 35.626a.26.26 0 0 1-.046-.365c7.386-9.337 20.881-11.074 30.391-3.92l-16.935-13.08a.259.259 0 0 1-.047-.363L27.117.944a.26.26 0 0 1 .365-.046c8.08 6.393 10.469 17.361 6.326 26.362-.129.278.25.508.439.264l-.001.001Z"
                />
                <path
                  fill="url(#pattern-home-hero-btn-windmill-0)"
                  fillOpacity=".6"
                  d="m34.246 27.525 10.197-13.201a.26.26 0 0 1 .362-.047L61.76 27.372a.26.26 0 0 1 .046.366c-7.386 9.336-20.882 11.074-30.391 3.919l16.975 13.112c.112.087.133.25.046.362L35.34 62.085a.26.26 0 0 1-.365.046c-9.41-7.444-11.1-21.093-3.746-30.616l-13.255 17.16a.259.259 0 0 1-.362.046L.658 35.626a.26.26 0 0 1-.046-.365c7.386-9.337 20.881-11.074 30.391-3.92l-16.935-13.08a.259.259 0 0 1-.047-.363L27.117.944a.26.26 0 0 1 .365-.046c8.08 6.393 10.469 17.361 6.326 26.362-.129.278.25.508.439.264l-.001.001Z"
                />
                <defs>
                  <radialGradient
                    id="paint0_radial_2771_42684"
                    cx={0}
                    cy={0}
                    r={1}
                    gradientTransform="rotate(-142.317 24.316 16.274) scale(34.5669)"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#F0FCFF" />
                    <stop offset=".672" stopColor="#9BEDFF" />
                    <stop offset=".76" stopColor="#98ECFF" />
                    <stop offset=".849" stopColor="#5BE1FF" />
                    <stop offset=".948" stopColor="#00BAE2" />
                  </radialGradient>
                  <pattern
                    id="pattern-home-hero-btn-windmill-0"
                    width="2.279"
                    height="2.279"
                    patternContentUnits="objectBoundingBox"
                  >
                    <use xlinkHref="#svg-noise" transform="scale(.00456)" />
                  </pattern>
                </defs>
              </svg>
            </div>
            <div className="circle  opacity-0 w-[5px] h-[5px] object-cover">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                fill="none"
                width={23}
                height={23}
                viewBox="0 0 23 23"
                aria-hidden="true"
              >
                <path
                  fill="url(#paint0_radial_2146_58993)"
                  fillRule="evenodd"
                  d="M7.959 10.053a4.368 4.368 0 0 1-.889-.17c-2.327-.7-3.64-3.174-2.933-5.527C4.845 2.002 7.305.662 9.632 1.36c2.327.7 3.64 3.174 2.933 5.528-.06.197-.131.387-.214.57l.46.138c.032-.198.078-.396.137-.593.707-2.353 3.167-3.694 5.494-2.995 2.328.7 3.64 3.175 2.933 5.528-.707 2.353-3.167 3.694-5.494 2.995a4.377 4.377 0 0 1-.745-.3l-.1.333c.261.029.525.082.786.16 2.328.7 3.64 3.175 2.933 5.528-.707 2.353-3.167 3.694-5.494 2.995-2.327-.7-3.64-3.175-2.933-5.528a4.51 4.51 0 0 1 .35-.845l-.54-.163c-.03.265-.085.531-.164.796-.708 2.353-3.168 3.694-5.495 2.994-2.327-.7-3.64-3.174-2.933-5.527.708-2.354 3.168-3.694 5.495-2.995.295.089.574.206.835.349l.083-.276Z"
                  clipRule="evenodd"
                />
                <path
                  fill="url(#pattern-home-hero-btn-circles-0)"
                  fillOpacity=".6"
                  fillRule="evenodd"
                  d="M7.959 10.053a4.368 4.368 0 0 1-.889-.17c-2.327-.7-3.64-3.174-2.933-5.527C4.845 2.002 7.305.662 9.632 1.36c2.327.7 3.64 3.174 2.933 5.528-.06.197-.131.387-.214.57l.46.138c.032-.198.078-.396.137-.593.707-2.353 3.167-3.694 5.494-2.995 2.328.7 3.64 3.175 2.933 5.528-.707 2.353-3.167 3.694-5.494 2.995a4.377 4.377 0 0 1-.745-.3l-.1.333c.261.029.525.082.786.16 2.328.7 3.64 3.175 2.933 5.528-.707 2.353-3.167 3.694-5.494 2.995-2.327-.7-3.64-3.175-2.933-5.528a4.51 4.51 0 0 1 .35-.845l-.54-.163c-.03.265-.085.531-.164.796-.708 2.353-3.168 3.694-5.495 2.994-2.327-.7-3.64-3.174-2.933-5.527.708-2.354 3.168-3.694 5.495-2.995.295.089.574.206.835.349l.083-.276Z"
                  clipRule="evenodd"
                />
                <defs>
                  <radialGradient
                    id="paint0_radial_2146_58993"
                    cx={0}
                    cy={0}
                    r={1}
                    gradientTransform="rotate(-31.559 22.628 3.049) scale(17.064 11.3981)"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#FFD9B0" />
                    <stop offset=".807" stopColor="#FD9F3B" />
                    <stop offset={1} stopColor="#FF8709" />
                  </radialGradient>
                  <pattern
                    id="pattern-home-hero-btn-circles-0"
                    width="5.556"
                    height="5.556"
                    patternContentUnits="objectBoundingBox"
                  >
                    <use xlinkHref="#svg-noise" transform="scale(.01111)" />
                  </pattern>
                </defs>
              </svg>
            </div>
            <div className="spin opacity-0  w-[5px] h-[5px] object-cover">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                fill="none"
                width={19}
                height={19}
                viewBox="0 0 19 19"
                aria-hidden="true"
              >
                <path
                  fill="url(#paint0_linear_2771_24471)"
                  d="M.27 7.683a1 1 0 0 1 .372-1.364L10.995.409a1 1 0 0 1 1.364.373l5.91 10.352a1 1 0 0 1-.373 1.365l-10.353 5.91a1 1 0 0 1-1.364-.373L.27 7.683Z"
                />
                <path
                  fill="url(#pattern-home-hero-btn-square-0)"
                  fillOpacity=".6"
                  d="M.27 7.683a1 1 0 0 1 .372-1.364L10.995.409a1 1 0 0 1 1.364.373l5.91 10.352a1 1 0 0 1-.373 1.365l-10.353 5.91a1 1 0 0 1-1.364-.373L.27 7.683Z"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_2771_24471"
                    x1="24.297"
                    x2="3.329"
                    y1="7.113"
                    y2="17.933"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset=".144" stopColor="#FFE9FE" />
                    <stop offset={1} stopColor="#FF96F9" />
                  </linearGradient>
                  <pattern
                    id="pattern-home-hero-btn-square-0"
                    width="5.08"
                    height="5.08"
                    patternContentUnits="objectBoundingBox"
                  >
                    <use xlinkHref="#svg-noise" transform="scale(.01016)" />
                  </pattern>
                </defs>
              </svg>
            </div>
          </div>
        </button>
      </div>
      <div className="bg-black h-[full] w-[full] flex items-center justify-center flex-col gap-6 border p-3 border-[#000000]">
        <div
          id="quote"
          className="text-[clamp(2rem,10rem,5vw)] text-[#dfdcff] text-center leading-[1.2]"
        >
          SplitText makes it easy to break apart the text in an HTML element so
          that each character, word, and/or line is wrapped in its own div tag.
        </div>

        <button
          id="animate"
          className="py-4 px-8 my-5 bg-[#ffffff] rounded-full text-[#000000]"
          onClick={onClickAnimateQuote}
        >
          animate
        </button>
      </div>
      <div className="bg-black h-[full] w-[full] flex items-center justify-center flex-col gap-6 border p-3 border-[#000000]">
        <nav
          id="nav"
          className="pb-5 flex items-center justify-center gap-3 flex-wrap"
        >
          <button
            id="chars"
            className="text-[16px] font-medium bg-white text-black rounded-full  py-2 px-4 cursor-pointer"
          >
            chars
          </button>
          <button
            id="words"
            className="text-[16px] font-medium bg-white text-black rounded-full  py-2 px-4 cursor-pointer"
          >
            words
          </button>
          <button
            id="lines"
            className="text-[16px] font-medium bg-white text-black rounded-full  py-2 px-4 cursor-pointer"
          >
            lines
          </button>
          <button
            id="charsWordsLines"
            className="text-[16px] font-medium bg-white text-black rounded-full  py-2 px-4 cursor-pointer"
          >
            chars words and lines
          </button>
          <button
            id="revert"
            className="text-[16px] font-medium bg-white text-black rounded-full py-2 px-4 cursor-pointer"
          >
            revert
          </button>
        </nav>
        <div id="demo" className="relative">
          <div
            id="quote2"
            className="text-center text-[#dfdcff] text-[clamp(2rem,_6rem,_4.5vw)] leading-[1.2]"
          >
            SplitText supports{" "}
            <strong className="text-[#ff7a00]">nested tags</strong> like{" "}
            <span className="code">&lt;span&gt;</span>,{" "}
            <span className="code">&lt;strong&gt;</span>, and{" "}
            <span className="code">&lt;em&gt;</span>. Want to preserve a link?{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
