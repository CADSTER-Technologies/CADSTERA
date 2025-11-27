import ExifParser from 'exif-parser';

export interface ImageData {
  type: 'Image';
  fileName: string;
  fileSize: string;
  format: string;
  width: number;
  height: number;
  aspectRatio: string;
  megapixels: string;
  preview: string;
  exif?: any;
}

export const extractImageData = (file: File): Promise<ImageData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      const result = e.target?.result as string;
      const img = new Image();
      
      img.onload = async () => {
        let exifData;
        
        // Try to extract EXIF data
        try {
          if (file.type === 'image/jpeg') {
            const arrayBuffer = await file.arrayBuffer();
            const parser = ExifParser.create(arrayBuffer);
            exifData = parser.parse();
          }
        } catch (error) {
          console.log('No EXIF data found');
        }
        
        resolve({
          type: 'Image',
          fileName: file.name,
          fileSize: formatBytes(file.size),
          format: file.type.split('/')[1].toUpperCase(),
          width: img.width,
          height: img.height,
          aspectRatio: (img.width / img.height).toFixed(2),
          megapixels: ((img.width * img.height) / 1000000).toFixed(2),
          preview: result,
          exif: exifData
        });
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = result;
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};
