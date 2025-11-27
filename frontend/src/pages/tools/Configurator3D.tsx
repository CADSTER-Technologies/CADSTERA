import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Palette, RotateCw, Upload, Eye, EyeOff, Camera, RotateCcw,
  Download, FileUp, Trash2, ChevronRight, ChevronLeft, Box,
  Pause, Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
import { OBJExporter } from 'three/addons/exporters/OBJExporter.js';
import { STLExporter } from 'three/addons/exporters/STLExporter.js';

// ==================== UTILITY FUNCTIONS ====================

const downloadFile = (data: ArrayBuffer | string, filename: string, mimeType: string) => {
  const blob = new Blob([data], { type: mimeType });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};

const exportModel = (model: THREE.Object3D, format: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      switch (format.toLowerCase()) {
        case 'glb': {
          const exporter = new GLTFExporter();
          exporter.parse(
            model,
            (result) => {
              downloadFile(result as ArrayBuffer, `model-${Date.now()}.glb`, 'application/octet-stream');
              resolve();
            },
            (error) => reject(error),
            { binary: true }
          );
          break;
        }
        case 'gltf': {
          const exporter = new GLTFExporter();
          exporter.parse(
            model,
            (result) => {
              const output = JSON.stringify(result, null, 2);
              downloadFile(output, `model-${Date.now()}.gltf`, 'application/json');
              resolve();
            },
            (error) => reject(error),
            { binary: false }
          );
          break;
        }
        case 'obj': {
          const exporter = new OBJExporter();
          const objData = exporter.parse(model);
          downloadFile(objData, `model-${Date.now()}.obj`, 'text/plain');
          resolve();
          break;
        }
        case 'stl': {
          const exporter = new STLExporter();
          const stlData = exporter.parse(model);
          downloadFile(stlData, `model-${Date.now()}.stl`, 'text/plain');
          resolve();
          break;
        }
        default:
          reject(new Error(`Unsupported format: ${format}`));
      }
    } catch (error) {
      reject(error as Error);
    }
  });
};

const loadModel = (file: File): Promise<THREE.Object3D> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const loader = new GLTFLoader();
      loader.parse(
        event.target?.result as ArrayBuffer,
        '',
        (gltf) => resolve(gltf.scene),
        (error) => reject(error)
      );
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsArrayBuffer(file);
  });
};

const takeScreenshot = (renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera): Promise<void> => {
  return new Promise((resolve) => {
    renderer.render(scene, camera);
    setTimeout(() => {
      renderer.domElement.toBlob((blob) => {
        if (blob) {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = `screenshot-${Date.now()}.png`;
          link.click();
          URL.revokeObjectURL(link.href);
        }
        resolve();
      });
    }, 100);
  });
};

// ==================== MAIN COMPONENT ====================

