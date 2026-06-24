import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ThreeCharacterScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const mouse = useRef({ x: 0, y: 0 });
  const mouseTarget = useRef({ x: 0, y: 0 });

  // Animatable proxy for GSAP ScrollTrigger targeting
  const animProxy = useRef({
    x: window.innerWidth < 1024 ? 0 : 2.0,
    y: window.innerWidth < 1024 ? 0 : -0.2,
    z: 0,
    rotX: 0,
    rotY: -Math.PI / 4,
    rotZ: 0,
    scale: 1.0
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const isMobile = window.innerWidth < 1024 || 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const pixelRatio = isMobile ? 1 : Math.min(window.devicePixelRatio, 2);

    const scene = new THREE.Scene();
    
    // Set up camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    // Set up renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(pixelRatio);
    renderer.shadowMap.enabled = true;

    // Cinematic lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    // Dynamic warm gold/brass directional light from top-right
    const goldLight = new THREE.DirectionalLight(0xc5a059, 5.0);
    goldLight.position.set(6, 4, 3);
    scene.add(goldLight);

    // Dynamic terracotta/copper directional light from bottom-left
    const copperLight = new THREE.DirectionalLight(0xc2592a, 5.0);
    copperLight.position.set(-6, -4, 3);
    scene.add(copperLight);

    // Warm white rim backlight for silhouette highlights
    const rimLight = new THREE.DirectionalLight(0xfff5e6, 5.5);
    rimLight.position.set(0, 5, -6);
    scene.add(rimLight);

    let wrapperGroup: THREE.Group | null = null;
    const scrollTriggers: ScrollTrigger[] = [];

    // Load AntiqueCamera model from Khronos Group glTF repository
    const loader = new GLTFLoader();
    const modelUrl = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/AntiqueCamera/glTF-Binary/AntiqueCamera.glb';

    loader.load(
      modelUrl,
      (gltf) => {
        const loadedModel = gltf.scene;

        // Auto-scale and Center the model
        const box = new THREE.Box3().setFromObject(loadedModel);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        
        // Target height/dimension of 2.6 units
        const scaleFactor = 2.6 / maxDim;
        loadedModel.scale.set(scaleFactor, scaleFactor, scaleFactor);

        // Center loadedModel geometries around local pivot
        const center = box.getCenter(new THREE.Vector3());
        loadedModel.position.set(
          -center.x * scaleFactor,
          -center.y * scaleFactor,
          -center.z * scaleFactor
        );

        // Create a wrapper group for easy placement, rotation and animations
        wrapperGroup = new THREE.Group();
        wrapperGroup.add(loadedModel);

        // Initial setup for wrapper group matching animProxy
        wrapperGroup.position.set(animProxy.current.x, animProxy.current.y, animProxy.current.z);
        wrapperGroup.rotation.set(animProxy.current.rotX, animProxy.current.rotY, animProxy.current.rotZ);
        wrapperGroup.scale.set(animProxy.current.scale, animProxy.current.scale, animProxy.current.scale);

        // Traversal to apply shadows and refine PBR material reflections
        loadedModel.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            
            // Keep original detailed textures (brass, metal, wood) but tune reflectivity
            if (child.material) {
              child.material.roughness = Math.max(0.08, child.material.roughness * 0.65);
              child.material.metalness = Math.min(1.0, child.material.metalness * 1.35);
            }
          }
        });

        scene.add(wrapperGroup);
        setIsLoaded(true);

        // --- Wire GSAP ScrollTriggers after model loads successfully ---

        // 1. Transition: Hero to About
        const st1 = ScrollTrigger.create({
          trigger: '#about',
          start: 'top bottom',
          end: 'top center',
          scrub: 1.0,
          onUpdate: (self) => {
            const p = self.progress;
            animProxy.current.x = THREE.MathUtils.lerp(isMobile ? 0 : 2.0, isMobile ? 0 : 1.8, p);
            animProxy.current.y = THREE.MathUtils.lerp(isMobile ? 0 : -0.2, isMobile ? -0.2 : -0.3, p);
            animProxy.current.z = THREE.MathUtils.lerp(0, -0.5, p);
            animProxy.current.rotY = THREE.MathUtils.lerp(-Math.PI / 4, -Math.PI / 6, p);
            animProxy.current.rotX = THREE.MathUtils.lerp(0, 0.1, p);
            animProxy.current.scale = THREE.MathUtils.lerp(1.0, isMobile ? 0.7 : 0.85, p);
          }
        });
        scrollTriggers.push(st1);

        // 2. Transition: About to Latest Arrivals
        const st2 = ScrollTrigger.create({
          trigger: '#latest',
          start: 'top bottom',
          end: 'top center',
          scrub: 1.0,
          onUpdate: (self) => {
            const p = self.progress;
            animProxy.current.x = THREE.MathUtils.lerp(isMobile ? 0 : 1.8, isMobile ? 0 : 2.0, p);
            animProxy.current.y = THREE.MathUtils.lerp(isMobile ? -0.2 : -0.3, isMobile ? -0.3 : 0, p);
            animProxy.current.z = THREE.MathUtils.lerp(-0.5, -0.8, p);
            animProxy.current.rotY = THREE.MathUtils.lerp(-Math.PI / 6, -Math.PI / 2, p);
            animProxy.current.rotX = THREE.MathUtils.lerp(0.1, 0, p);
            animProxy.current.scale = THREE.MathUtils.lerp(isMobile ? 0.7 : 0.85, isMobile ? 0.6 : 0.75, p);
          }
        });
        scrollTriggers.push(st2);

        // 3. Transition: Latest Arrivals to Works Bento
        const st3 = ScrollTrigger.create({
          trigger: '#works',
          start: 'top bottom',
          end: 'top center',
          scrub: 1.0,
          onUpdate: (self) => {
            const p = self.progress;
            animProxy.current.x = THREE.MathUtils.lerp(isMobile ? 0 : 2.0, 0, p);
            animProxy.current.y = THREE.MathUtils.lerp(isMobile ? -0.3 : 0, isMobile ? -0.4 : -0.6, p);
            animProxy.current.z = THREE.MathUtils.lerp(-0.8, -1.4, p);
            animProxy.current.rotY = THREE.MathUtils.lerp(-Math.PI / 2, Math.PI / 3, p);
            animProxy.current.rotX = THREE.MathUtils.lerp(0, 0.2, p);
            animProxy.current.scale = THREE.MathUtils.lerp(isMobile ? 0.6 : 0.75, isMobile ? 0.45 : 0.55, p);
          }
        });
        scrollTriggers.push(st3);

        // 4. Transition: Works to Skills (Ticking Core Competencies)
        const st4 = ScrollTrigger.create({
          trigger: '#skills',
          start: 'top bottom',
          end: 'top center',
          scrub: 1.0,
          onUpdate: (self) => {
            const p = self.progress;
            animProxy.current.x = THREE.MathUtils.lerp(0, 0, p);
            animProxy.current.y = THREE.MathUtils.lerp(isMobile ? -0.4 : -0.6, isMobile ? 0.1 : 0.2, p);
            animProxy.current.z = THREE.MathUtils.lerp(-1.4, 0, p);
            animProxy.current.rotY = THREE.MathUtils.lerp(Math.PI / 3, Math.PI * 2, p); // 360 spin
            animProxy.current.rotX = THREE.MathUtils.lerp(0.2, 0.15, p);
            animProxy.current.scale = THREE.MathUtils.lerp(isMobile ? 0.45 : 0.55, isMobile ? 0.75 : 0.95, p);
          }
        });
        scrollTriggers.push(st4);

        // 5. Transition: Skills to Contact Page
        const st5 = ScrollTrigger.create({
          trigger: '#contact',
          start: 'top bottom',
          end: 'top center',
          scrub: 1.0,
          onUpdate: (self) => {
            const p = self.progress;
            animProxy.current.x = THREE.MathUtils.lerp(0, isMobile ? 0 : 1.9, p);
            animProxy.current.y = THREE.MathUtils.lerp(isMobile ? 0.1 : 0.2, isMobile ? -0.2 : -0.3, p);
            animProxy.current.z = THREE.MathUtils.lerp(0, -0.2, p);
            animProxy.current.rotY = THREE.MathUtils.lerp(Math.PI * 2, -Math.PI / 5, p);
            animProxy.current.rotX = THREE.MathUtils.lerp(0.15, 0, p);
            animProxy.current.scale = THREE.MathUtils.lerp(isMobile ? 0.75 : 0.95, isMobile ? 0.8 : 0.95, p);
          }
        });
        scrollTriggers.push(st5);
      },
      (xhr) => {
        if (xhr.total > 0) {
          const progress = Math.round((xhr.loaded / xhr.total) * 100);
          setLoadingProgress(progress);
        }
      },
      (error) => {
        console.error('Error loading AntiqueCamera model:', error);
      }
    );

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseTarget.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseTarget.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Lerp mouse positions for smooth tracking drift
      mouse.current.x += (mouseTarget.current.x - mouse.current.x) * 0.05;
      mouse.current.y += (mouseTarget.current.y - mouse.current.y) * 0.05;

      if (wrapperGroup) {
        // Floating/bobbing motion
        const bob = Math.sin(elapsedTime * 1.3) * 0.12;

        // Apply baseline animated by GSAP ScrollTrigger + bobbing
        wrapperGroup.position.x = animProxy.current.x;
        wrapperGroup.position.y = animProxy.current.y + bob;
        wrapperGroup.position.z = animProxy.current.z;

        // Interactive mouse look-at tilt (rotates the camera object slightly based on cursor)
        wrapperGroup.rotation.x = animProxy.current.rotX + mouse.current.y * 0.25;
        wrapperGroup.rotation.y = animProxy.current.rotY + mouse.current.x * 0.5;
        wrapperGroup.rotation.z = animProxy.current.rotZ;

        // Apply scale
        wrapperGroup.scale.set(
          animProxy.current.scale,
          animProxy.current.scale,
          animProxy.current.scale
        );
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      
      // Clean up all ScrollTriggers to prevent memory leaks
      scrollTriggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block bg-transparent"
        style={{
          // Fade in canvas once loaded to avoid pop-in
          opacity: isLoaded ? 0.75 : 0,
          transition: 'opacity 1.5s ease-in-out',
        }}
      />
      {!isLoaded && (
        <div className="fixed right-12 bottom-12 text-[10px] font-mono tracking-widest text-[#c5a059] animate-pulse pointer-events-none z-50">
          CALIBRATING 3D SYSTEM ({loadingProgress}%)
        </div>
      )}
    </div>
  );
};
