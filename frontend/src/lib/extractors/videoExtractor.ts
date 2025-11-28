export interface VideoData {
  type: 'Video';
  fileName: string;
  fileSize: string;
  duration: number;
  durationFormatted: string;
  width: number;
  height: number;
  aspectRatio: string;
  resolution: string;
  thumbnail: string;
  hasAudio: boolean;
}

export const extractVideoData = (file: File): Promise<VideoData> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    const objectURL = URL.createObjectURL(file);
    
    video.preload = 'metadata';
    
    video.onloadedmetadata = () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      
      video.currentTime = Math.min(1, video.duration / 2);
      
      video.onseeked = () => {
        ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
        const thumbnail = canvas.toDataURL('image/jpeg', 0.8);
        
        URL.revokeObjectURL(objectURL);
        
        resolve({
          type: 'Video',
          fileName: file.name,
          fileSize: formatBytes(file.size),
          duration: video.duration,
          durationFormatted: formatDuration(video.duration),
          width: video.videoWidth,
          height: video.videoHeight,
          aspectRatio: (video.videoWidth / video.videoHeight).toFixed(2),
          resolution: getResolutionLabel(video.videoWidth, video.videoHeight),
          thumbnail,
          hasAudio: (video as any).mozHasAudio || 
                   Boolean((video as any).webkitAudioDecodedByteCount) || 
                   Boolean((video as any).audioTracks?.length)
        });
      };
    };
    
    video.onerror = () => {
      URL.revokeObjectURL(objectURL);
      reject(new Error('Failed to load video'));
    };
    
    video.src = objectURL;
  });
};

const formatDuration = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${h > 0 ? h + ':' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

const getResolutionLabel = (width: number, height: number): string => {
  if (width >= 3840) return '4K UHD';
  if (width >= 2560) return '2K QHD';
  if (width >= 1920) return 'Full HD';
  if (width >= 1280) return 'HD';
  return 'SD';
};

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};
