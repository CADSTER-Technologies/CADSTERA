import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, Search, X, Download, FileText, Zap, Check,
  AlertCircle, Loader, ArrowRight, Trash2, Settings
} from 'lucide-react';
import './Converterss.css';

// ==================== TYPES ====================

interface FileItem {
  id: string;
  file: File;
  status: 'pending' | 'converting' | 'completed' | 'failed';
  progress: number;
  convertedBlob?: Blob;
}

interface Industry {
  name: string;
  description: string;
  formats: string[];
  bgImage: string;
  fgImage: string;
}

// ==================== CONVERSION FUNCTIONS ====================

const convertImage = async (file: File, targetFormat: string): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          URL.revokeObjectURL(url);
          if (blob) resolve(blob);
          else reject(new Error('Conversion failed'));
        }, `image/${targetFormat}`, 0.95);
      }
    };
    img.onerror = () => reject(new Error('Image load failed'));
    img.src = url;
  });
};

const convertText = async (file: File, targetFormat: string): Promise<Blob> => {
  const text = await file.text();
  let output = '';
  if (targetFormat === 'json') {
    output = JSON.stringify({ content: text, convertedAt: new Date().toISOString() }, null, 2);
  } else if (targetFormat === 'html') {
    output = `<!DOCTYPE html>\n<html>\n<head><meta charset="UTF-8"></head>\n<body><pre>${text}</pre></body>\n</html>`;
  } else if (targetFormat === 'xml') {
    output = `<?xml version="1.0"?>\n<document>\n  tent>${text}</content>\n</document>`;
  } else {
    output = text;
  }
  return new Blob([output], { type: 'text/plain' });
};

const convertCSV = async (file: File, targetFormat: string): Promise<Blob> => {
  const text = await file.text();
  const lines = text.split('\n').filter(line => line.trim());
  const headers = lines[0].split(',').map(h => h.trim());
  
  if (targetFormat === 'json') {
    const data = lines.slice(1).map(line => {
      const values = line.split(',');
      const obj: Record<string, string> = {};
      headers.forEach((header, i) => {
        obj[header] = values[i]?.trim() || '';
      });
      return obj;
    });
    return new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  }
  
  return new Blob([text], { type: 'text/csv' });
};

// ==================== SKELETON COMPONENT ====================

const SkeletonCard = () => (
  <div className="industry-card skeleton-card">
    <div className="card-content">
      <div className="skeleton-title"></div>
      <div className="skeleton-description"></div>
      <div className="skeleton-formats">
        <div className="skeleton-tag"></div>
        <div className="skeleton-tag"></div>
        <div className="skeleton-tag"></div>
      </div>
    </div>
  </div>
);

// ==================== MAIN COMPONENT ====================

