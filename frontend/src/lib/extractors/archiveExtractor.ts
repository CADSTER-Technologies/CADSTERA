import JSZip from 'jszip';

export interface ArchiveData {
  type: 'Archive';
  fileName: string;
  fileSize: string;
  totalFiles: number;
  files: FileEntry[];
  fileTypes: TypeCount[];
  totalUncompressedSize: string;
  compressionRatio: string;
}

interface FileEntry {
  name: string;
  size: number;
  sizeFormatted: string;
  type: string;
  compressionRatio: string;
}

interface TypeCount {
  type: string;
  count: number;
}

export const extractArchiveData = async (file: File): Promise<ArchiveData> => {
  const zip = new JSZip();
  const contents = await zip.loadAsync(file);
  
  const files: FileEntry[] = [];
  let totalSize = 0;
  const fileTypes: Record<string, number> = {};
  
  contents.forEach((relativePath, zipEntry) => {
    if (!zipEntry.dir) {
      const extension = relativePath.split('.').pop()?.toLowerCase() || 'unknown';
      const size = zipEntry._data.uncompressedSize;
      
      files.push({
        name: relativePath,
        size,
        sizeFormatted: formatBytes(size),
        type: extension,
        compressionRatio: ((1 - zipEntry._data.compressedSize / size) * 100).toFixed(1) + '%'
      });
      
      totalSize += size;
      fileTypes[extension] = (fileTypes[extension] || 0) + 1;
    }
  });
  
  return {
    type: 'Archive',
    fileName: file.name,
    fileSize: formatBytes(file.size),
    totalFiles: files.length,
    files,
    fileTypes: Object.entries(fileTypes).map(([type, count]) => ({ type, count })),
    totalUncompressedSize: formatBytes(totalSize),
    compressionRatio: ((1 - file.size / totalSize) * 100).toFixed(1) + '%'
  };
};

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};
