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

const Comets = () => {
  const count = 15;
  const dummy = new THREE.Object3D();
  
  const meshRefRed = useRef();
  const meshRefWhite = useRef();
  const meshRefGradient = useRef();
  const globalTimer = useRef(0);
  
  // Create geometries with RGBA vertex colors for fading tails
  const { fireGeo, whiteGeo, gradientGeo } = React.useMemo(() => {
    const createGeo = (frontColor, backColor) => {
      // Increased thickness to 0.25 so white comets don't blend into stars
      const geo = new THREE.BoxGeometry(0.25, 0.25, 1);
      const colors = [];
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        if (pos.getZ(i) > 0) {
          // Front
          colors.push(...frontColor);
        } else {
          // Back (Tail)
          colors.push(...backColor);
        }
      }
      geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 4));
      return geo;
    };
    
    return {
      fireGeo: createGeo([1, 0.9, 0.1, 1], [1, 0.4, 0, 0]), // Fire: Yellow head fading to Orange tail
      whiteGeo: createGeo([1, 1, 1, 1], [1, 1, 1, 0]), // Pure White fading out
      gradientGeo: createGeo([1, 1, 1, 1], [1, 0.5, 0, 0]) // White head fading to Orange tail
    };
  }, []);
  
  const cometsData = useRef(
    Array.from({ length: count }, () => ({
      active: false,
      type: Math.floor(Math.random() * 3),
      pos: new THREE.Vector3(),
      vel: new THREE.Vector3(),
      scaleZ: 1,
    }))
  ).current;

  useFrame((state, delta) => {
    if (!meshRefRed.current || !meshRefWhite.current || !meshRefGradient.current) return;
    
    globalTimer.current -= delta;
    if (globalTimer.current <= 0) {
      const inactiveComet = cometsData.find(c => !c.active);
      if (inactiveComet) {
        inactiveComet.active = true;
        inactiveComet.type = Math.floor(Math.random() * 3); // 0 = Red, 1 = White, 2 = Gradient
        
        // Spawn on a sphere radius 120 around the center
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        const radius = 120;
        
        inactiveComet.pos.set(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi) - 20
        );

        // Velocity directed towards the center region roughly
        const targetX = (Math.random() - 0.5) * 60;
        const targetY = (Math.random() - 0.5) * 60;
        const targetZ = (Math.random() - 0.5) * 60 - 20;

        const dir = new THREE.Vector3(targetX, targetY, targetZ).sub(inactiveComet.pos).normalize();
        const speed = Math.random() * 80 + 60; // 60 to 140 units per second (medium-fast)
        inactiveComet.vel.copy(dir).multiplyScalar(speed);
        inactiveComet.scaleZ = Math.random() * 15 + 10; // Trail length
      }
      globalTimer.current = Math.random() * 1.5 + 0.3; // Spawn a new comet every 0.3 to 1.8 seconds
    }

    // Reset all matrices to hidden state
    dummy.position.set(0, -1000, 0);
    dummy.scale.set(0, 0, 0);
    dummy.updateMatrix();
    for (let i = 0; i < count; i++) {
      meshRefRed.current.setMatrixAt(i, dummy.matrix);
      meshRefWhite.current.setMatrixAt(i, dummy.matrix);
      meshRefGradient.current.setMatrixAt(i, dummy.matrix);
    }

    // Update active comets
    cometsData.forEach((comet, i) => {
      if (comet.active) {
        comet.pos.addScaledVector(comet.vel, delta);
        dummy.position.copy(comet.pos);
        const target = comet.pos.clone().add(comet.vel);
        dummy.lookAt(target);
        dummy.scale.set(1, 1, comet.scaleZ);
        dummy.updateMatrix();
        
        if (comet.type === 0) {
          meshRefRed.current.setMatrixAt(i, dummy.matrix);
        } else if (comet.type === 1) {
          meshRefWhite.current.setMatrixAt(i, dummy.matrix);
        } else {
          meshRefGradient.current.setMatrixAt(i, dummy.matrix);
        }
        
        // Deactivate if it goes too far
        if (comet.pos.length() > 200) {
          comet.active = false;
        }
      }
    });
    
    meshRefRed.current.instanceMatrix.needsUpdate = true;
    meshRefWhite.current.instanceMatrix.needsUpdate = true;
    meshRefGradient.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={meshRefRed} args={[fireGeo, null, count]}>
        <meshBasicMaterial vertexColors transparent opacity={0.9} depthWrite={false} blending={THREE.AdditiveBlending} />
      </instancedMesh>
      <instancedMesh ref={meshRefWhite} args={[whiteGeo, null, count]}>
        <meshBasicMaterial vertexColors transparent opacity={0.9} depthWrite={false} blending={THREE.AdditiveBlending} />
      </instancedMesh>
      <instancedMesh ref={meshRefGradient} args={[gradientGeo, null, count]}>
        <meshBasicMaterial vertexColors transparent opacity={0.9} depthWrite={false} blending={THREE.AdditiveBlending} />
      </instancedMesh>
    </>
  );
};

const Projects3D = ({ projects }) => {
  const [controlsEnabled, setControlsEnabled] = useState(true);

  useEffect(() => {
    const pauseControls = () => setControlsEnabled(false);
    const resumeControls = () => setControlsEnabled(true);

    window.addEventListener("pause-3d-controls", pauseControls);
    window.addEventListener("resume-3d-controls", resumeControls);

    return () => {
      window.removeEventListener("pause-3d-controls", pauseControls);
      window.removeEventListener("resume-3d-controls", resumeControls);
    };
  }, []);

  const handleScenePointerDown = () => {
    window.dispatchEvent(new Event("resume-3d-controls"));
  };

  return (
    <div
      className="w-full h-[100dvh] bg-[#0c0c10] overflow-hidden relative cursor-crosshair"
      onPointerDown={handleScenePointerDown}
    >
      <Canvas camera={{ position: [0, 0.5, 9], fov: 50 }}>
        <color attach="background" args={["#0c0c10"]} />
        <ambientLight intensity={0.5} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Comets />
        
        <CameraController />
        <PointerLockControls enabled={controlsEnabled} />

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
              <p className="text-xs text-gray-400/90 border-t border-white/10 pt-3">
                Scroll down to exit and reveal the black hole below.
              </p>
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
