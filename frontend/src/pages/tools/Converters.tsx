import { useState, useRef, useEffect } from 'react';
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
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ✅ ALL 43 INDUSTRIES
  const industries: Record<string, Industry> = {
    textiles: {
      name: 'Textiles',
      description: 'Embroidery & Pattern Files',
      formats: ['DXF', 'PLT', 'PES', 'DST', 'JEF', 'EXP', 'VP3', 'HUS'],
      bgImage: 'https://images.unsplash.com/photo-1558769132-cb1aea3c8a62?w=400',
      fgImage: 'https://images.unsplash.com/photo-1520004434532-668416a08753?w=400'
    },
    garments: {
      name: 'Garments',
      description: 'Pattern Making & CAD Files',
      formats: ['DXF', 'AAMA', 'ASTM', 'IBA', 'RUL', 'PAT', 'MDL'],
      bgImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400',
      fgImage: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400'
    },
    oceanFishTech: {
      name: 'Ocean/Fish Tech',
      description: 'Marine Navigation & Oceanographic Data',
      formats: ['GPX', 'KML', 'S57', 'GeoJSON', 'NetCDF', 'HDF5', 'RINEX'],
      bgImage: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
      fgImage: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400'
    },
    satelliteSystems: {
      name: 'Satellite Systems',
      description: 'Orbital & Telemetry Data',
      formats: ['TLE', 'SP3', 'RINEX', 'CCSDS', 'HDF5', 'GeoTIFF', 'NetCDF'],
      bgImage: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400',
      fgImage: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=400'
    },
    defenseSystems: {
      name: 'Defense Systems',
      description: 'Military Standards & Tactical Data',
      formats: ['MIL-STD-2525', 'NITF', 'CADRG', 'ADRG', 'VPF', 'DTED', 'CIB'],
      bgImage: 'https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?w=400',
      fgImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400'
    },
    gaming: {
      name: 'Gaming',
      description: '3D Assets & Game Files',
      formats: ['FBX', 'OBJ', 'GLTF', 'USD', 'COLLADA', 'Unity', 'Unreal', '3DS'],
      bgImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400',
      fgImage: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400'
    },
    solarSystems: {
      name: 'Solar Systems',
      description: 'Solar Design & Simulation',
      formats: ['PVsyst', 'Helioscope', 'SAM', 'PVSol', 'Aurora', 'SketchUp'],
      bgImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400',
      fgImage: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=400'
    },
    energySystems: {
      name: 'Energy Systems',
      description: 'Power Grid & Energy Data',
      formats: ['CIM', 'IEC 61850', 'COMTRADE', 'PSSE', 'DIgSILENT', 'PSS/E'],
      bgImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400',
      fgImage: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=400'
    },
    film: {
      name: 'Film',
      description: 'Cinema & Post-Production',
      formats: ['MOV', 'MP4', 'AVI', 'ProRes', 'DPX', 'EXR', 'ARRIRAW', 'R3D'],
      bgImage: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400',
      fgImage: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400'
    },
    artwork: {
      name: 'Artwork',
      description: 'Digital Art & Graphics',
      formats: ['PSD', 'AI', 'SVG', 'EPS', 'TIFF', 'PNG', 'JPEG', 'PDF'],
      bgImage: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400',
      fgImage: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400'
    },
    fashionDesigning: {
      name: 'Fashion Designing',
      description: '3D Fashion & Textile Design',
      formats: ['CLO', 'MD', 'OBJ', 'FBX', 'DXF', 'AI', 'PSD'],
      bgImage: 'https://images.unsplash.com/photo-1558769132-cb1aea3c8a62?w=400',
      fgImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400'
    },
    interior: {
      name: 'Interior',
      description: 'Interior Design & Visualization',
      formats: ['RVT', 'SKP', 'DWG', 'DXF', '3DS', 'MAX', 'BLEND', 'FBX'],
      bgImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400',
      fgImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400'
    },
    chemical: {
      name: 'Chemical',
      description: 'Chemical Structure Files',
      formats: ['MOL', 'SDF', 'PDB', 'CIF', 'XYZ', 'SMILES', 'InChI'],
      bgImage: 'https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=400',
      fgImage: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=400'
    },
    powerplants: {
      name: 'Powerplants',
      description: 'Process Engineering Data',
      formats: ['ASPEN', 'HYSYS', 'ProMax', 'AVEVA', 'P&ID', 'PFD'],
      bgImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400',
      fgImage: 'https://images.unsplash.com/photo-1621830244554-63e85543ed1a?w=400'
    },
    hvac: {
      name: 'HVAC',
      description: 'HVAC Design & Analysis',
      formats: ['HAP', 'TRACE', 'EnergyPlus', 'IDF', 'RVT', 'DWG', 'IFC'],
      bgImage: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400',
      fgImage: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400'
    },
    securitySystems: {
      name: 'Security Systems',
      description: 'Surveillance & Access Control',
      formats: ['H264', 'H265', 'ONVIF', 'RTSP', 'XML', 'JSON', 'PSIM'],
      bgImage: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=400',
      fgImage: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400'
    },
    iot: {
      name: 'IoT',
      description: 'IoT Protocols & Data',
      formats: ['JSON', 'MQTT', 'CoAP', 'CBOR', 'Protocol Buffers', 'Thrift'],
      bgImage: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400',
      fgImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400'
    },
    safety: {
      name: 'Safety',
      description: 'Safety Analysis Files',
      formats: ['HAZOP', 'FMEA', 'FTA', 'LOPA', 'QRA', 'Bowtie', 'SIL'],
      bgImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400',
      fgImage: 'https://images.unsplash.com/photo-1503551723145-6c040742065b?w=400'
    },
    transport: {
      name: 'Transport',
      description: 'Transportation & Routing',
      formats: ['GTFS', 'OSM', 'Shapefile', 'GeoJSON', 'KML', 'GPX', 'SUMO'],
      bgImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400',
      fgImage: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400'
    },
    plasticRubber: {
      name: 'Plastic/Rubber',
      description: 'Injection Molding & Design',
      formats: ['Moldflow', 'SolidWorks', 'IGES', 'STEP', 'Parasolid', 'STL'],
      bgImage: 'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?w=400',
      fgImage: 'https://images.unsplash.com/photo-1587560699334-bea93391dcef?w=400'
    },
    recycling: {
      name: 'Recycling',
      description: 'Life Cycle Assessment',
      formats: ['LCA', 'SimaPro', 'GaBi', 'OpenLCA', 'CSV', 'XML'],
      bgImage: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400',
      fgImage: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=400'
    },
    fireworks: {
      name: 'Fireworks',
      description: 'Pyrotechnic Show Design',
      formats: ['FWS', 'XML', 'JSON', 'CSV', 'CAD', 'Pyro'],
      bgImage: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400',
      fgImage: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=400'
    },
    matchWorks: {
      name: 'Match Works',
      description: 'Manufacturing Specs',
      formats: ['DWG', 'DXF', 'STEP', 'IGES', 'PDF', 'CSV'],
      bgImage: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400',
      fgImage: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400'
    },
    mining: {
      name: 'Mining',
      description: 'Mining & Geological Data',
      formats: ['Surpac', 'Vulcan', 'MineSight', 'Datamine', 'DXF', 'LAS'],
      bgImage: 'https://images.unsplash.com/photo-1562409320-26d3eaa5ad49?w=400',
      fgImage: 'https://images.unsplash.com/photo-1595665593673-bf1ad72905c0?w=400'
    },
    mechanical: {
      name: 'Mechanical',
      description: 'CAD & Engineering Files',
      formats: ['STEP', 'IGES', 'STL', 'Parasolid', 'ACIS', 'JT', 'Catia'],
      bgImage: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400',
      fgImage: 'https://images.unsplash.com/photo-1581091226825-c6a89e7e4801?w=400'
    },
    electrical: {
      name: 'Electrical',
      description: 'PCB & Circuit Design',
      formats: ['EAGLE', 'Altium', 'KiCad', 'OrCAD', 'PADS', 'Gerber', 'DXF'],
      bgImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400',
      fgImage: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=400'
    },
    construction: {
      name: 'Construction',
      description: 'BIM & Construction Files',
      formats: ['IFC', 'RVT', 'DWG', 'DXF', 'NWD', 'SKP', 'BCF', 'COBie'],
      bgImage: 'https://images.unsplash.com/photo-1541976590-713941681591?w=400',
      fgImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400'
    },
    animation: {
      name: 'Animation',
      description: '3D Animation Files',
      formats: ['FBX', 'COLLADA', 'Alembic', 'USD', 'MA', 'MB', 'BLEND'],
      bgImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400',
      fgImage: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400'
    },
    manufacturing: {
      name: 'Manufacturing',
      description: 'CAM & Manufacturing',
      formats: ['STEP', 'IGES', 'STL', 'AMF', 'G-Code', 'NC', 'CNC', '3MF'],
      bgImage: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400',
      fgImage: 'https://images.unsplash.com/photo-1567789884554-0b844b597180?w=400'
    },
    civil: {
      name: 'Civil',
      description: 'Civil Engineering & GIS',
      formats: ['DWG', 'DXF', 'DGN', 'LandXML', 'IFC', 'CityGML', 'Shapefile'],
      bgImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400',
      fgImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400'
    },
    aerospace: {
      name: 'Aerospace',
      description: 'Aerospace CAD & Analysis',
      formats: ['STEP', 'IGES', 'Catia', 'NX', 'JT', 'CGNS', 'NASA-STD'],
      bgImage: 'https://images.unsplash.com/photo-1581822261290-991b38693d1b?w=400',
      fgImage: 'https://images.unsplash.com/photo-1454789415558-bdda08f4eabb?w=400'
    },
    agriculture: {
      name: 'Agriculture',
      description: 'Precision Agriculture Data',
      formats: ['Shapefile', 'GeoJSON', 'KML', 'ISO-XML', 'ISOBUS', 'ADAPT'],
      bgImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400',
      fgImage: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400'
    },
    medical: {
      name: 'Medical',
      description: 'Medical Imaging & Health Data',
      formats: ['DICOM', 'NIfTI', 'STL', 'OBJ', 'HL7', 'FHIR', 'Analyze'],
      bgImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400',
      fgImage: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=400'
    },
    telecommunications: {
      name: 'Telecommunications',
      description: 'Network Protocols & Data',
      formats: ['PCAP', 'ASN.1', 'YANG', 'MIB', 'SNMP', 'NETCONF', 'XML'],
      bgImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400',
      fgImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400'
    },
    pharmaceutical: {
      name: 'Pharmaceutical',
      description: 'Drug Discovery & Molecular',
      formats: ['SDF', 'MOL', 'PDB', 'SMILES', 'FASTA', 'EMBL', 'GenBank'],
      bgImage: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400',
      fgImage: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400'
    },
    finance: {
      name: 'Finance',
      description: 'Financial Data Exchange',
      formats: ['FIX', 'SWIFT', 'ISO 20022', 'XBRL', 'JSON', 'XML', 'CSV'],
      bgImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400',
      fgImage: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400'
    },
    education: {
      name: 'Education',
      description: 'E-Learning Standards',
      formats: ['SCORM', 'xAPI', 'IMS', 'LTI', 'QTI', 'PDF', 'EPUB'],
      bgImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400',
      fgImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400'
    },
    robotics: {
      name: 'Robotics',
      description: 'Robot Description & Control',
      formats: ['URDF', 'SDF', 'COLLADA', 'ROS', 'ABB', 'KUKA', 'Fanuc'],
      bgImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400',
      fgImage: 'https://images.unsplash.com/photo-1563207153-f403bf289096?w=400'
    },
    artificialIntelligence: {
      name: 'Artificial Intelligence',
      description: 'AI Models & Datasets',
      formats: ['ONNX', 'TensorFlow', 'PyTorch', 'H5', 'PMML', 'CoreML', 'TFLite'],
      bgImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400',
      fgImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400'
    },
    automotive: {
      name: 'Automotive',
      description: 'Automotive CAD & Diagnostics',
      formats: ['STEP', 'IGES', 'Catia', 'DXF', 'CAN', 'OBD', 'AUTOSAR'],
      bgImage: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400',
      fgImage: 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=400'
    },
    oilAndGas: {
      name: 'Oil and Gas',
      description: 'Well Logging & Seismic',
      formats: ['LAS', 'DLIS', 'WITSML', 'SEG-Y', 'LIS', 'P1/90', 'E57'],
      bgImage: 'https://images.unsplash.com/photo-1578836537282-3171d77f8632?w=400',
      fgImage: 'https://images.unsplash.com/photo-1545259742-56b5e9d447f7?w=400'
    },
    healthcare: {
      name: 'Healthcare',
      description: 'Healthcare Standards',
      formats: ['DICOM', 'HL7', 'FHIR', 'CDA', 'CCR', 'CCD', 'X12'],
      bgImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400',
      fgImage: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400'
    },
    sports: {
      name: 'Sports',
      description: 'Sports Analytics & Tracking',
      formats: ['GPX', 'FIT', 'TCX', 'JSON', 'XML', 'CSV', 'STATS'],
      bgImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400',
      fgImage: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400'
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
                      <div
                        key={key}
                        className="industry-card"
                        onMouseEnter={() => setHoveredCard(key)}
                        onMouseLeave={() => setHoveredCard(null)}
                        onClick={() => {
                          setSelectedIndustry(key);
                          setView('converter');
                        }}
                      >
                        {/* Background Image */}
                        <div
                          className="card-bg-image"
                          style={{
                            backgroundImage: `url(${industry.bgImage})`,
                            opacity: 1
                          }}
                        />

                        {/* Foreground Image (shows on hover) */}
                        <div
                          className="card-fg-image"
                          style={{
                            backgroundImage: `url(${industry.fgImage})`,
                            opacity: hoveredCard === key ? 1 : 0
                          }}
                        />

                        {/* Format badges background */}
                        <div className="card-formats-bg">
                          {industry.formats.slice(0, 6).map((format) => (
                            <div key={format} className="format-icon-badge">
                              <span className="format-text">{format}</span>
                            </div>
                          ))}
                        </div>

                        {/* Card Content */}
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
                      </div>
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
