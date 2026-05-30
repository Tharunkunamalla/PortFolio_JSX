import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, Stars, PointerLockControls } from "@react-three/drei";
import { Code, Monitor } from "lucide-react";
import ImageWithSkeleton from "../ui/ImageWithSkeleton";
import * as THREE from "three";
import toast from "react-hot-toast";

const CameraController = () => {
  const { camera } = useThree();
  const [keys, setKeys] = useState({ w: false, a: false, s: false, d: false, q: false, e: false });
  const speed = 0.2;

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (keys.hasOwnProperty(key)) setKeys((k) => ({ ...k, [key]: true }));
    };
    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      if (keys.hasOwnProperty(key)) setKeys((k) => ({ ...k, [key]: false }));
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame(() => {
    // Basic translation along world axes for simplicity, or camera local axes
    // We will use local axes so if we ever add rotation, it works.
    const dir = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion).normalize();
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion).normalize();
    
    // Flatten movement to XZ plane if you want FPS-like strict ground movement
    dir.y = 0; dir.normalize();
    right.y = 0; right.normalize();

    if (keys.w) camera.position.add(dir.clone().multiplyScalar(speed));
    if (keys.s) camera.position.sub(dir.clone().multiplyScalar(speed));
    if (keys.a) camera.position.sub(right.clone().multiplyScalar(speed));
    if (keys.d) camera.position.add(right.clone().multiplyScalar(speed));
    if (keys.q) camera.position.y += speed;
    if (keys.e) camera.position.y -= speed;
  });

  return null;
};

const ProjectCard = ({ project, position, rotation }) => {
  const handleLiveClick = (liveLink) => {
    if (!liveLink) {
      toast.error("Live preview will be updated soon... Stay Tuned!😉");
      return;
    }
    window.open(liveLink, "_blank", "noopener noreferrer");
  };

  return (
    <group position={position} rotation={rotation}>
      <Html
        transform
        occlude="blending"
        className="w-[280px] sm:w-[340px] select-none"
      >
        <div className="bg-[#12121a]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-3.5 shadow-2xl flex flex-col gap-3.5 text-white">
          <div className="relative w-full h-[160px] rounded-xl overflow-hidden border border-white/5">
            <ImageWithSkeleton
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div>
            <h3 className="text-lg font-bold font-heading mb-2">{project.title}</h3>
            <p className="text-xs sm:text-sm text-gray-400 line-clamp-3">{project.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 text-[10px] font-medium bg-black/40 border border-white/5 rounded-full text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-3 mt-2">
            <button
              onClick={() => handleLiveClick(project.liveLink)}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-[11px] font-medium"
            >
              <Monitor className="w-4 h-4" /> Live Preview
            </button>
            <a
              href={project.codeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-black/40 hover:bg-black/60 border border-transparent hover:border-white/10 transition-colors text-[11px] font-medium"
            >
              <Code className="w-4 h-4" /> Code
            </a>
          </div>
        </div>
      </Html>
    </group>
  );
};

const Projects3D = ({ projects }) => {
  return (
    <div className="w-full h-[100dvh] bg-[#0c0c10] overflow-hidden relative cursor-crosshair">
      <Canvas camera={{ position: [0, 0.5, 9], fov: 50 }}>
        <color attach="background" args={["#0c0c10"]} />
        <ambientLight intensity={0.5} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <CameraController />
        <PointerLockControls />

        {/* 3D Title "PROJECTS" */}
        <group position={[0, 16, -52]} scale={2.2}>
          <Html transform center className="pointer-events-none select-none">
            <h1 className="text-[10rem] font-black text-white/90 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] font-heading tracking-tighter mix-blend-overlay">
              PROJECTS
            </h1>
          </Html>
        </group>

        {/* Instructional Card */}
        <group position={[0, -0.5, -12]}>
          <Html transform center className="pointer-events-none">
            <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-3xl p-6 text-center text-white shadow-2xl w-[360px]">
              <h2 className="text-xl font-bold mb-5">Welcome to 3D Mode.</h2>
              <p className="text-base mb-4 text-secondary-400">Click anywhere to look around (Mouse)</p>
              <h3 className="text-lg font-semibold mb-4 text-secondary-400">Keyboard Controls:</h3>
              <div className="space-y-2.5 text-base font-mono mb-4">
                <p>W A S D - Move around</p>
                <p>Q / E - Move up / down</p>
              </div>
              <p className="text-xs text-gray-400">Press ESC to show cursor and interact</p>
            </div>
          </Html>
        </group>

        {/* Project Cards arranged in a wide semicircle/curve */}
        {projects.map((project, index) => {
          // Calculate a curved position
          const total = projects.length;
          // Span from -PI/2 to PI/2
          const angle = (index / Math.max(1, total - 1)) * Math.PI - Math.PI / 2;
          const radius = 30;
          
          const x = Math.sin(angle) * radius;
          const z = -Math.cos(angle) * radius - 24; // Push cards farther back for a calmer scene
          const y = (index % 2 === 0 ? 0.5 : -0.5) * 2; // Keep a subtle stagger
          
          // Rotate to face the center/origin roughly
          const rotY = -angle;

          return (
            <ProjectCard 
              key={project.id} 
              project={project} 
              position={[x, y, z]} 
              rotation={[0, rotY, 0]} 
            />
          );
        })}
      </Canvas>
    </div>
  );
};

export default Projects3D;
