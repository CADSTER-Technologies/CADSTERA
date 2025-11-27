import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles, Rocket, Flame, Zap, Star, Play, Pause, RotateCcw,
  Download, Settings, Palette, Clock, Eye, EyeOff,
  Save, Upload, Volume2, VolumeX, Wind, Thermometer,
  Target, Gauge, AlertTriangle, Video, FileJson, Camera,
  Code, Timer, Plus, Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function CrackerVision() {
  // Playback State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(60);
  
  // Visual Controls
  const [showGrid, setShowGrid] = useState(true);
  const [showAxes, setShowAxes] = useState(true);
  const [showTrajectory, setShowTrajectory] = useState(false);
  const [showSafetyZone, setShowSafetyZone] = useState(true);
  const [cameraAngle, setCameraAngle] = useState([45]);
  const [zoom, setZoom] = useState([50]);
  
  // Firework Parameters
  const [fireworkType, setFireworkType] = useState("burst");
  const [fireworkColor, setFireworkColor] = useState("#FF8A00");
  const [secondaryColor, setSecondaryColor] = useState("#FFB000");
  const [explosionSize, setExplosionSize] = useState([50]);
  const [particleCount, setParticleCount] = useState([100]);
  const [explosionSpeed, setExplosionSpeed] = useState([5]);
  const [launchHeight, setLaunchHeight] = useState([100]);
  const [launchAngle, setLaunchAngle] = useState([90]);
  
  // Environmental Factors
  const [windSpeed, setWindSpeed] = useState([0]);
  const [windDirection, setWindDirection] = useState([0]);
  const [temperature, setTemperature] = useState([20]);
  const [humidity, setHumidity] = useState([50]);
  
  // Safety & Physics
  const [safetyDistance, setSafetyDistance] = useState([50]);
  const [gravity, setGravity] = useState([9.8]);
  const [airResistance, setAirResistance] = useState([0.5]);
  
  // Audio
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [volume, setVolume] = useState([70]);
  
  // Project
  const [projectName, setProjectName] = useState("Untitled Display");
  const [explosionCount] = useState(0);
  const [fps] = useState(60);

  const [timeline] = useState([
    { time: 0, type: "burst", color: "#FF8A00" },
    { time: 2, type: "fountain", color: "#00FF8A" },
    { time: 5, type: "spiral", color: "#8A00FF" },
  ]);

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleReset = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleExportVideo = () => alert("Exporting video in 4K...");
  const handleExportJSON = () => {
    const config = {
      projectName,
      fireworkType,
      colors: { primary: fireworkColor, secondary: secondaryColor },
      physics: { size: explosionSize[0], particles: particleCount[0], speed: explosionSpeed[0] },
      environment: { wind: windSpeed[0], temp: temperature[0], humidity: humidity[0] },
      timeline
    };
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName}.json`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-[#0a0300] text-white">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#FF6A00]/6 to-transparent" />
      </div>

      <div className="relative z-10 px-4 md:px-8 lg:px-12 py-6">
        {/* Top Bar */}
        <div className="max-w-[1800px] mx-auto mb-6">
          <div className="flex items-center justify-between bg-[#0f0600]/80 border border-[#FF6A00] rounded-xl p-4">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-[#FF8A00]/20 border border-[#FF8A00]">
                <Sparkles className="w-6 h-6 text-[#FF8A00]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#FF8A00]">🎆 Cracker Vision Pro</h1>
                <p className="text-xs text-gray-400">Professional Fireworks Design Tool</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Input
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-48 bg-[#1a0800] border-[#FF6A00] text-white"
                placeholder="Project name"
              />
              <Button variant="outline" className="border-[#FF6A00] text-[#FFB770]" size="sm">
                <Save className="w-4 h-4 mr-2" />Save
              </Button>
              <Button variant="outline" className="border-[#FF6A00] text-[#FFB770]" size="sm">
                <Upload className="w-4 h-4 mr-2" />Load
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-[1800px] mx-auto grid lg:grid-cols-12 gap-6">
          {/* Left Panel */}
          <div className="lg:col-span-3 space-y-4">
            <Card className="bg-[#0f0600]/80 border-[#FF6A00]">
              <CardHeader>
                <CardTitle className="text-[#FF8A00] text-sm flex items-center gap-2">
                  <Settings className="w-4 h-4" />Playback
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Button onClick={handlePlayPause} className={`flex-1 ${isPlaying ? "bg-[#FF8A00]" : "bg-gray-700"} text-black`}>
                    {isPlaying ? <><Pause className="w-4 h-4 mr-2" />Pause</> : <><Play className="w-4 h-4 mr-2" />Play</>}
                  </Button>
                  <Button onClick={handleReset} variant="outline" className="border-[#FF6A00] text-[#FFB770]">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{currentTime}s</span>
                    <span>{duration}s</span>
                  </div>
                  <Slider value={[currentTime]} onValueChange={(val) => setCurrentTime(val[0])} min={0} max={duration} step={0.1} />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-xs text-gray-400">Audio</Label>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setAudioEnabled(!audioEnabled)} className="text-[#FFB770]">
                      {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    </Button>
                    {audioEnabled && <Slider value={volume} onValueChange={setVolume} min={0} max={100} className="w-20" />}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#0f0600]/80 border-[#FF6A00]">
              <CardHeader>
                <CardTitle className="text-[#FF8A00] text-sm">Firework Design</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-[#1a0800]">
                    <TabsTrigger value="basic" className="text-xs">Basic</TabsTrigger>
                    <TabsTrigger value="physics" className="text-xs">Physics</TabsTrigger>
                    <TabsTrigger value="env" className="text-xs">Env</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label className="text-xs text-[#FFB770]"><Rocket className="w-3 h-3 inline mr-1" />Type</Label>
                      <Select value={fireworkType} onValueChange={setFireworkType}>
                        <SelectTrigger className="bg-[#1a0800] border-[#FF6A00] text-white text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a0800] border-[#FF6A00]">
                          <SelectItem value="burst">Burst</SelectItem>
                          <SelectItem value="fountain">Fountain</SelectItem>
                          <SelectItem value="spiral">Spiral</SelectItem>
                          <SelectItem value="palm">Palm</SelectItem>
                          <SelectItem value="willow">Willow</SelectItem>
                          <SelectItem value="chrysanthemum">Chrysanthemum</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs text-[#FFB770]"><Palette className="w-3 h-3 inline mr-1" />Primary</Label>
                      <div className="flex gap-2">
                        <input type="color" value={fireworkColor} onChange={(e) => setFireworkColor(e.target.value)} className="w-full h-8 rounded border-2 border-[#FF6A00]" />
                        <div className="w-8 h-8 rounded border-2 border-[#FF6A00]" style={{ backgroundColor: fireworkColor }} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs text-[#FFB770]">Secondary</Label>
                      <div className="flex gap-2">
                        <input type="color" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} className="w-full h-8 rounded border-2 border-[#FF6A00]" />
                        <div className="w-8 h-8 rounded border-2 border-[#FF6A00]" style={{ backgroundColor: secondaryColor }} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs text-[#FFB770] flex justify-between">
                        <span><Star className="w-3 h-3 inline mr-1" />Size</span>
                        <span className="text-[#FF8A00]">{explosionSize[0]}m</span>
                      </Label>
                      <Slider value={explosionSize} onValueChange={setExplosionSize} min={10} max={200} step={5} />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs text-[#FFB770] flex justify-between">
                        <span><Sparkles className="w-3 h-3 inline mr-1" />Particles</span>
                        <span className="text-[#FF8A00]">{particleCount[0]}</span>
                      </Label>
                      <Slider value={particleCount} onValueChange={setParticleCount} min={50} max={1000} step={10} />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs text-[#FFB770] flex justify-between">
                        <span><Zap className="w-3 h-3 inline mr-1" />Speed</span>
                        <span className="text-[#FF8A00]">{explosionSpeed[0]}m/s</span>
                      </Label>
                      <Slider value={explosionSpeed} onValueChange={setExplosionSpeed} min={1} max={50} step={1} />
                    </div>
                  </TabsContent>

                  <TabsContent value="physics" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label className="text-xs text-[#FFB770] flex justify-between">
                        <span><Rocket className="w-3 h-3 inline mr-1" />Height</span>
                        <span className="text-[#FF8A00]">{launchHeight[0]}m</span>
                      </Label>
                      <Slider value={launchHeight} onValueChange={setLaunchHeight} min={10} max={300} step={5} />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs text-[#FFB770] flex justify-between">
                        <span><Target className="w-3 h-3 inline mr-1" />Angle</span>
                        <span className="text-[#FF8A00]">{launchAngle[0]}°</span>
                      </Label>
                      <Slider value={launchAngle} onValueChange={setLaunchAngle} min={0} max={90} step={1} />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs text-[#FFB770] flex justify-between">
                        <span><Gauge className="w-3 h-3 inline mr-1" />Gravity</span>
                        <span className="text-[#FF8A00]">{gravity[0]}m/s²</span>
                      </Label>
                      <Slider value={gravity} onValueChange={setGravity} min={5} max={15} step={0.1} />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs text-[#FFB770] flex justify-between">
                        <span><AlertTriangle className="w-3 h-3 inline mr-1" />Safety</span>
                        <span className="text-[#FF8A00]">{safetyDistance[0]}m</span>
                      </Label>
                      <Slider value={safetyDistance} onValueChange={setSafetyDistance} min={10} max={200} step={5} />
                    </div>
                  </TabsContent>

                  <TabsContent value="env" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label className="text-xs text-[#FFB770] flex justify-between">
                        <span><Wind className="w-3 h-3 inline mr-1" />Wind</span>
                        <span className="text-[#FF8A00]">{windSpeed[0]}km/h</span>
                      </Label>
                      <Slider value={windSpeed} onValueChange={setWindSpeed} min={0} max={50} step={1} />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs text-[#FFB770] flex justify-between">
                        <span>Direction</span>
                        <span className="text-[#FF8A00]">{windDirection[0]}°</span>
                      </Label>
                      <Slider value={windDirection} onValueChange={setWindDirection} min={0} max={360} step={1} />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs text-[#FFB770] flex justify-between">
                        <span><Thermometer className="w-3 h-3 inline mr-1" />Temp</span>
                        <span className="text-[#FF8A00]">{temperature[0]}°C</span>
                      </Label>
                      <Slider value={temperature} onValueChange={setTemperature} min={-20} max={50} step={1} />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs text-[#FFB770] flex justify-between">
                        <span>Humidity</span>
                        <span className="text-[#FF8A00]">{humidity[0]}%</span>
                      </Label>
                      <Slider value={humidity} onValueChange={setHumidity} min={0} max={100} step={1} />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Center Canvas */}
          <div className="lg:col-span-6 space-y-4">
            <Card className="bg-[#0f0600]/80 border-[#FF6A00]">
              <CardContent className="p-4">
                <div className="relative w-full aspect-video bg-gradient-to-b from-[#0a0300] to-[#1a0800] rounded-lg border border-[#FF6A00]/30 flex items-center justify-center overflow-hidden">
                  <div className="text-center space-y-4 z-10">
                    <Flame className="w-24 h-24 text-[#FF8A00] mx-auto animate-pulse" />
                    <p className="text-gray-400 font-semibold">3D Fireworks Canvas</p>
                    <div className="flex gap-4 justify-center text-xs text-gray-500">
                      <span>Type: <span className="text-[#FF8A00]">{fireworkType}</span></span>
                      <span>|</span>
                      <span>Height: <span className="text-[#FF8A00]">{launchHeight[0]}m</span></span>
                      <span>|</span>
                      <span>Particles: <span className="text-[#FF8A00]">{particleCount[0]}</span></span>
                    </div>
                    {isPlaying && <div className="text-[#FF8A00] font-bold text-lg animate-pulse">🎆 SIMULATING...</div>}
                  </div>

                  {showGrid && (
                    <div className="absolute inset-0 pointer-events-none opacity-10">
                      <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(#FF8A00 1px, transparent 1px), linear-gradient(90deg, #FF8A00 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                    </div>
                  )}

                  {showSafetyZone && (
                    <div className="absolute bottom-4 left-4 right-4 h-2 bg-red-500/30 border border-red-500 rounded">
                      <div className="text-[10px] text-red-400 absolute -top-4">Safety Zone: {safetyDistance[0]}m</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="bg-[#0f0600]/80 border-[#FF6A00]">
              <CardHeader className="pb-3">
                <CardTitle className="text-[#FF8A00] text-sm flex items-center justify-between">
                  <span className="flex items-center gap-2"><Timer className="w-4 h-4" />Timeline</span>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" className="h-7 px-2 text-[#FFB770]"><Plus className="w-3 h-3" /></Button>
                    <Button size="sm" variant="ghost" className="h-7 px-2 text-[#FFB770]"><Trash2 className="w-3 h-3" /></Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="relative h-24 bg-[#1a0800] rounded border border-[#FF6A00]/30">
                  <div className="absolute top-0 left-0 right-0 h-6 border-b border-[#FF6A00]/30 flex items-center px-2 text-[10px] text-gray-500">
                    {Array.from({ length: duration / 5 + 1 }, (_, i) => <div key={i} style={{ width: '100px' }}>{i * 5}s</div>)}
                  </div>
                  <div className="absolute top-6 left-0 right-0 bottom-0 p-2">
                    {timeline.map((item, idx) => (
                      <div key={idx} className="absolute h-12 bg-[#FF8A00]/20 border border-[#FF8A00] rounded px-2 py-1" style={{ left: `${(item.time / duration) * 100}%`, width: '60px' }}>
                        <div className="text-[10px] font-semibold text-[#FFB770]">{item.type}</div>
                        <div className="w-4 h-4 rounded border border-white/30 mt-1" style={{ backgroundColor: item.color }} />
                      </div>
                    ))}
                  </div>
                  <div className="absolute top-0 bottom-0 w-0.5 bg-[#FF8A00]" style={{ left: `${(currentTime / duration) * 100}%` }}>
                    <div className="absolute -top-1 -left-1.5 w-3 h-3 bg-[#FF8A00] rotate-45" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-3 space-y-4">
            <Card className="bg-[#0f0600]/80 border-[#FF6A00]">
              <CardHeader className="pb-3">
                <CardTitle className="text-[#FF8A00] text-sm flex items-center gap-2"><Clock className="w-4 h-4" />Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-400">Duration</span><span className="text-[#FFB770]">{currentTime.toFixed(1)}s / {duration}s</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Explosions</span><span className="text-[#FFB770]">{explosionCount}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Particles</span><span className="text-[#FFB770]">{particleCount[0] * timeline.length}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">FPS</span><span className="text-[#FFB770]">{fps}</span></div>
              </CardContent>
            </Card>

            <Card className="bg-[#0f0600]/80 border-[#FF6A00]">
              <CardHeader className="pb-3">
                <CardTitle className="text-[#FF8A00] text-sm">View</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-gray-400">Grid</Label>
                  <Switch checked={showGrid} onCheckedChange={setShowGrid} />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-gray-400">Axes</Label>
                  <Switch checked={showAxes} onCheckedChange={setShowAxes} />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-gray-400">Trajectory</Label>
                  <Switch checked={showTrajectory} onCheckedChange={setShowTrajectory} />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-gray-400">Safety</Label>
                  <Switch checked={showSafetyZone} onCheckedChange={setShowSafetyZone} />
                </div>
                <Separator className="bg-[#FF6A00]/20" />
                <div className="space-y-2">
                  <Label className="text-xs text-gray-400 flex justify-between"><span>Camera</span><span className="text-[#FF8A00]">{cameraAngle[0]}°</span></Label>
                  <Slider value={cameraAngle} onValueChange={setCameraAngle} min={0} max={180} step={5} />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-gray-400 flex justify-between"><span>Zoom</span><span className="text-[#FF8A00]">{zoom[0]}%</span></Label>
                  <Slider value={zoom} onValueChange={setZoom} min={10} max={200} step={5} />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#0f0600]/80 border-[#FF6A00]">
              <CardHeader className="pb-3">
                <CardTitle className="text-[#FF8A00] text-sm">Export</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button onClick={handleExportVideo} variant="outline" className="w-full border-[#FF6A00] text-[#FFB770] text-xs" size="sm">
                  <Video className="w-3 h-3 mr-2" />Export Video
                </Button>
                <Button onClick={handleExportJSON} variant="outline" className="w-full border-[#FF6A00] text-[#FFB770] text-xs" size="sm">
                  <FileJson className="w-3 h-3 mr-2" />Export JSON
                </Button>
                <Button variant="outline" className="w-full border-[#FF6A00] text-[#FFB770] text-xs" size="sm">
                  <Camera className="w-3 h-3 mr-2" />Screenshot
                </Button>
                <Button variant="outline" className="w-full border-[#FF6A00] text-[#FFB770] text-xs" size="sm">
                  <Code className="w-3 h-3 mr-2" />Generate Code
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-[#0f0600]/80 border-[#FF6A00]">
              <CardHeader className="pb-3">
                <CardTitle className="text-[#FF8A00] text-sm">Presets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {[
                  { name: "🎆 New Year", colors: ["#FFD700", "#FF4500"] },
                  { name: "🎉 Celebration", colors: ["#FF1493", "#00CED1"] },
                  { name: "💐 Diwali", colors: ["#FF8A00", "#FFB000"] },
                  { name: "🎊 Festival", colors: ["#9370DB", "#32CD32"] },
                ].map((preset) => (
                  <Button key={preset.name} variant="ghost" className="w-full justify-start text-gray-300 hover:text-[#FF8A00] text-xs h-8">
                    <span className="flex-1 text-left">{preset.name}</span>
                    <div className="flex gap-1">
                      {preset.colors.map((color, i) => <div key={i} className="w-3 h-3 rounded-full border border-white/30" style={{ backgroundColor: color }} />)}
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
