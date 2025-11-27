import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, FileText, Table, Code, Image, Archive, 
  Video, Music, Download, Copy, RotateCcw, X,
  FileJson, FileSpreadsheet, CheckCircle, AlertCircle,
  Loader2, Eye, BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

// Import extractors
import { extractPDFData, type PDFData } from '@/lib/extractors/pdfExtractor';
import { extractCSVData, extractExcelData, type SpreadsheetData } from '@/lib/extractors/spreadsheetExtractor';
import { extractJSONData, type JSONData } from '@/lib/extractors/jsonExtractor';
import { extractImageData, type ImageData } from '@/lib/extractors/imageExtractor';
import { extractArchiveData, type ArchiveData } from '@/lib/extractors/archiveExtractor';
import { extractVideoData, type VideoData } from '@/lib/extractors/videoExtractor';
import { extractAudioData, type AudioData } from '@/lib/extractors/audioExtractor';

type ExtractedData = PDFData | SpreadsheetData | JSONData | ImageData | ArchiveData | VideoData | AudioData;

const Extractor = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [fileName, setFileName] = useState('');
  const [activeTab, setActiveTab] = useState('upload');

  const supportedFormats = [
    { icon: FileText, name: 'PDF', extensions: ['.pdf'], color: 'text-red-500' },
    { icon: FileSpreadsheet, name: 'CSV', extensions: ['.csv'], color: 'text-green-500' },
    { icon: Table, name: 'Excel', extensions: ['.xlsx', '.xls'], color: 'text-emerald-500' },
    { icon: FileJson, name: 'JSON', extensions: ['.json'], color: 'text-yellow-500' },
    { icon: Image, name: 'Images', extensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp'], color: 'text-purple-500' },
    { icon: Archive, name: 'Archives', extensions: ['.zip'], color: 'text-blue-500' },
    { icon: Video, name: 'Video', extensions: ['.mp4', '.webm', '.avi', '.mov'], color: 'text-pink-500' },
    { icon: Music, name: 'Audio', extensions: ['.mp3', '.wav', '.ogg'], color: 'text-orange-500' },
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const processFile = async (file: File) => {
    setIsProcessing(true);
    setProgress(0);
    setFileName(file.name);
    
    const extension = file.name.split('.').pop()?.toLowerCase();

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      let data: ExtractedData;

      switch (extension) {
        case 'pdf':
          data = await extractPDFData(file);
          break;
        case 'csv':
          data = await extractCSVData(file);
          break;
        case 'xlsx':
        case 'xls':
          data = await extractExcelData(file);
          break;
        case 'json':
          data = await extractJSONData(file);
          break;
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
        case 'webp':
          data = await extractImageData(file);
          break;
        case 'zip':
          data = await extractArchiveData(file);
          break;
        case 'mp4':
        case 'webm':
        case 'avi':
        case 'mov':
          data = await extractVideoData(file);
          break;
        case 'mp3':
        case 'wav':
        case 'ogg':
          data = await extractAudioData(file);
          break;
        default:
          throw new Error('Unsupported file format');
      }

      clearInterval(progressInterval);
      setProgress(100);
      setExtractedData(data);
      setActiveTab('results');
      toast.success('Data extracted successfully!');
    } catch (error) {
      console.error('Extraction error:', error);
      toast.error('Failed to extract data: ' + (error as Error).message);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadJSON = () => {
    if (!extractedData) return;
    const blob = new Blob([JSON.stringify(extractedData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}-extracted.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Downloaded as JSON!');
  };

  const copyToClipboard = () => {
    if (!extractedData) return;
    navigator.clipboard.writeText(JSON.stringify(extractedData, null, 2));
    toast.success('Copied to clipboard!');
  };

  const reset = () => {
    setExtractedData(null);
    setFileName('');
    setProgress(0);
    setActiveTab('upload');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 bg-clip-text text-transparent">
            Data Extractor
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Extract and analyze data from 10+ file formats with advanced processing capabilities
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-gray-800 border border-orange-500/20">
            <TabsTrigger value="upload" className="data-[state=active]:bg-orange-500">
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </TabsTrigger>
            <TabsTrigger value="results" disabled={!extractedData} className="data-[state=active]:bg-orange-500">
              <Eye className="mr-2 h-4 w-4" />
              Results
            </TabsTrigger>
          </TabsList>

          {/* Upload Tab */}
          <TabsContent value="upload" className="space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-2 border-orange-500/20 bg-gray-900/50 backdrop-blur">
                <CardContent className="p-12">
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`
                      relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300
                      ${isDragging 
                        ? 'border-orange-500 bg-orange-500/10 scale-105' 
                        : 'border-gray-700 hover:border-orange-500/50 bg-gray-800/30'
                      }
                    `}
                  >
                    <input
                      type="file"
                      onChange={handleFileInput}
                      className="hidden"
                      id="file-upload"
                      accept=".pdf,.csv,.xlsx,.xls,.json,.jpg,.jpeg,.png,.gif,.webp,.zip,.mp4,.webm,.avi,.mov,.mp3,.wav,.ogg"
                    />
                    
                    {isProcessing ? (
                      <div className="space-y-6">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                          <Loader2 className="h-16 w-16 mx-auto text-orange-500" />
                        </motion.div>
                        <p className="text-xl font-semibold text-orange-500">Processing {fileName}...</p>
                        <Progress value={progress} className="w-full max-w-md mx-auto" />
                        <p className="text-sm text-gray-400">{progress}% complete</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <motion.div
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Upload className="h-16 w-16 mx-auto text-orange-500" />
                        </motion.div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2">
                            Drop your file here
                          </h3>
                          <p className="text-gray-400 mb-4">or</p>
                          <Button
                            onClick={() => document.getElementById('file-upload')?.click()}
                            size="lg"
                            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                          >
                            <Upload className="mr-2 h-5 w-5" />
                            Browse Files
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Supported Formats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border border-orange-500/20 bg-gray-900/30">
                <CardHeader>
                  <CardTitle className="text-orange-500">Supported Formats</CardTitle>
                  <CardDescription>We support 10+ file formats for data extraction</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {supportedFormats.map((format, index) => (
                      <motion.div
                        key={format.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="p-4 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-orange-500/50 transition-all"
                      >
                        <format.icon className={`h-8 w-8 ${format.color} mb-2`} />
                        <h4 className="font-semibold text-white">{format.name}</h4>
                        <p className="text-xs text-gray-400">{format.extensions.join(', ')}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Results Tab */}
          <TabsContent value="results">
            <AnimatePresence mode="wait">
              {extractedData && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {/* Header Actions */}
                  <Card className="border border-orange-500/20 bg-gray-900/50">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <CheckCircle className="h-8 w-8 text-green-500" />
                          <div>
                            <CardTitle className="text-2xl text-orange-500">{extractedData.type}</CardTitle>
                            <CardDescription>{extractedData.fileName}</CardDescription>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={downloadJSON} variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            JSON
                          </Button>
                          <Button onClick={copyToClipboard} variant="outline" size="sm">
                            <Copy className="mr-2 h-4 w-4" />
                            Copy
                          </Button>
                          <Button onClick={reset} variant="outline" size="sm">
                            <RotateCcw className="mr-2 h-4 w-4" />
                            New
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatsCard label="File Size" value={extractedData.fileSize} />
                    {extractedData.type === 'PDF' && (
                      <>
                        <StatsCard label="Pages" value={extractedData.totalPages} />
                        <StatsCard label="Words" value={extractedData.wordCount} />
                      </>
                    )}
                    {(extractedData.type === 'CSV' || extractedData.type === 'Excel') && (
                      <>
                        <StatsCard label="Rows" value={extractedData.totalRows} />
                        <StatsCard label="Columns" value={extractedData.totalColumns} />
                      </>
                    )}
                    {extractedData.type === 'Image' && (
                      <>
                        <StatsCard label="Dimensions" value={`${extractedData.width}×${extractedData.height}`} />
                        <StatsCard label="Megapixels" value={`${extractedData.megapixels} MP`} />
                      </>
                    )}
                  </div>

                  {/* Data Display */}
                  <DataDisplay data={extractedData} />
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Stats Card Component
const StatsCard = ({ label, value }: { label: string; value: string | number }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="p-4 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-orange-500/20"
  >
    <p className="text-sm text-gray-400 mb-1">{label}</p>
    <p className="text-2xl font-bold text-orange-500">{value}</p>
  </motion.div>
);

// Data Display Component
const DataDisplay = ({ data }: { data: ExtractedData }) => {
  if (data.type === 'PDF') {
    return (
      <Card className="border border-orange-500/20 bg-gray-900/30">
        <CardHeader>
          <CardTitle className="text-orange-500">Text Content</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96 w-full rounded-md border border-gray-700 p-4 bg-black/30">
            <pre className="text-sm text-gray-300 whitespace-pre-wrap">{data.fullText.substring(0, 5000)}...</pre>
          </ScrollArea>
        </CardContent>
      </Card>
    );
  }

  if (data.type === 'CSV' || data.type === 'Excel') {
    return (
      <Card className="border border-orange-500/20 bg-gray-900/30">
        <CardHeader>
          <CardTitle className="text-orange-500">Data Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96 w-full">
            <table className="w-full text-sm">
              <thead className="bg-orange-500/10 sticky top-0">
                <tr>
                  {data.headers.map((header, i) => (
                    <th key={i} className="p-2 text-left text-orange-500 border-b border-orange-500/20">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.rows.slice(0, 50).map((row: any, i) => (
                  <tr key={i} className="border-b border-gray-800 hover:bg-gray-800/30">
                    {Object.values(row).map((cell: any, j) => (
                      <td key={j} className="p-2 text-gray-300">{String(cell)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollArea>
        </CardContent>
      </Card>
    );
  }

  if (data.type === 'JSON') {
    return (
      <Card className="border border-orange-500/20 bg-gray-900/30">
        <CardHeader>
          <CardTitle className="text-orange-500">JSON Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96 w-full rounded-md border border-gray-700 p-4 bg-black/30">
            <pre className="text-sm text-gray-300">{JSON.stringify(data.data, null, 2).substring(0, 5000)}...</pre>
          </ScrollArea>
        </CardContent>
      </Card>
    );
  }

  if (data.type === 'Image') {
    return (
      <Card className="border border-orange-500/20 bg-gray-900/30">
        <CardHeader>
          <CardTitle className="text-orange-500">Image Preview</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <img src={data.preview} alt={data.fileName} className="max-w-full h-auto rounded-lg border-2 border-orange-500/20" />
        </CardContent>
      </Card>
    );
  }

  return <div className="text-center text-gray-400">No preview available for this file type</div>;
};

export default Extractor;
