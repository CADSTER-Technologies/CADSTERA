import Papa from 'papaparse';
import * as XLSX from 'xlsx';

export interface SpreadsheetData {
  type: 'CSV' | 'Excel';
  fileName: string;
  fileSize: string;
  headers: string[];
  rows: any[];
  totalRows: number;
  totalColumns: number;
  sheetName?: string;
  allSheets?: string[];
}

export const extractCSVData = (file: File): Promise<SpreadsheetData> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        resolve({
          type: 'CSV',
          fileName: file.name,
          fileSize: formatBytes(file.size),
          headers: results.meta.fields || [],
          rows: results.data,
          totalRows: results.data.length,
          totalColumns: results.meta.fields?.length || 0
        });
      },
      error: (error) => reject(error)
    });
  });
};

export const extractExcelData = (file: File): Promise<SpreadsheetData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const workbook = XLSX.read(e.target?.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
        
        resolve({
          type: 'Excel',
          fileName: file.name,
          fileSize: formatBytes(file.size),
          sheetName,
          headers: jsonData[0] || [],
          rows: jsonData.slice(1),
          totalRows: jsonData.length - 1,
          totalColumns: jsonData[0]?.length || 0,
          allSheets: workbook.SheetNames
        });
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsBinaryString(file);
  });
};

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};
