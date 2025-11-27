import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Grid, GizmoHelper, GizmoViewport, PerspectiveCamera, useGLTF, Center, Sky, ContactShadows } from '@react-three/drei';
import { Box, Eye, Download, Settings, Trash2, Copy, Move, RotateCw, Maximize2, Sun, Circle, Triangle, Square, Upload, Camera, Zap, Grid3x3, Layers } from 'lucide-react';
import * as THREE from 'three';
import './Viewerss.css';

// ==================== TYPES ====================

interface Scene3DObject {
  id: string;
  type: 'cube' | 'sphere' | 'cylinder' | 'cone' | 'torus' | 'plane' | 'imported';
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: string;
  name: string;
  visible: boolean;
  modelUrl?: string;
  material: {
    color: string;
    metalness: number;
    roughness: number;
    wireframe: boolean;
    transparent: boolean;
    opacity: number;
  };
}

type CameraView = 'perspective' | 'top' | 'front' | 'right' | 'left' | 'back' | 'bottom' | 'isometric';

// ==================== CAMERA CONTROLLER ====================

const CameraController = ({ view }: { view: CameraView }) => {
  const { camera } = useThree();
  const zoomRef = React.useRef(15);
  
  React.useEffect(() => {
    const positions: Record<CameraView, [number, number, number]> = {
      perspective: [5, 5, 5],
      top: [0, 15, 0.1],
      bottom: [0, -15, 0.1],
      front: [0, 0, 15],
      back: [0, 0, -15],
      right: [15, 0, 0],
      left: [-15, 0, 0],
      isometric: [10, 10, 10]
    };

    const currentDist = camera.position.distanceTo(new THREE.Vector3(0, 0, 0));
    if (currentDist > 1) {
      zoomRef.current = currentDist;
    }

    const dir = new THREE.Vector3(...positions[view]).normalize();
    const newPos = dir.multiplyScalar(zoomRef.current);
    
    camera.position.copy(newPos);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [view, camera]);

  return null;
};

// ==================== LOADING FALLBACK ====================

const LoadingBox = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="#FF8A00" wireframe />
  </mesh>
);

// ==================== IMPORTED MODEL COMPONENT ====================

const ImportedModel = ({ url, position, rotation, scale, onSelect, wireframe }: any) => {
  const { scene } = useGLTF(url, true) as any;
  
  React.useEffect(() => {
    if (scene) {
      scene.traverse((child: any) => {
        if (child.isMesh) {
          if (child.material) {
            child.material.wireframe = wireframe;
            child.material.needsUpdate = true;
          }
        }
      });
    }
  }, [scene, wireframe]);
  
  return (
    <Center onClick={(e) => { e.stopPropagation(); onSelect(); }}>
      <primitive 
        object={scene.clone()} 
        position={position}
        rotation={rotation}
        scale={scale}
      />
    </Center>
  );
};

// ==================== 3D OBJECT COMPONENT ====================

