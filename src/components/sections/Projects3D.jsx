import React, {useState, useEffect, useRef} from "react";
import {Canvas, useFrame, useThree} from "@react-three/fiber";
import {Html, Stars, PointerLockControls} from "@react-three/drei";
import {Code, Monitor} from "lucide-react";
import ImageWithSkeleton from "../ui/ImageWithSkeleton";
import * as THREE from "three";
import toast from "react-hot-toast";

const CameraController = () => {
  const {camera} = useThree();
  const [keys, setKeys] = useState({
    w: false,
    a: false,
    s: false,
    d: false,
    q: false,
    e: false,
  });
  const velocity = useRef(new THREE.Vector3());
  const speed = 0.4; // Base target speed
  const damping = 0.05; // How fast it lerps to target

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (keys.hasOwnProperty(key)) setKeys((k) => ({...k, [key]: true}));
    };
    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      if (keys.hasOwnProperty(key)) setKeys((k) => ({...k, [key]: false}));
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame(() => {
    const dir = new THREE.Vector3(0, 0, -1)
      .applyQuaternion(camera.quaternion)
      .normalize();
    const right = new THREE.Vector3(1, 0, 0)
      .applyQuaternion(camera.quaternion)
      .normalize();

    dir.y = 0;
    dir.normalize();
    right.y = 0;
    right.normalize();

    const targetVelocity = new THREE.Vector3();

    if (keys.w) targetVelocity.add(dir.clone().multiplyScalar(speed));
    if (keys.s) targetVelocity.sub(dir.clone().multiplyScalar(speed));
    if (keys.a) targetVelocity.sub(right.clone().multiplyScalar(speed));
    if (keys.d) targetVelocity.add(right.clone().multiplyScalar(speed));
    if (keys.q) targetVelocity.y += speed;
    if (keys.e) targetVelocity.y -= speed;

    // Smoothly interpolate current velocity towards target velocity
    velocity.current.lerp(targetVelocity, damping);
    camera.position.add(velocity.current);
  });

  return null;
};

const ProjectCard = ({project, position, rotation}) => {
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
        <div className="bg-[#12121a]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-3.5 shadow-[0_0_30px_rgba(255,255,255,0.05)] flex flex-col gap-3.5 text-white hover:border-white/30 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] transition-all duration-500">
          <div className="relative w-full h-[160px] rounded-xl overflow-hidden border border-white/5">
            <ImageWithSkeleton
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div>
            <h3 className="text-lg font-bold font-heading mb-2">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 line-clamp-3">
              {project.description}
            </p>
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
  const meshRefFire = useRef();
  const meshRefWhite = useRef();
  const globalTimer = useRef(0);

  // Create geometries with RGBA vertex colors for fading tails
  const {fireGeo, whiteGeo} = React.useMemo(() => {
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
      geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 4));
      return geo;
    };

    return {
      fireGeo: createGeo([1, 1, 1, 1], [1, 1, 1, 0]), // Force white-only particles
      whiteGeo: createGeo([1, 1, 1, 1], [1, 1, 1, 0]), // Pure White fading out
    };
  }, []);

  const cometsData = useRef(
    Array.from({length: count}, () => ({
      active: false,
      type: Math.floor(Math.random() * 2),
      pos: new THREE.Vector3(),
      vel: new THREE.Vector3(),
      scaleZ: 1,
    })),
  ).current;

  useFrame((state, delta) => {
    if (!meshRefFire.current || !meshRefWhite.current) return;

    globalTimer.current -= delta;
    if (globalTimer.current <= 0) {
      const inactiveComet = cometsData.find((c) => !c.active);
      if (inactiveComet) {
        inactiveComet.active = true;
        inactiveComet.type = Math.floor(Math.random() * 2); // 0 = Fire, 1 = White

        // Spawn on a sphere radius 120 around the center
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const radius = 120;

        inactiveComet.pos.set(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi) - 20,
        );

        // Velocity directed towards the center region roughly
        const targetX = (Math.random() - 0.5) * 60;
        const targetY = (Math.random() - 0.5) * 60;
        const targetZ = (Math.random() - 0.5) * 60 - 20;

        const dir = new THREE.Vector3(targetX, targetY, targetZ)
          .sub(inactiveComet.pos)
          .normalize();
        const speed = Math.random() * 20 + 30; // 30 to 50 units per second (medium speed)
        inactiveComet.vel.copy(dir).multiplyScalar(speed);
        inactiveComet.scaleZ = Math.random() * 8 + 6; // Trail length adjusted for slower speed
      }
      globalTimer.current = Math.random() * 1.5 + 0.3; // Spawn a new comet every 0.3 to 1.8 seconds
    }

    // Reset all matrices to hidden state
    dummy.position.set(0, -1000, 0);
    dummy.scale.set(0, 0, 0);
    dummy.updateMatrix();
    for (let i = 0; i < count; i++) {
      meshRefFire.current.setMatrixAt(i, dummy.matrix);
      meshRefWhite.current.setMatrixAt(i, dummy.matrix);
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
          meshRefFire.current.setMatrixAt(i, dummy.matrix);
        } else {
          meshRefWhite.current.setMatrixAt(i, dummy.matrix);
        }

        // Deactivate if it goes too far
        if (comet.pos.length() > 200) {
          comet.active = false;
        }
      }
    });

    meshRefFire.current.instanceMatrix.needsUpdate = true;
    meshRefWhite.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={meshRefFire} args={[fireGeo, null, count]}>
        <meshBasicMaterial
          vertexColors
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </instancedMesh>
      <instancedMesh ref={meshRefWhite} args={[whiteGeo, null, count]}>
        <meshBasicMaterial
          vertexColors
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </instancedMesh>
    </>
  );
};

