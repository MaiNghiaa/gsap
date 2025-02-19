// "use client";

// import { useEffect, useRef, useState } from "react";
// import * as THREE from "three";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import dynamic from "next/dynamic";

// // Đăng ký GSAP Plugin
// gsap.registerPlugin(ScrollTrigger);

// // Import Three.js modules bằng dynamic import
// const loadThreeModules = async () => {
//   const [{ EffectComposer }, { RenderPass }, { UnrealBloomPass }] =
//     await Promise.all([
//       import("three/examples/jsm/postprocessing/EffectComposer"),
//       import("three/examples/jsm/postprocessing/RenderPass"),
//       import("three/examples/jsm/postprocessing/UnrealBloomPass"),
//     ]);
//   return { EffectComposer, RenderPass, UnrealBloomPass };
// };

// export default function ThreeScene() {
//   const mountRef = useRef<HTMLDivElement>(null);
//   const [isClient, setIsClient] = useState(false);

//   // Đảm bảo chỉ chạy trên Client Side
//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   useEffect(() => {
//     if (!isClient || !mountRef.current) return;

//     // Hàm async để tải Three.js sau khi client render
//     (async () => {
//       try {
//         const { EffectComposer, RenderPass, UnrealBloomPass } =
//           await loadThreeModules();

//         // Lấy kích thước màn hình
//         const width = window.innerWidth;
//         const height = window.innerHeight;

//         // Tạo renderer
//         const renderer = new THREE.WebGLRenderer({ antialias: true });
//         renderer.setSize(width, height);
//         renderer.setPixelRatio(window.devicePixelRatio);
//         mountRef.current!.appendChild(renderer.domElement);

//         // Tạo Scene
//         const scene = new THREE.Scene();
//         scene.fog = new THREE.Fog(0x194794, 0, 100);

//         // Tạo Camera
//         const camera = new THREE.PerspectiveCamera(
//           45,
//           width / height,
//           0.1,
//           200
//         );
//         camera.position.z = 400;
//         scene.add(camera);

//         // Tạo ánh sáng
//         const light = new THREE.PointLight(0xffffff, 1, 100);
//         light.position.set(10, 10, 10);
//         scene.add(light);

//         // Tạo vật thể
//         const textureLoader = new THREE.TextureLoader();
//         const texture = textureLoader.load(
//           "https://s3-us-west-2.amazonaws.com/s.cdpn.io/68819/3d_space_5.jpg"
//         );
//         texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
//         texture.repeat.set(10, 2);

//         const material = new THREE.MeshBasicMaterial({ map: texture });
//         const geometry = new THREE.SphereGeometry(50, 32, 32);
//         const mesh = new THREE.Mesh(geometry, material);
//         scene.add(mesh);

//         // Hiệu ứng Bloom
//         const composer = new EffectComposer(renderer);
//         const renderPass = new RenderPass(scene, camera);
//         composer.addPass(renderPass);

//         const bloomPass = new UnrealBloomPass(
//           new THREE.Vector2(width, height),
//           1.5,
//           0.4,
//           0.85
//         );
//         composer.addPass(bloomPass);

//         // Đợi .scrollTarget tồn tại trước khi chạy GSAP
//         setTimeout(() => {
//           if (document.querySelector(".scrollTarget")) {
//             gsap.to(camera.position, {
//               z: 100,
//               scrollTrigger: {
//                 trigger: ".scrollTarget",
//                 start: "top top",
//                 end: "bottom bottom",
//                 scrub: true,
//               },
//             });
//           }
//         }, 100);

//         // Vòng lặp render
//         const animate = () => {
//           requestAnimationFrame(animate);
//           mesh.rotation.x += 0.01;
//           mesh.rotation.y += 0.01;
//           composer.render();
//         };
//         animate();

//         // Cleanup khi unmount component
//         return () => {
//           mountRef.current?.removeChild(renderer.domElement);
//           renderer.dispose();
//         };
//       } catch (err) {
//         console.error("Lỗi import module Three.js:", err);
//       }
//     })();
//   }, [isClient]);

//   return (
//     <>
//       {/* Three.js Scene */}
//       <div
//         ref={mountRef}
//         className="experience fixed top-0 left-0 w-full h-screen z-10"
//       />

//       {/* Scroll Target để kích hoạt ScrollTrigger */}
//       <div className="scrollTarget absolute top-0 w-[100px] h-[300vh] z-0"></div>

//       {/* Hiệu ứng Vignette */}
//       <div className="vignette-radial fixed inset-0 z-20 pointer-events-none">
//         <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black"></div>
//       </div>
//     </>
//   );
// }