const SceneObject = ({ obj, onSelect }: { obj: Scene3DObject; onSelect: () => void }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  if (obj.type === 'imported' && obj.modelUrl) {
    return (
      <Suspense fallback={<LoadingBox />}>
        <ImportedModel 
          url={obj.modelUrl}
          position={obj.position}
          rotation={obj.rotation}
          scale={obj.scale}
          onSelect={onSelect}
          wireframe={obj.material.wireframe}
        />
      </Suspense>
    );
  }

  const geometry = () => {
    switch (obj.type) {
      case 'cube':
        return <boxGeometry args={[1, 1, 1]} />;
      case 'sphere':
        return <sphereGeometry args={[0.5, 32, 32]} />;
    //   case 'cylinder':
        // return ylinderGeometry args={[0.5, 0.5, 1, 32]} />;
    //   case 'cone':
        // return eGeometry args={[0.5, 1, 32]} />;
      case 'torus':
        return <torusGeometry args={[0.5, 0.2, 16, 100]} />;
      case 'plane':
        return <planeGeometry args={[2, 2]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };

  return (
    <mesh
      ref={meshRef}
      position={obj.position}
      rotation={obj.rotation}
      scale={obj.scale}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      visible={obj.visible}
      castShadow
      receiveShadow
    >
      {geometry()}
      <meshStandardMaterial
        color={obj.material.color}
        metalness={obj.material.metalness}
        roughness={obj.material.roughness}
        wireframe={obj.material.wireframe}
        transparent={obj.material.transparent}
        opacity={obj.material.opacity}
      />
    </mesh>
  );
};

// ==================== MAIN VIEWER COMPONENT ====================

const Viewerss = () => {
  const [objects, setObjects] = useState<Scene3DObject[]>([]);
  const [selectedObject, setSelectedObject] = useState<string | null>(null);
  const [cameraView, setCameraView] = useState<CameraView>('perspective');
  const [rotationSpeed, setRotationSpeed] = useState<number>(2);
  const [autoRotate, setAutoRotate] = useState<boolean>(false);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [showShadows, setShowShadows] = useState<boolean>(true);
  const [showSky, setShowSky] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addObject = (type: Scene3DObject['type']) => {
    const obj: Scene3DObject = {
      id: `${type}-${Date.now()}`,
      type,
      position: [Math.random() * 4 - 2, 0, Math.random() * 4 - 2],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      color: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)}`,
      visible: true,
      material: {
        color: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`,
        metalness: 0.3,
        roughness: 0.7,
        wireframe: false,
        transparent: false,
        opacity: 1
      }
    };
    setObjects([...objects, obj]);
    setSelectedObject(obj.id);
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const obj: Scene3DObject = {
      id: `imported-${Date.now()}`,
      type: 'imported',
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [0.5, 0.5, 0.5],
      color: '#ffffff',
      name: file.name.substring(0, 20),
      visible: true,
      modelUrl: url,
      material: {
        color: '#ffffff',
        metalness: 0.5,
        roughness: 0.5,
        wireframe: false,
        transparent: false,
        opacity: 1
      }
    };
    setObjects([...objects, obj]);
    setSelectedObject(obj.id);
  };

  const deleteObject = (id: string) => {
    setObjects(objects.filter(obj => obj.id !== id));
    if (selectedObject === id) setSelectedObject(null);
  };

  const duplicateObject = (id: string) => {
    const obj = objects.find(o => o.id === id);
    if (obj) {
      const newObj = {
        ...obj,
        id: `${obj.type}-${Date.now()}`,
        name: `${obj.name} Copy`,
        position: [obj.position[0] + 1, obj.position[1], obj.position[2] + 1] as [number, number, number],
        material: { ...obj.material }
      };
      setObjects([...objects, newObj]);
    }
  };

  const toggleWireframeSelected = () => {
    if (!selectedObject) return;
    setObjects(objects.map(obj => 
      obj.id === selectedObject 
        ? { ...obj, material: { ...obj.material, wireframe: !obj.material.wireframe } }
        : obj
    ));
  };

  const selectedObj = objects.find(obj => obj.id === selectedObject);

  return (
    <div className="viewer-container">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".glb,.gltf"
        style={{ display: 'none' }}
        onChange={handleFileImport}
      />

      {/* Header */}
      <header className="viewer-header">
        <div className="viewer-header-content">
          <div className="viewer-logo">
            <Box className="viewer-logo-icon" size={28} />
            <h1 className="viewer-logo-text">3D Viewer Pro</h1>
          </div>
          <div className="viewer-header-actions">
            <button 
              className={`viewer-btn-icon ${autoRotate ? 'active' : ''}`}
              onClick={() => setAutoRotate(!autoRotate)}
              title="Auto Rotate"
            >
              <Zap size={20} />
            </button>
            <button 
              className={`viewer-btn-icon ${selectedObj?.material.wireframe ? 'active' : ''}`}
              onClick={toggleWireframeSelected}
              title="Wireframe Mode (Selected)"
              disabled={!selectedObject}
              style={{ opacity: selectedObject ? 1 : 0.5 }}
            >
              <Grid3x3 size={20} />
            </button>
            <button 
              className={`viewer-btn-icon ${showSky ? 'active' : ''}`}
              onClick={() => setShowSky(!showSky)}
              title="Toggle Sky"
            >
              <Sun size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Camera Views Bar - ALWAYS VISIBLE */}
      <div className="viewer-camera-bar" style={{
        display: 'flex',
        gap: '8px',
        padding: '12px 20px',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        borderBottom: '1px solid rgba(255, 138, 0, 0.2)',
        overflowX: 'auto',
        flexWrap: 'wrap'
      }}>
        <button 
          className={`viewer-toolbar-btn ${cameraView === 'perspective' ? 'active' : ''}`} 
          onClick={() => setCameraView('perspective')}
          style={{ minWidth: '100px', padding: '8px 12px' }}
        >
          🎥 Perspective
        </button>
        <button 
          className={`viewer-toolbar-btn ${cameraView === 'isometric' ? 'active' : ''}`} 
          onClick={() => setCameraView('isometric')}
          style={{ minWidth: '100px', padding: '8px 12px' }}
        >
          📐 Isometric
        </button>
        <button 
          className={`viewer-toolbar-btn ${cameraView === 'top' ? 'active' : ''}`} 
          onClick={() => setCameraView('top')}
          style={{ minWidth: '80px', padding: '8px 12px' }}
        >
          ⬇️ Top
        </button>
        <button 
          className={`viewer-toolbar-btn ${cameraView === 'bottom' ? 'active' : ''}`} 
          onClick={() => setCameraView('bottom')}
          style={{ minWidth: '80px', padding: '8px 12px' }}
        >
          ⬆️ Bottom
        </button>
        <button 
          className={`viewer-toolbar-btn ${cameraView === 'front' ? 'active' : ''}`} 
          onClick={() => setCameraView('front')}
          style={{ minWidth: '80px', padding: '8px 12px' }}
        >
          👁️ Front
        </button>
        <button 
          className={`viewer-toolbar-btn ${cameraView === 'back' ? 'active' : ''}`} 
          onClick={() => setCameraView('back')}
          style={{ minWidth: '80px', padding: '8px 12px' }}
        >
          👤 Back
        </button>
        <button 
          className={`viewer-toolbar-btn ${cameraView === 'right' ? 'active' : ''}`} 
          onClick={() => setCameraView('right')}
          style={{ minWidth: '80px', padding: '8px 12px' }}
        >
          ➡️ Right
        </button>
        <button 
          className={`viewer-toolbar-btn ${cameraView === 'left' ? 'active' : ''}`} 
          onClick={() => setCameraView('left')}
          style={{ minWidth: '80px', padding: '8px 12px' }}
        >
          ⬅️ Left
        </button>
      </div>

      {/* Quick Toolbar */}
      <div className="viewer-toolbar">
        <div className="viewer-toolbar-section">
          <span className="viewer-toolbar-label">Add Object:</span>
          <button className="viewer-toolbar-btn" onClick={() => addObject('cube')} title="Add Cube">
            <Box size={18} />
          </button>
          <button className="viewer-toolbar-btn" onClick={() => addObject('sphere')} title="Add Sphere">
            <Circle size={18} />
          </button>
          <button className="viewer-toolbar-btn" onClick={() => addObject('cylinder')} title="Add Cylinder">
            <Box size={18} />
          </button>
          <button className="viewer-toolbar-btn" onClick={() => addObject('cone')} title="Add Cone">
            <Triangle size={18} />
          </button>
          <button className="viewer-toolbar-btn" onClick={() => addObject('torus')} title="Add Torus">
            <Circle size={18} />
          </button>
          <button className="viewer-toolbar-btn" onClick={() => fileInputRef.current?.click()} title="Import GLB/GLTF Model">
            <Upload size={18} />
          </button>
        </div>

        <div className="viewer-toolbar-section">
          <span className="viewer-toolbar-label">Speed:</span>
          <input
            type="range"
            min="0.5"
            max="10"
            step="0.5"
            value={rotationSpeed}
            onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
            style={{ width: '100px' }}
          />
          <span style={{ fontSize: '12px', color: '#FF8A00' }}>{rotationSpeed.toFixed(1)}x</span>
        </div>

        <div className="viewer-toolbar-section">
          <button className={`viewer-toolbar-btn ${showGrid ? 'active' : ''}`} onClick={() => setShowGrid(!showGrid)} title="Toggle Grid">
            <Grid3x3 size={18} />
          </button>
          <button className={`viewer-toolbar-btn ${showShadows ? 'active' : ''}`} onClick={() => setShowShadows(!showShadows)} title="Toggle Shadows">
            <Layers size={18} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="viewer-main-content">
        {/* Sidebar - Object List */}
        <div className="viewer-sidebar-left">
          <div className="viewer-panel-header">
            <Eye size={16} />
            <h3>Objects ({objects.length})</h3>
          </div>
          <div className="viewer-hierarchy-list">
            {objects.length === 0 ? (
              <div className="viewer-empty-state">
                <p>No objects</p>
                <small>Click + to add</small>
              </div>
            ) : (
              objects.map(obj => (
                <div
                  key={obj.id}
                  className={`viewer-hierarchy-item ${selectedObject === obj.id ? 'selected' : ''}`}
                  onClick={() => setSelectedObject(obj.id)}
                >
                  <div className="viewer-hierarchy-content">
                    <span className="viewer-hierarchy-icon">
                      {obj.type === 'imported' ? '📦' : '🔷'}
                    </span>
                    <span className="viewer-hierarchy-name">
                      {obj.name}
                      {obj.material.wireframe && ' 🔲'}
                    </span>
                  </div>
                  <div className="viewer-hierarchy-actions">
                    <button className="viewer-icon-btn" onClick={(e) => { e.stopPropagation(); duplicateObject(obj.id); }} title="Duplicate">
                      <Copy size={14} />
                    </button>
                    <button className="viewer-icon-btn delete" onClick={(e) => { e.stopPropagation(); deleteObject(obj.id); }} title="Delete">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 3D Canvas */}
        <div className="viewer-canvas-container">
          <Canvas shadows={showShadows} dpr={[1, 2]} performance={{ min: 0.5 }}>
            <CameraController view={cameraView} />
            
            {/* Sky */}
            {showSky && <Sky sunPosition={[100, 20, 100]} />}
            
            {/* Lights */}
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow shadow-mapSize={[1024, 1024]} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />

            {/* Grid */}
            {showGrid && <Grid args={[20, 20]} cellSize={1} cellColor="#444" sectionColor="#666" fadeDistance={50} />}
            
            {/* Contact Shadows */}
            {showShadows && <ContactShadows position={[0, -0.5, 0]} opacity={0.4} scale={20} blur={2} far={4} />}

            {/* Objects */}
            <Suspense fallback={<LoadingBox />}>
              {objects.map(obj => (
                <SceneObject
                  key={obj.id}
                  obj={obj}
                  onSelect={() => setSelectedObject(obj.id)}
                />
              ))}
            </Suspense>

            {/* Controls */}
            <OrbitControls 
              makeDefault 
              autoRotate={autoRotate}
              autoRotateSpeed={rotationSpeed}
              enableDamping
              dampingFactor={0.05}
              minDistance={2}
              maxDistance={50}
            />
            
            {/* Gizmo */}
            <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
              <GizmoViewport labelColor="white" axisHeadScale={1} />
            </GizmoHelper>
          </Canvas>

          {/* Canvas Info */}
          <div className="viewer-canvas-info">
            <div className="viewer-info-item">📦 {objects.length}</div>
            <div className="viewer-info-item">📷 {cameraView}</div>
            <div className="viewer-info-item">⚡ {autoRotate ? 'ON' : 'OFF'}</div>
            <div className="viewer-info-item">
              {selectedObj ? `Selected: ${selectedObj.name} ${selectedObj.material.wireframe ? '🔲' : ''}` : 'No selection'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewerss;
