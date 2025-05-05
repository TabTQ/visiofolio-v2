'use client';

import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
// Removed Tone.js import as it's not used in this basic setup
// import * as Tone from 'tone';

export const ThreeScene: FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0); // Match light gray background

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // Basic geometry
    const geometry = new THREE.IcosahedronGeometry(1, 0); // Use Icosahedron for a more complex shape
    const material = new THREE.MeshStandardMaterial({
        color: 0x008080, // Teal accent color
        metalness: 0.3,
        roughness: 0.6,
     }); // Use MeshStandardMaterial for better lighting effects
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Softer ambient light
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.9); // Brighter point light
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      cube.rotation.x += 0.005;
      cube.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    animate();

     // Handle resize
    const handleResize = () => {
      if (!currentMount) return;
      const width = currentMount.clientWidth;
      const height = currentMount.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);


    // Cleanup function
    cleanupRef.current = () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      // Check if renderer.domElement is still a child before removing
      if (currentMount && renderer.domElement.parentNode === currentMount) {
         currentMount.removeChild(renderer.domElement);
      }
       // Dispose THREE.js objects
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      // scene.dispose() // Scene doesn't have dispose method
    };


    // Call cleanup when component unmounts
    return () => {
       cleanupRef.current();
    }

  }, []); // Empty dependency array ensures this runs only once on mount

  return <div ref={mountRef} className="w-full h-full" />;
};