const Converter = () => {
  const [view, setView] = useState<'home' | 'converter'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [files, setFiles] = useState<FileItem[]>([]);
  const [selectedFormat, setSelectedFormat] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ✅ ALL 43 INDUSTRIES
  const industries: Record<string, Industry> = {
    textiles: {
      name: 'Textiles',
      description: 'Embroidery & Pattern Files',
      formats: ['DXF', 'PLT', 'PES', 'DST', 'JEF', 'EXP', 'VP3', 'HUS'],
      bgImage: '',
      fgImage: ''
    },
    garments: {
      name: 'Garments',
      description: 'Pattern Making & CAD Files',
      formats: ['DXF', 'AAMA', 'ASTM', 'IBA', 'RUL', 'PAT', 'MDL'],
      bgImage: '',
      fgImage: ''
    },
    oceanFishTech: {
      name: 'Ocean/Fish Tech',
      description: 'Marine Navigation & Oceanographic Data',
      formats: ['GPX', 'KML', 'S57', 'GeoJSON', 'NetCDF', 'HDF5', 'RINEX'],
      bgImage: '',
      fgImage: ''
    },
    satelliteSystems: {
      name: 'Satellite Systems',
      description: 'Orbital & Telemetry Data',
      formats: ['TLE', 'SP3', 'RINEX', 'CCSDS', 'HDF5', 'GeoTIFF', 'NetCDF'],
      bgImage: '',
      fgImage: ''
    },
    defenseSystems: {
      name: 'Defense Systems',
      description: 'Military Standards & Tactical Data',
      formats: ['MIL-STD-2525', 'NITF', 'CADRG', 'ADRG', 'VPF', 'DTED', 'CIB'],
      bgImage: '',
      fgImage: ''
    },
    gaming: {
      name: 'Gaming',
      description: '3D Assets & Game Files',
      formats: ['FBX', 'OBJ', 'GLTF', 'USD', 'COLLADA', 'Unity', 'Unreal', '3DS'],
      bgImage: '',
      fgImage: ''
    },
    solarSystems: {
      name: 'Solar Systems',
      description: 'Solar Design & Simulation',
      formats: ['PVsyst', 'Helioscope', 'SAM', 'PVSol', 'Aurora', 'SketchUp'],
      bgImage: '',
      fgImage: ''
    },
    energySystems: {
      name: 'Energy Systems',
      description: 'Power Grid & Energy Data',
      formats: ['CIM', 'IEC 61850', 'COMTRADE', 'PSSE', 'DIgSILENT', 'PSS/E'],
      bgImage: '',
      fgImage: ''
    },
    film: {
      name: 'Film',
      description: 'Cinema & Post-Production',
      formats: ['MOV', 'MP4', 'AVI', 'ProRes', 'DPX', 'EXR', 'ARRIRAW', 'R3D'],
      bgImage: '',
      fgImage: ''
    },
    artwork: {
      name: 'Artwork',
      description: 'Digital Art & Graphics',
      formats: ['PSD', 'AI', 'SVG', 'EPS', 'TIFF', 'PNG', 'JPEG', 'PDF'],
      bgImage: '',
      fgImage: ''
    },
    fashionDesigning: {
      name: 'Fashion Designing',
      description: '3D Fashion & Textile Design',
      formats: ['CLO', 'MD', 'OBJ', 'FBX', 'DXF', 'AI', 'PSD'],
      bgImage: '',
      fgImage: ''
    },
    interior: {
      name: 'Interior',
      description: 'Interior Design & Visualization',
      formats: ['RVT', 'SKP', 'DWG', 'DXF', '3DS', 'MAX', 'BLEND', 'FBX'],
      bgImage: '',
      fgImage: ''
    },
    chemical: {
      name: 'Chemical',
      description: 'Chemical Structure Files',
      formats: ['MOL', 'SDF', 'PDB', 'CIF', 'XYZ', 'SMILES', 'InChI'],
      bgImage: '',
      fgImage: ''
    },
    powerplants: {
      name: 'Powerplants',
      description: 'Process Engineering Data',
      formats: ['ASPEN', 'HYSYS', 'ProMax', 'AVEVA', 'P&ID', 'PFD'],
      bgImage: '',
      fgImage: ''
    },
    hvac: {
      name: 'HVAC',
      description: 'HVAC Design & Analysis',
      formats: ['HAP', 'TRACE', 'EnergyPlus', 'IDF', 'RVT', 'DWG', 'IFC'],
      bgImage: '',
      fgImage: ''
    },
    securitySystems: {
      name: 'Security Systems',
      description: 'Surveillance & Access Control',
      formats: ['H264', 'H265', 'ONVIF', 'RTSP', 'XML', 'JSON', 'PSIM'],
      bgImage: '',
      fgImage: ''
    },
    iot: {
      name: 'IoT',
      description: 'IoT Protocols & Data',
      formats: ['JSON', 'MQTT', 'CoAP', 'CBOR', 'Protocol Buffers', 'Thrift'],
      bgImage: '',
      fgImage: ''
    },
    safety: {
      name: 'Safety',
      description: 'Safety Analysis Files',
      formats: ['HAZOP', 'FMEA', 'FTA', 'LOPA', 'QRA', 'Bowtie', 'SIL'],
      bgImage: '',
      fgImage: ''
    },
    transport: {
      name: 'Transport',
      description: 'Transportation & Routing',
      formats: ['GTFS', 'OSM', 'Shapefile', 'GeoJSON', 'KML', 'GPX', 'SUMO'],
      bgImage: '',
      fgImage: ''
    },
    plasticRubber: {
      name: 'Plastic/Rubber',
      description: 'Injection Molding & Design',
      formats: ['Moldflow', 'SolidWorks', 'IGES', 'STEP', 'Parasolid', 'STL'],
      bgImage: '',
      fgImage: ''
    },
    recycling: {
      name: 'Recycling',
      description: 'Life Cycle Assessment',
      formats: ['LCA', 'SimaPro', 'GaBi', 'OpenLCA', 'CSV', 'XML'],
      bgImage: '',
      fgImage: ''
    },
    fireworks: {
      name: 'Fireworks',
      description: 'Pyrotechnic Show Design',
      formats: ['FWS', 'XML', 'JSON', 'CSV', 'CAD', 'Pyro'],
      bgImage: '',
      fgImage: ''
    },
    matchWorks: {
      name: 'Match Works',
      description: 'Manufacturing Specs',
      formats: ['DWG', 'DXF', 'STEP', 'IGES', 'PDF', 'CSV'],
      bgImage: '',
      fgImage: ''
    },
    mining: {
      name: 'Mining',
      description: 'Mining & Geological Data',
      formats: ['Surpac', 'Vulcan', 'MineSight', 'Datamine', 'DXF', 'LAS'],
      bgImage: '',
      fgImage: ''
    },
    mechanical: {
      name: 'Mechanical',
      description: 'CAD & Engineering Files',
      formats: ['STEP', 'IGES', 'STL', 'Parasolid', 'ACIS', 'JT', 'Catia'],
      bgImage: '',
      fgImage: ''
    },
    electrical: {
      name: 'Electrical',
      description: 'PCB & Circuit Design',
      formats: ['EAGLE', 'Altium', 'KiCad', 'OrCAD', 'PADS', 'Gerber', 'DXF'],
      bgImage: '',
      fgImage: ''
    },
    construction: {
      name: 'Construction',
      description: 'BIM & Construction Files',
      formats: ['IFC', 'RVT', 'DWG', 'DXF', 'NWD', 'SKP', 'BCF', 'COBie'],
      bgImage: '',
      fgImage: ''
    },
    animation: {
      name: 'Animation',
      description: '3D Animation Files',
      formats: ['FBX', 'COLLADA', 'Alembic', 'USD', 'MA', 'MB', 'BLEND'],
      bgImage: '',
      fgImage: ''
    },
    manufacturing: {
      name: 'Manufacturing',
      description: 'CAM & Manufacturing',
      formats: ['STEP', 'IGES', 'STL', 'AMF', 'G-Code', 'NC', 'CNC', '3MF'],
      bgImage: '',
      fgImage: ''
    },
    civil: {
      name: 'Civil',
      description: 'Civil Engineering & GIS',
      formats: ['DWG', 'DXF', 'DGN', 'LandXML', 'IFC', 'CityGML', 'Shapefile'],
      bgImage: '',
      fgImage: ''
    },
    aerospace: {
      name: 'Aerospace',
      description: 'Aerospace CAD & Analysis',
      formats: ['STEP', 'IGES', 'Catia', 'NX', 'JT', 'CGNS', 'NASA-STD'],
      bgImage: '',
      fgImage: ''
    },
    agriculture: {
      name: 'Agriculture',
      description: 'Precision Agriculture Data',
      formats: ['Shapefile', 'GeoJSON', 'KML', 'ISO-XML', 'ISOBUS', 'ADAPT'],
      bgImage: '',
      fgImage: ''
    },
    medical: {
      name: 'Medical',
      description: 'Medical Imaging & Health Data',
      formats: ['DICOM', 'NIfTI', 'STL', 'OBJ', 'HL7', 'FHIR', 'Analyze'],
      bgImage: '',
      fgImage: ''
    },
    telecommunications: {
      name: 'Telecommunications',
      description: 'Network Protocols & Data',
      formats: ['PCAP', 'ASN.1', 'YANG', 'MIB', 'SNMP', 'NETCONF', 'XML'],
      bgImage: '',
      fgImage: ''
    },
    pharmaceutical: {
      name: 'Pharmaceutical',
      description: 'Drug Discovery & Molecular',
      formats: ['SDF', 'MOL', 'PDB', 'SMILES', 'FASTA', 'EMBL', 'GenBank'],
      bgImage: '',
      fgImage: ''
    },
    finance: {
      name: 'Finance',
      description: 'Financial Data Exchange',
      formats: ['FIX', 'SWIFT', 'ISO 20022', 'XBRL', 'JSON', 'XML', 'CSV'],
      bgImage: '',
      fgImage: ''
    },
    education: {
      name: 'Education',
      description: 'E-Learning Standards',
      formats: ['SCORM', 'xAPI', 'IMS', 'LTI', 'QTI', 'PDF', 'EPUB'],
      bgImage: '',
      fgImage: ''
    },
    robotics: {
      name: 'Robotics',
      description: 'Robot Description & Control',
      formats: ['URDF', 'SDF', 'COLLADA', 'ROS', 'ABB', 'KUKA', 'Fanuc'],
      bgImage: '',
      fgImage: ''
    },
    artificialIntelligence: {
      name: 'Artificial Intelligence',
      description: 'AI Models & Datasets',
      formats: ['ONNX', 'TensorFlow', 'PyTorch', 'H5', 'PMML', 'CoreML', 'TFLite'],
      bgImage: '',
      fgImage: ''
    },
    automotive: {
      name: 'Automotive',
      description: 'Automotive CAD & Diagnostics',
      formats: ['STEP', 'IGES', 'Catia', 'DXF', 'CAN', 'OBD', 'AUTOSAR'],
      bgImage: '',
      fgImage: ''
    },
    oilAndGas: {
      name: 'Oil and Gas',
      description: 'Well Logging & Seismic',
      formats: ['LAS', 'DLIS', 'WITSML', 'SEG-Y', 'LIS', 'P1/90', 'E57'],
      bgImage: '',
      fgImage: ''
    },
    healthcare: {
      name: 'Healthcare',
      description: 'Healthcare Standards',
      formats: ['DICOM', 'HL7', 'FHIR', 'CDA', 'CCR', 'CCD', 'X12'],
      bgImage: '',
      fgImage: ''
    },
    sports: {
      name: 'Sports',
      description: 'Sports Analytics & Tracking',
      formats: ['GPX', 'FIT', 'TCX', 'JSON', 'XML', 'CSV', 'STATS'],
      bgImage: '',
      fgImage: ''
    }
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const newFiles = selectedFiles.map(file => ({
      id: Math.random().toString(36),
      file,
      status: 'pending' as const,
      progress: 0
    }));
    setFiles([...files, ...newFiles]);
  };

  const handleConvert = async () => {
    if (!selectedFormat || files.length === 0) return;

    for (const fileItem of files) {
      if (fileItem.status !== 'pending') continue;

      setFiles(prev => prev.map(f =>
        f.id === fileItem.id ? { ...f, status: 'converting', progress: 0 } : f
      ));

      try {
        const ext = fileItem.file.name.split('.').pop()?.toLowerCase();
        let blob: Blob;

        // Simulate progress
        for (let i = 0; i <= 100; i += 20) {
          await new Promise(resolve => setTimeout(resolve, 200));
          setFiles(prev => prev.map(f =>
            f.id === fileItem.id ? { ...f, progress: i } : f
          ));
        }

        // Convert based on type
        if (['png', 'jpg', 'jpeg', 'webp'].includes(ext || '')) {
          blob = await convertImage(fileItem.file, selectedFormat);
        } else if (['txt', 'json', 'html', 'xml'].includes(ext || '')) {
          blob = await convertText(fileItem.file, selectedFormat);
        } else if (ext === 'csv') {
          blob = await convertCSV(fileItem.file, selectedFormat);
        } else {
          throw new Error('Unsupported format');
        }

        setFiles(prev => prev.map(f =>
          f.id === fileItem.id ? { ...f, status: 'completed', progress: 100, convertedBlob: blob } : f
        ));

        setHistory(prev => [{
          name: fileItem.file.name.replace(/\.[^.]+$/, `.${selectedFormat}`),
          size: blob.size,
          date: new Date(),
          blob
        }, ...prev]);

      } catch (error) {
        setFiles(prev => prev.map(f =>
          f.id === fileItem.id ? { ...f, status: 'failed' } : f
        ));
      }
    }
  };

  const handleDownload = (fileItem: FileItem) => {
    if (!fileItem.convertedBlob) return;
    const filename = fileItem.file.name.replace(/\.[^.]+$/, `.${selectedFormat}`);
    const url = URL.createObjectURL(fileItem.convertedBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const filteredIndustries = Object.entries(industries).filter(([key, industry]) =>
    industry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    industry.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo-section">
              <Zap className="logo-icon" size={32} />
              <h1 className="logo-text">File Converter</h1>
            </div>
            <div className="header-actions">
              <button className="btn-settings">
                <Settings size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          {view === 'home' ? (
            <>
              {/* Search */}
              <div className="search-section">
                <div className="search-wrapper">
                  <Search className="search-icon" size={20} />
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search industries or formats..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="stats-grid">
                <div className="stat-card stat-blue">
                  <div className="stat-value">100+</div>
                  <div className="stat-label">File Formats</div>
                </div>
                <div className="stat-card stat-purple">
                  <div className="stat-value">43</div>
                  <div className="stat-label">Industries</div>
                </div>
                <div className="stat-card stat-green">
                  <div className="stat-value">Fast</div>
                  <div className="stat-label">Client-side</div>
                </div>
                <div className="stat-card stat-orange">
                  <div className="stat-value">Free</div>
                  <div className="stat-label">Forever</div>
                </div>
              </div>

              {/* Industries */}
              <div className="industries-section">
                <h2 className="industries-title">Select Your Industry</h2>
                <div className="industries-grid">
                  {loading ? (
                    <>
                      <SkeletonCard />
                      <SkeletonCard />
                      <SkeletonCard />
                      <SkeletonCard />
                    </>
                  ) : (
                    filteredIndustries.map(([key, industry]) => (
                      <motion.div
                        key={key}
                        className="industry-card"
                        whileHover={{ scale: 1.03 }}
                        onClick={() => {
                          setSelectedIndustry(key);
                          setView('converter');
                        }}
                      >
                        <div className="card-formats-bg">
                          {industry.formats.slice(0, 6).map((format) => (
                            <div key={format} className="format-icon-badge">
                              <span className="format-text">{format}</span>
                            </div>
                          ))}
                        </div>
                        <div className="card-content">
                          <div className="industry-name">{industry.name}</div>
                          <div className="industry-description">{industry.description}</div>
                          <div className="industry-formats">
                            {industry.formats.slice(0, 4).map((format) => (
                              <span key={format} className="industry-format-tag">{format}</span>
                            ))}
                            {industry.formats.length > 4 && (
                              <span className="industry-format-tag format-more">
                                {industry.formats.length - 4}+
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            </>
          ) : (
            /* Converter View */
            <div className="converter-section">
              <button className="back-button" onClick={() => setView('home')}>
                <ArrowRight size={20} style={{ transform: 'rotate(180deg)' }} />
                Back to Industries
              </button>

              <div className="converter-card">
                <h2 className="converter-title">
                  {industries[selectedIndustry]?.name}
                </h2>
                <p className="converter-description">
                  {industries[selectedIndustry]?.description}
                </p>

                {/* Upload Zone */}
                <div
                  className="upload-zone"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="upload-icon" size={48} />
                  <div className="upload-title">Drop files here or click to upload</div>
                  <div className="upload-subtitle">Supports multiple files</div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    style={{ display: 'none' }}
                    onChange={handleFileSelect}
                    accept=".png,.jpg,.jpeg,.webp,.txt,.json,.html,.xml,.csv"
                  />
                </div>

                {/* Files List */}
                {files.length > 0 && (
                  <div className="files-section">
                    <div className="files-header">
                      <div className="files-title">Files ({files.length})</div>
                      <button className="clear-button" onClick={() => setFiles([])}>
                        <Trash2 size={16} />
                        Clear All
                      </button>
                    </div>
                    <div className="files-list">
                      {files.map((fileItem) => (
                        <div key={fileItem.id} className="file-item">
                          <div className="file-info-row">
                            <div className="file-info">
                              <FileText className="file-icon" size={24} />
                              <div className="file-details">
                                <div className="file-name">{fileItem.file.name}</div>
                                <div className="file-meta">
                                  {(fileItem.file.size / 1024).toFixed(2)} KB
                                </div>
                              </div>
                            </div>
                            <div className="file-actions">
                              {fileItem.status === 'pending' && (
                                <span className="status-badge status-pending">Pending</span>
                              )}
                              {fileItem.status === 'converting' && (
                                <span className="status-badge status-converting">
                                  <Loader className="spinner" size={16} />
                                  Converting...
                                </span>
                              )}
                              {fileItem.status === 'completed' && (
                                <>
                                  <Check className="status-completed" size={20} />
                                  <button
                                    className="btn-download"
                                    onClick={() => handleDownload(fileItem)}
                                  >
                                    <Download size={16} />
                                    Download
                                  </button>
                                </>
                              )}
                              {fileItem.status === 'failed' && (
                                <AlertCircle className="status-failed" size={20} />
                              )}
                              <button
                                className="remove-button"
                                onClick={() => setFiles(files.filter(f => f.id !== fileItem.id))}
                              >
                                <X size={16} />
                              </button>
                            </div>
                          </div>
                          {fileItem.status === 'converting' && (
                            <div className="progress-bar">
                              <div
                                className="progress-fill"
                                style={{ width: `${fileItem.progress}%` }}
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Controls */}
                <div className="controls-grid">
                  <div className="control-group">
                    <label className="control-label">Target Format</label>
                    <select
                      className="control-select"
                      value={selectedFormat}
                      onChange={(e) => setSelectedFormat(e.target.value)}
                    >
                      <option value="">Select format...</option>
                      {industries[selectedIndustry]?.formats.map(format => (
                        <option key={format} value={format.toLowerCase()}>{format}</option>
                      ))}
                    </select>
                  </div>
                  <div className="control-group control-button-group">
                    <button
                      className="btn-convert"
                      onClick={handleConvert}
                      disabled={!selectedFormat || files.length === 0}
                    >
                      <Zap size={20} />
                      Convert Files
                    </button>
                  </div>
                </div>

                {/* Formats */}
                <div className="formats-section">
                  <div className="formats-title">Supported Formats</div>
                  <div className="formats-grid">
                    {industries[selectedIndustry]?.formats.map((format) => (
                      <div key={format} className="format-badge" style={{ borderColor: '#ffa500', color: '#ffa500' }}>
                        {format}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* History */}
              {history.length > 0 && (
                <div className="history-card">
                  <h3 className="history-title">Recent Conversions</h3>
                  <div className="history-list">
                    {history.slice(0, 5).map((item, index) => (
                      <div key={index} className="history-item">
                        <div className="history-info">
                          <Check className="history-icon" size={24} />
                          <div className="history-details">
                            <div className="history-name">{item.name}</div>
                            <div className="history-meta">
                              {(item.size / 1024).toFixed(2)} KB • {item.date.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <button
                          className="btn-download"
                          onClick={() => {
                            const url = URL.createObjectURL(item.blob);
                            const link = document.createElement('a');
                            link.href = url;
                            link.download = item.name;
                            link.click();
                            URL.revokeObjectURL(url);
                          }}
                        >
                          <Download size={16} />
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Converter;
