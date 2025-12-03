// components/SplineCanvas.tsx

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import SplineLoader from '@splinetool/loader';

export const SplineCanvas = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;
    const initialWidth = container.clientWidth;
    const initialHeight = container.clientHeight;

    // --- CAMERA, SCENE, RENDERER SETUP (Remains the same) ---
    // ... setup code for camera, scene, and renderer ...
    const size = 500;
    const aspect = initialWidth / initialHeight;
    const camera = new THREE.OrthographicCamera(
        size * aspect / -2, size * aspect / 2, size / 2, size / -2, -100000, 100000
    );
    camera.position.set(980.99, 179.96, 196.84);
    camera.quaternion.setFromEuler(new THREE.Euler(-0.64, 1.33, 0.63));
    const initialCameraPosition = camera.position.clone();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#000000');
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(initialWidth, initialHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.setClearAlpha(1);
    
    container.appendChild(renderer.domElement); 

    // --- SPLINE LOADER ---
    const loader = new SplineLoader();
    loader.load(
      'https://prod.spline.design/EGySdZd-ywID67B7/scene.splinecode',
      (splineScene) => {
        scene.add(splineScene);
      }
    );

    // --- FUNCTION DEFINITIONS ---
    
    // 1. SCROLL FIX HANDLER (Simplified: Only prevent the default action)
    const handleScrollFix = (e: WheelEvent) => {
        // This is the core fix: prevent the default behavior (zoom)
        e.preventDefault(); 
    };

    // 2. MOUSE MOVE HANDLER (Parallax)
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    // 3. RESIZE HANDLER
    const onWindowResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      const newAspect = newWidth / newHeight;
      
      camera.left = size * newAspect / - 2;
      camera.right = size * newAspect / 2;
      camera.top = size / 2;
      camera.bottom = size / - 2;
      camera.updateProjectionMatrix();
      
      renderer.setSize(newWidth, newHeight);
    };
    
    // 4. ANIMATION LOOP
    let controls = null; // Defined as null since OrbitControls is removed.

    const animate = () => {
      // Parallax Calculation
      const targetX = initialCameraPosition.x + mouseX * 20;
      const targetY = initialCameraPosition.y + mouseY * 20;

      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (targetY - camera.position.y) * 0.05;
      
      camera.lookAt(scene.position); 

      // If OrbitControls were used, this would be controls.update()
      
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    // --- EVENT LISTENER REGISTRATION ---
    const canvas = renderer.domElement;
    
    // 🔥 FINAL ATTEMPT FIX: Set passive to false to ensure preventDefault() works
    canvas.addEventListener('wheel', handleScrollFix, { passive: false }); 
    
    window.addEventListener('mousemove', onMouseMove); 
    window.addEventListener('resize', onWindowResize); 

    // Start the animation loop
    animate();

    // --- CLEANUP ---
    return () => {
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('wheel', handleScrollFix); // Remove final fix listener
      
      cancelAnimationFrame(animationFrameId);
      
      if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []); // Run only once on mount

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />;
};