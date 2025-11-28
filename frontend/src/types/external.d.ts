declare module 'exif-parser' {
  interface ExifResult {
    tags: any;
    imageSize: any;
    thumbnailOffset: number;
    thumbnailLength: number;
    thumbnailType: number;
  }

  interface ExifParser {
    parse(): ExifResult;
  }

  export function create(buffer: ArrayBuffer): ExifParser;
}

declare module 'jszip' {
  export default class JSZip {
    loadAsync(data: any): Promise<JSZip>;
    forEach(callback: (relativePath: string, file: any) => void): void;
  }
}