const Projects3D = ({projects}) => {
  const [controlsEnabled, setControlsEnabled] = useState(true);
  const [nebulaActive, setNebulaActive] = useState(false);
  const [cyberGridActive, setCyberGridActive] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);

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
      <Canvas camera={{position: [0, 0.5, 9], fov: 50}}>
        {nebulaActive ? (
          <fog attach="fog" args={["#150722", 15, 70]} />
        ) : (
          <fog attach="fog" args={["#0c0c10", 20, 80]} />
        )}
        {nebulaActive ? (
          <color attach="background" args={["#0a0410"]} />
        ) : (
          <color attach="background" args={["#0c0c10"]} />
        )}
        <ambientLight intensity={nebulaActive ? 0.35 : 0.5} />
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        <Comets />

        {nebulaActive && (
          <>
            <pointLight position={[0, 10, -30]} color="#d946ef" intensity={5} distance={100} />
            <pointLight position={[30, -5, -40]} color="#0ea5e9" intensity={8} distance={100} />
            <pointLight position={[-30, -5, -40]} color="#a855f7" intensity={8} distance={100} />
          </>
        )}

        {cyberGridActive && (
          <gridHelper
            args={[300, 100, "#d946ef", "#0ea5e9"]}
            position={[0, -6, -30]}
          />
        )}

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

        {/* Instructional Card (Welcome board with 3D Controls) */}
        <group position={[0, -0.5, -12]}>
          <Html transform center className="select-none">
            {!showMoreOptions ? (
              <div
                className="bg-black/50 backdrop-blur-lg border border-white/15 rounded-3xl p-6 text-center text-white shadow-2xl w-[360px] pointer-events-auto transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
                onPointerDown={(e) => e.stopPropagation()}
              >
                <h2 className="text-xl font-bold mb-4 font-heading">Welcome to 3D Mode.</h2>
                <p className="text-sm mb-4 text-secondary-400 font-medium">
                  Click anywhere to look around (Mouse)
                </p>
                
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-3 border-b border-white/10 pb-1 flex items-center justify-center">
                  Keyboard Controls
                </h3>
                <div className="space-y-1 text-xs font-mono mb-5 text-gray-300">
                  <p>W A S D - Move around</p>
                  <p>Q / E - Move up / down</p>
                </div>

                <div className="text-[10px] text-gray-400/90 border-t border-white/10 pt-3.5 mb-4">
                  Scroll down to exit (reveal the black hole).
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMoreOptions(true);
                  }}
                  className="px-4 py-2 text-xs font-bold bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300 pointer-events-auto w-full text-secondary-400 hover:text-white"
                >
                  More Options...
                </button>
              </div>
            ) : (
              <div
                className="bg-black/50 backdrop-blur-lg border border-white/15 rounded-3xl p-6 text-center text-white shadow-2xl w-[360px] pointer-events-auto transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
                onPointerDown={(e) => e.stopPropagation()}
              >
                <h2 className="text-xl font-bold mb-4 font-heading">3D Settings</h2>
                
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-4 border-b border-white/10 pb-1 flex items-center justify-center">
                  Scene Controls
                </h3>
                <div className="space-y-3.5 mb-5 pl-2 pr-2">
                  {/* Nebula Glow Toggle */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-gray-300">Nebula Glow</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setNebulaActive(!nebulaActive);
                      }}
                      className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors duration-300 pointer-events-auto ${
                        nebulaActive ? "bg-secondary-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" : "bg-gray-700"
                      }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                          nebulaActive ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Cyber Grid Toggle */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-gray-300">Cyber Grid</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCyberGridActive(!cyberGridActive);
                      }}
                      className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors duration-300 pointer-events-auto ${
                        cyberGridActive ? "bg-primary-500 shadow-[0_0_10px_rgba(14,165,233,0.5)]" : "bg-gray-700"
                      }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                          cyberGridActive ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="text-[10px] text-gray-400/90 border-t border-white/10 pt-3.5 mb-4 leading-relaxed">
                  Press <kbd className="px-1.5 py-0.5 bg-white/10 rounded font-mono text-[9px]">ESC</kbd> to unlock cursor & toggle settings.
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMoreOptions(false);
                  }}
                  className="px-4 py-2 text-xs font-bold bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300 pointer-events-auto w-full text-secondary-400 hover:text-white"
                >
                  Back to Help
                </button>
              </div>
            )}
          </Html>
        </group>

        {/* Project Cards arranged in a wide semicircle/curve */}
        {projects.map((project, index) => {
          // Calculate a curved position
          const total = projects.length;
          // Span from -PI/2 to PI/2
          const angle =
            (index / Math.max(1, total - 1)) * Math.PI - Math.PI / 2;
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
