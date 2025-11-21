import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import { useState } from "react";

interface CADModelProps {
  isHovered: boolean;
  viewMode: "solid" | "wireframe";
}

const CADModel = ({ isHovered, viewMode }: CADModelProps) => {
  const explodeDistance = isHovered ? 2 : 0;
  const wireframe = viewMode === "wireframe";

  return (
    <group>
      {/* Flywheel (bottom) */}
      <group position={[0, -1.5 - explodeDistance * 0.5, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[2.2, 2.2, 0.6, 32]} />
          <meshStandardMaterial
            color="#1e1e1e"
            metalness={0.9}
            roughness={0.1}
            wireframe={wireframe}
          />
        </mesh>
        {/* Flywheel center hole */}
        <mesh>
          <cylinderGeometry args={[0.6, 0.6, 0.7, 32]} />
          <meshStandardMaterial
            color="#333333"
            metalness={0.8}
            roughness={0.2}
            wireframe={wireframe}
          />
        </mesh>
        {/* Flywheel bolt holes */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const radian = (angle * Math.PI) / 180;
          const x = Math.cos(radian) * 1.7;
          const z = Math.sin(radian) * 1.7;
          return (
            <mesh key={i} position={[x, 0, z]}>
              <cylinderGeometry args={[0.12, 0.12, 0.7, 16]} />
              <meshStandardMaterial color="#555555" metalness={0.7} roughness={0.3} wireframe={wireframe} />
            </mesh>
          );
        })}
      </group>

      {/* Clutch Disk (friction plate) */}
      <group position={[0, -0.3 - explodeDistance * 0.3, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[1.8, 1.8, 0.15, 32]} />
          <meshStandardMaterial
            color="#ea5c2a"
            metalness={0.6}
            roughness={0.4}
            wireframe={wireframe}
          />
        </mesh>
        {/* Friction material ring */}
        <mesh position={[0, 0.08, 0]}>
          <torusGeometry args={[1.5, 0.15, 16, 32]} />
          <meshStandardMaterial
            color="#8B4513"
            metalness={0.2}
            roughness={0.8}
            wireframe={wireframe}
          />
        </mesh>
        {/* Center spline hub */}
        <mesh>
          <cylinderGeometry args={[0.5, 0.5, 0.3, 16]} />
          <meshStandardMaterial
            color="#666666"
            metalness={0.8}
            roughness={0.2}
            wireframe={wireframe}
          />
        </mesh>
      </group>

      {/* Pressure Plate */}
      <group position={[0, 0.5 + explodeDistance * 0.3, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[2, 2, 0.4, 32]} />
          <meshStandardMaterial
            color="#1e1e1e"
            metalness={0.85}
            roughness={0.15}
            wireframe={wireframe}
          />
        </mesh>
        {/* Pressure plate center */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[1.6, 1.6, 0.2, 32]} />
          <meshStandardMaterial
            color="#ea5c2a"
            metalness={0.7}
            roughness={0.3}
            wireframe={wireframe}
          />
        </mesh>
      </group>

      {/* Diaphragm Spring Fingers */}
      <group position={[0, 0.8 + explodeDistance * 0.4, 0]}>
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
          const radian = (angle * Math.PI) / 180;
          const x = Math.cos(radian) * 0.8;
          const z = Math.sin(radian) * 0.8;
          return (
            <mesh key={i} position={[x, 0, z]} rotation={[0, radian, 0]}>
              <boxGeometry args={[0.15, 0.08, 0.6]} />
              <meshStandardMaterial
                color="#ea5c2a"
                metalness={0.85}
                roughness={0.2}
                wireframe={wireframe}
              />
            </mesh>
          );
        })}
        {/* Center pivot ring */}
        <mesh>
          <torusGeometry args={[0.7, 0.08, 16, 32]} />
          <meshStandardMaterial
            color="#ea5c2a"
            metalness={0.9}
            roughness={0.1}
            wireframe={wireframe}
          />
        </mesh>
      </group>

      {/* Cover (top) */}
      <group position={[0, 1.5 + explodeDistance * 0.5, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[2.2, 2.2, 0.3, 32]} />
          <meshStandardMaterial
            color="#1e1e1e"
            metalness={0.9}
            roughness={0.1}
            wireframe={wireframe}
          />
        </mesh>
        {/* Cover bolt holes */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const radian = (angle * Math.PI) / 180;
          const x = Math.cos(radian) * 1.7;
          const z = Math.sin(radian) * 1.7;
          return (
            <mesh key={i} position={[x, 0, z]}>
              <cylinderGeometry args={[0.12, 0.12, 0.4, 16]} />
              <meshStandardMaterial color="#555555" metalness={0.7} roughness={0.3} wireframe={wireframe} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
};

export const CADModelViewer = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [viewMode, setViewMode] = useState<"solid" | "wireframe">("solid");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="w-full h-full relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* View Mode Controls */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <button
          onClick={() => setViewMode("solid")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            viewMode === "solid"
              ? "bg-primary text-primary-foreground shadow-lg"
              : "bg-background/80 text-foreground hover:bg-background backdrop-blur-sm border border-border"
          }`}
        >
          Solid
        </button>
        <button
          onClick={() => setViewMode("wireframe")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            viewMode === "wireframe"
              ? "bg-primary text-primary-foreground shadow-lg"
              : "bg-background/80 text-foreground hover:bg-background backdrop-blur-sm border border-border"
          }`}
        >
          Wireframe
        </button>
      </div>

      {/* Hover Hint */}
      {!isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 bg-background/80 backdrop-blur-sm rounded-lg border border-border text-sm text-foreground"
        >
          Hover to explode view
        </motion.div>
      )}

      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[6, 4, 6]} fov={50} />
        
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-10, -10, -5]} intensity={0.6} color="#ea5c2a" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          castShadow
        />

        {/* Environment for reflections */}
        <Environment preset="studio" />

        {/* CAD Model */}
        <CADModel isHovered={isHovered} viewMode={viewMode} />

        {/* Grid floor */}
        <gridHelper args={[20, 20, "#ea5c2a", "#1e1e1e"]} position={[0, -4, 0]} />

        {/* Controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1.5}
          minDistance={5}
          maxDistance={18}
        />
      </Canvas>
    </motion.div>
  );
};
