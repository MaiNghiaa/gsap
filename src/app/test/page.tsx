"use client";
import gsap from "gsap";
import { ScrambleTextPlugin, SplitText, TextPlugin } from "gsap-trial/all";
import { useEffect, useState } from "react";
import Head from "next/head";
export default function Page() {
  const text = "Mai Trung Nghia";
  const content = text.split("").map((char, i) => (
    <span key={i} className="inline-block">
      {char}
    </span>
  ));

  const [isClient, setIsClient] = useState(false);
  const [mySplitText, setMySplitText] = useState(
    "nested tags like <span> <strong> <em> Want to preserve a link?"
  );

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrambleTextPlugin, SplitText, TextPlugin);
    }
  }, []);

  const [words, setWords] = useState<string[]>([
    "Smooth",
    "Animation",
    "Tailwind",
    "GreenSock",
    "Awesome!",
  ]);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });

    words.forEach((word, index) => {
      tl.to(`#word-${index}`, {
        visibility: "visible",
        opacity: 1,
        duration: word.length * 0.2,
      }).to(`#word-${index}`, {
        opacity: 0,
        duration: 0.2,
        delay: 1,
      });
    });

    return () => {
      tl.kill();
    };
  }, [words]);

  useEffect(() => {
    if (!isClient) return;

    requestAnimationFrame(() => {
      // Animation 1: Chữ rơi xuống
      gsap.from("h1 span", {
        y: 50,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      });

      // Animation 2: Chữ rung nhẹ
      gsap.from("h2 span", {
        y: (i) => Math.sin(i * 0.5) * 20,
        duration: 0.2,
        repeat: -1,
        yoyo: true,
        stagger: 0.1,
        ease: "power1.inOut",
      });

      // Animation 3: Chữ bay lên dần
      gsap.fromTo(
        ".animation3 span",
        { y: -50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          repeat: -1,
          duration: 1.5,
          stagger: 0.1,
          ease: "rough({ strength: 2, points: 50, randomize: true })",
        }
      );

      // Animation 4: Text scramble
      gsap.to(".animation4", {
        duration: 4,
        repeat: -1,
        scrambleText: "THIS IS NEW TEXT",
      });

      // Animation 5: Các hình bay lên theo quỹ đạo ngẫu nhiên
      const tl = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 1 });
      tl.to(".first-text", { x: "-20px", ease: "expo.inOut" })
        .to(".first-text-2", { x: "20px", ease: "expo.inOut" }, "<")
        .to(".windmill", {
          opacity: 1,
          x: -30,
          y: -80,
          rotate: 30,
          ease: "power2.out",
        })
        .to(
          ".circle",
          { opacity: 1, x: 40, y: -90, rotate: -45, ease: "power2.out" },
          "-=1.2"
        )
        .to(
          ".spin",
          { opacity: 1, x: -20, y: -100, rotate: 360, ease: "power2.out" },
          "-=1.0"
        );

      return () => tl.kill();
    });
  }, [isClient]);

  // SplitText Animations
  let onClickAnimateQuote = () => {
    let tl = gsap.timeline();
    let mySplitText = new SplitText("#quote", { type: "words,chars" });
    let chars = mySplitText.chars;

    gsap.set("#quote", { perspective: 400 });

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

  const splitTextTimeline = gsap.timeline();

  let kill = () => {
    splitTextTimeline.clear().time(0);
    splitTextTimeline.restart();
  };

  let onClickChars = () => {
    kill();
    gsap.from("#quote2 span", {
      duration: 1,
      scale: 4,
      autoAlpha: 0,
      rotationX: -180,
      transformOrigin: "100% 50%",
      ease: "back",
      stagger: 0.02,
    });
  };

  let onClickWords = () => {
    kill();
    splitTextTimeline.from(
      "#quote2 span",
      { duration: 1, opacity: 0, force3D: true },
      0.01
    );
  };

  let onClickLines = () => {
    splitTextTimeline
      .from(
        "#quote2 span",
        { duration: 0.6, autoAlpha: 0, scale: 3, stagger: 0.02 },
        0.5
      )
      .to(
        "#quote2 span",
        { duration: 0.2, color: "#ff8709", scale: 0.9, stagger: 0.1 },
        "words"
      )
      .to(
        "#quote2 span",
        { duration: 0.4, color: "white", scale: 1, stagger: 0.1 },
        "words+=0.1"
      )
      .to("#quote2 span", {
        duration: 0.5,
        x: 100,
        autoAlpha: 0,
        stagger: 0.2,
      });
  };

  //

  useEffect(() => {
    gsap.to("h1.animate6", { duration: 3, text: "this is a to tween" });
    gsap.from("h2.animate6", { duration: 3, text: "" });
  }, []);

  return (
    <div className="h-screen w-screen flex flex-wrap justify-start items-start bg-blue-200 content-start">
      {/* Chữ Animation */}
      <div className="h-[200px] w-[300px] flex items-center justify-center border p-3 border-black">
        <h1 className="text-black font-semibold text-[30px]">{content}</h1>
      </div>
      <div className="h-[200px] w-[300px] flex items-center justify-center border p-3 border-black">
        <h2 className="text-black font-semibold text-[30px]">{content}</h2>
      </div>
      <div className="h-[200px] w-[300px] flex items-center justify-center border p-3 border-black">
        <p className="animation3 text-black font-semibold text-[30px]">
          {content}
        </p>
      </div>
      {/* Chữ Scramble */}
      <div className="h-[200px] w-[300px] flex items-center justify-center border p-3 border-black">
        <p className="animation4 text-black font-semibold text-[30px]">
          {content}
        </p>
      </div>
      <div className="h-[200px] w-[300px] flex items-center justify-center flex-col border p-3 border-black">
        <h1 className="animate6 text-black font-semibold text-[16px]"></h1>
        <h2 className="animate6 text-black font-semibold text-[16px]">
          This is a from tween
        </h2>
      </div>

      {/* Button Animation */}
      <div className="bg-[#DFDDFF] h-[200px] w-[300px] flex items-center justify-center border p-3 border-black">
        <button className="relative w-[300px] flex justify-center gap-[3px] items-center px-8 py-4 border-[2px] border-black text-black bg-[#DFDDFF] rounded-full text-[16px] font-bold">
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

      <div className="h-[800px] w-screen flex flex-wrap  bg-blue-200">
        {/* Chữ Animation */}

        {/* Quote Animation */}
        <div className="bg-black w-full flex flex-col items-center justify-center gap-6 p-3 border border-black">
          <div
            id="quote"
            className="text-[clamp(2rem,10rem,5vw)] text-[#dfdcff] text-center leading-[1.2]"
          >
            SplitText makes it easy to break apart the text.
          </div>
          <button
            id="animate"
            className="py-4 px-8 bg-white rounded-full text-black"
            onClick={onClickAnimateQuote}
          >
            Animate
          </button>
        </div>

        {/* GSAP Controls */}
        <div className="bg-black w-full flex flex-col items-center justify-center gap-6 p-3 border border-black">
          <nav className="pb-5 flex flex-wrap gap-3 justify-center">
            <button
              onClick={onClickChars}
              className="bg-white text-black text-base font-semibold rounded-full py-2 px-4 whitespace-nowrap"
            >
              Chars
            </button>
            <button
              onClick={onClickWords}
              className="bg-white text-black text-base font-semibold rounded-full py-2 px-4 whitespace-nowrap"
            >
              Words
            </button>
            <button
              onClick={onClickLines}
              className="bg-white text-black text-base font-semibold rounded-full py-2 px-4 whitespace-nowrap"
            >
              Lines
            </button>
          </nav>
        </div>

        <div
          id="quote2"
          className="text-center text-[#dfdcff] text-[clamp(2rem,6rem,4.5vw)] leading-[1.2] bg-[#111]"
        >
          {`SplitText supports nested tags like <span>, <strong>, and <em>. You can even GO NUTS with EMOJI!`
            .split("")
            .map((char, i) => (
              <span key={i} className="inline-block">
                {char}
              </span>
            ))}
        </div>
      </div>
      {/* <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Asap:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head> */}

      <div className="h-screen w-screen flex flex-col items-center justify-center bg-black text-white p-5">
        {/* Hiệu ứng chữ chạy */}
        <div
          id="demo"
          className="relative w-[800px] h-[300px] bg-black overflow-hidden flex items-center justify-center"
        >
          {words.map((word, index) => (
            <h3
              key={index}
              id={`word-${index}`}
              className="absolute text-[120px] font-bold text-center font-[Asap] invisible opacity-0"
            >
              {word}
            </h3>
          ))}
        </div>
      </div>
    </div>
  );
}
