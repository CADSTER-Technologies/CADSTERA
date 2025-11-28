export interface JSONData {
  type: 'JSON';
  fileName: string;
  fileSize: string;
  data: any;
  structure: string;
  totalKeys: number;
  isArray: boolean;
  arrayLength?: number;
}

export const extractJSONData = async (file: File): Promise<JSONData> => {
  const text = await file.text();
  const jsonData = JSON.parse(text);
  
  return {
    type: 'JSON',
    fileName: file.name,
    fileSize: formatBytes(file.size),
    data: jsonData,
    structure: analyzeStructure(jsonData),
    totalKeys: countKeys(jsonData),
    isArray: Array.isArray(jsonData),
    arrayLength: Array.isArray(jsonData) ? jsonData.length : undefined
  };
};

const analyzeStructure = (obj: any): string => {
  if (Array.isArray(obj)) {
    return `Array with ${obj.length} items`;
  } else if (typeof obj === 'object' && obj !== null) {
    const keys = Object.keys(obj);
    return `Object with ${keys.length} properties`;
  }
  return typeof obj;
};

const countKeys = (obj: any, count = 0): number => {
  if (typeof obj === 'object' && obj !== null) {
    count += Object.keys(obj).length;
    Object.values(obj).forEach(value => {
      count = countKeys(value, count);
    });
  }
  return count;
};

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};