const Configurator3D = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState('#FFFFFF');
  const [isWireframe, setIsWireframe] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(0.03);
  const [isPanelExpanded, setIsPanelExpanded] = useState(true);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [currentTexture, setCurrentTexture] = useState<string | null>(null);
  
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const textureLoaderRef = useRef<THREE.TextureLoader>(new THREE.TextureLoader());
  
  const initialSettings = useRef({
    color: new THREE.Color(0xffffff),
    texture: null as THREE.Texture | null
  });

  const colors = [
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Orange', hex: '#FF6B00' },
    { name: 'Black', hex: '#000000' },
    { name: 'Silver', hex: '#C0C0C0' },
    { name: 'Gold', hex: '#FFD700' },
    { name: 'Red', hex: '#FF0000' },
    { name: 'Blue', hex: '#0066FF' },
    { name: 'Green', hex: '#00FF66' },
  ];

  const textures = [
    { id: 'wood', name: 'Wood', preview: '🪵', path: '/logos/wood.jpg' },
    { id: 'metal', name: 'Metal', preview: '⚙️', path: '/logos/metal.jpg' },
    { id: 'fabric', name: 'Fabric', preview: '🧵', path: '/logos/fabric.jpg' },
    { id: 'marble', name: 'Marble', preview: '🪨', path: '/logos/marble.jpg' },
  ];

  // ==================== INITIALIZE ====================
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 3;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance' // ✅ Speed optimization
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // ✅ Limit pixel ratio for performance
    canvasRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    
    // ✅ Stop rotation when user interacts
    controls.addEventListener('start', () => {
      if (isRotating) {
        setIsRotating(false);
      }
    });
    
    controlsRef.current = controls;

    scene.add(camera);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 5);
    scene.add(directionalLight);

    // Load model or create cube
    const loader = new GLTFLoader();
    loader.load(
      '/assets/models/03_Brass_goblets.glb',
      (gltf) => {
        modelRef.current = gltf.scene;
        modelRef.current.scale.set(4, 4, 4);
        const boundingBox = new THREE.Box3().setFromObject(modelRef.current);
        const height = boundingBox.max.y - boundingBox.min.y;
        modelRef.current.position.y = -height / 2;
        scene.add(modelRef.current);
        setIsLoading(false);
      },
      undefined,
      () => {
        // Fallback cube
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshStandardMaterial({ 
          color: 0xffffff,
          roughness: 0.3,
          metalness: 0.7
        });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        modelRef.current = cube;
        setIsLoading(false);
      }
    );

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      
      if (isRotating && modelRef.current) {
        modelRef.current.rotation.y += rotationSpeed;
      }
      
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (rendererRef.current && canvasRef.current) {
        if (rendererRef.current.domElement.parentNode === canvasRef.current) {
          canvasRef.current.removeChild(rendererRef.current.domElement);
        }
      }
      renderer.dispose();
      if (controlsRef.current) {
        controlsRef.current.removeEventListener('start', () => {});
      }
    };
  }, []);

  // ==================== HANDLERS ====================

  const handleColorChange = (colorHex: string) => {
    if (!modelRef.current) return;
    setSelectedColor(colorHex);
    const color = new THREE.Color(colorHex);
    modelRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
        child.material.color.set(color);
        child.material.needsUpdate = true;
      }
    });
    toast.success('Color applied');
  };

  const handleTextureChange = (texturePath: string) => {
    if (!modelRef.current) return;
    textureLoaderRef.current.load(
      texturePath,
      (texture) => {
        setCurrentTexture(texturePath);
        modelRef.current!.traverse((child) => {
          if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
            child.material.map = texture;
            child.material.needsUpdate = true;
          }
        });
        toast.success('Texture applied');
      },
      undefined,
      () => toast.error('Texture not found')
    );
  };

  const handleTextureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !modelRef.current) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const texture = textureLoaderRef.current.load(event.target?.result as string);
      modelRef.current!.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
          child.material.map = texture;
          child.material.needsUpdate = true;
        }
      });
      setCurrentTexture('custom');
      toast.success('Custom texture applied');
    };
    reader.readAsDataURL(file);
  };

  const removeTexture = () => {
    if (!modelRef.current) return;
    modelRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
        child.material.map = null;
        child.material.needsUpdate = true;
      }
    });
    setCurrentTexture(null);
    toast.success('Texture removed');
  };

  const handleReset = () => {
    if (!modelRef.current) return;
    modelRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
        child.material.color.set(initialSettings.current.color);
        child.material.map = initialSettings.current.texture;
        child.material.needsUpdate = true;
      }
    });
    setSelectedColor('#FFFFFF');
    setCurrentTexture(null);
    setIsWireframe(false);
    toast.success('Reset complete');
  };

  const toggleWireframe = () => {
    if (!modelRef.current) return;
    const newState = !isWireframe;
    setIsWireframe(newState);
    modelRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (Array.isArray(child.material)) {
          child.material.forEach(mat => mat.wireframe = newState);
        } else {
          child.material.wireframe = newState;
        }
      }
    });
  };

  const resetView = () => {
    if (!cameraRef.current || !controlsRef.current) return;
    cameraRef.current.position.set(0, 0, 3);
    controlsRef.current.reset();
    toast.success('View reset');
  };

  const handleScreenshot = async () => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;
    try {
      await takeScreenshot(rendererRef.current, sceneRef.current, cameraRef.current);
      toast.success('Screenshot saved');
    } catch {
      toast.error('Screenshot failed');
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const importedModel = await loadModel(file);
      if (modelRef.current && sceneRef.current) {
        sceneRef.current.remove(modelRef.current);
      }
      modelRef.current = importedModel;
      modelRef.current.scale.set(4, 4, 4);
      const boundingBox = new THREE.Box3().setFromObject(modelRef.current);
      const center = boundingBox.getCenter(new THREE.Vector3());
      modelRef.current.position.x = -center.x;
      modelRef.current.position.y = -boundingBox.min.y;
      modelRef.current.position.z = -center.z;
      sceneRef.current?.add(modelRef.current);
      toast.success('Model imported');
    } catch {
      toast.error('Import failed');
    }
  };

  const handleExport = async (format: string) => {
    if (!modelRef.current) {
      toast.error('No model to export');
      return;
    }
    try {
      await exportModel(modelRef.current, format);
      toast.success(`Exported as ${format.toUpperCase()}`);
    } catch {
      toast.error('Export failed');
    }
    setShowExportMenu(false);
  };

  // ==================== RENDER ====================
  return (
    <div className="fixed top-[60px] left-0 right-0 bottom-0 bg-black overflow-hidden">
      {/* Viewport */}
      <div ref={canvasRef} className="w-full h-full">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
            <div className="flex flex-col items-center gap-4">
              <Box className="h-12 w-12 text-orange-500 animate-spin" />
              <div className="text-orange-500 text-xl font-bold">Loading...</div>
            </div>
          </div>
        )}
      </div>

      {/* Right Panel */}
      <AnimatePresence>
        {isPanelExpanded && (
          <motion.div
            initial={{ x: 320 }}
            animate={{ x: 0 }}
            exit={{ x: 320 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute top-4 right-4 w-80 max-h-[calc(100vh-180px)] z-50"
          >
            <Card className="border-2 border-orange-500/30 bg-black/95 backdrop-blur-xl">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-orange-500 flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Customize
                  </h3>
                  <Button size="sm" variant="ghost" onClick={() => setIsPanelExpanded(false)} className="h-8 w-8 p-0">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                <Tabs defaultValue="colors" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-gray-900 mb-4">
                    <TabsTrigger value="colors">Colors</TabsTrigger>
                    <TabsTrigger value="textures">Textures</TabsTrigger>
                  </TabsList>

                  <TabsContent value="colors" className="space-y-4">
                    <div className="grid grid-cols-4 gap-3">
                      {colors.map((color) => (
                        <motion.button
                          key={color.hex}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleColorChange(color.hex)}
                          className={`aspect-square rounded-lg border-2 transition-all ${
                            selectedColor === color.hex 
                              ? 'border-orange-500 shadow-lg shadow-orange-500/50 scale-110' 
                              : 'border-gray-700'
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      ))}
                    </div>
                    <input
                      type="color"
                      value={selectedColor}
                      onChange={(e) => handleColorChange(e.target.value)}
                      className="w-full h-12 rounded-lg border-2 border-orange-500 cursor-pointer"
                    />
                  </TabsContent>

                  <TabsContent value="textures" className="space-y-4 max-h-[350px] overflow-y-auto">
                    <div className="grid grid-cols-2 gap-3">
                      {textures.map((texture) => (
                        <motion.button
                          key={texture.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleTextureChange(texture.path)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            currentTexture === texture.path
                              ? 'border-orange-500 bg-orange-500/20'
                              : 'border-gray-700 bg-gray-800'
                          }`}
                        >
                          <div className="text-3xl mb-2">{texture.preview}</div>
                          <div className="text-sm text-white">{texture.name}</div>
                        </motion.button>
                      ))}
                    </div>

                    <input type="file" accept="image/*" onChange={handleTextureUpload} className="hidden" id="texture-upload" />
                    <Button onClick={() => document.getElementById('texture-upload')?.click()} variant="outline" className="w-full">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Texture
                    </Button>
                    
                    {currentTexture && (
                      <Button onClick={removeTexture} variant="outline" className="w-full">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove Texture
                      </Button>
                    )}

                    <Button onClick={handleReset} variant="outline" className="w-full">
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Reset All
                    </Button>
                  </TabsContent>
                </Tabs>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {!isPanelExpanded && (
        <Button onClick={() => setIsPanelExpanded(true)} className="absolute top-4 right-4 bg-orange-500 z-50" size="sm">
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

      {/* Bottom Toolbar */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/95 backdrop-blur-xl border-t-2 border-orange-500/30 px-4 py-3 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setIsRotating(!isRotating)}
              variant={isRotating ? 'default' : 'outline'}
              size="sm"
              className={isRotating ? 'bg-orange-500' : ''}
            >
              {isRotating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>

            <Button onClick={toggleWireframe} variant={isWireframe ? 'default' : 'outline'} size="sm" className={isWireframe ? 'bg-orange-500' : ''}>
              {isWireframe ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </Button>

            <Button onClick={resetView} variant="outline" size="sm">
              <RotateCcw className="h-4 w-4" />
            </Button>

            <Button onClick={handleScreenshot} variant="outline" size="sm">
              <Camera className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <input type="file" accept=".glb,.gltf" onChange={handleImport} className="hidden" id="model-import" />
            <Button onClick={() => document.getElementById('model-import')?.click()} className="bg-orange-500" size="sm">
              <FileUp className="h-4 w-4 mr-1" />
              Import
            </Button>

            <div className="relative">
              <Button onClick={() => setShowExportMenu(!showExportMenu)} className="bg-orange-500" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>

              {showExportMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-full left-0 mb-2 bg-black/95 border-2 border-orange-500 rounded-lg overflow-hidden"
                >
                  {['GLB', 'GLTF', 'OBJ', 'STL'].map((format) => (
                    <Button 
                      key={format}
                      onClick={() => handleExport(format.toLowerCase())} 
                      size="sm" 
                      variant="ghost" 
                      className="w-full justify-start rounded-none"
                    >
                      {format}
                    </Button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 bg-gray-900 rounded-full px-3 py-1 border border-orange-500/30">
            <span className="text-xs text-gray-400">Speed</span>
            <Slider
              value={[rotationSpeed * 1000]}
              onValueChange={([value]) => setRotationSpeed(value / 1000)}
              min={5}
              max={100}
              step={5}
              className="w-24"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configurator3D;
