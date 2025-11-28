import * as pdfjsLib from 'pdfjs-dist';

// Set PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export interface PDFData {
  type: 'PDF';
  fileName: string;
  fileSize: string;
  totalPages: number;
  pages: PageData[];
  fullText: string;
  wordCount: number;
  metadata: any;
}

interface PageData {
  pageNumber: number;
  text: string;
  wordCount: number;
}

export const extractPDFData = async (file: File): Promise<PDFData> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  
  let fullText = '';
  const pages: PageData[] = [];
  
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map((item: any) => item.str).join(' ');
    
    pages.push({
      pageNumber: i,
      text: pageText,
      wordCount: pageText.split(/\s+/).filter(w => w).length
    });
    
    fullText += pageText + '\n';
  }
  
  const metadata = await pdf.getMetadata();
  
  return {
    type: 'PDF',
    fileName: file.name,
    fileSize: formatBytes(file.size),
    totalPages: pdf.numPages,
    pages,
    fullText,
    wordCount: fullText.split(/\s+/).filter(w => w).length,
    metadata: metadata.info
  };
};

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};
