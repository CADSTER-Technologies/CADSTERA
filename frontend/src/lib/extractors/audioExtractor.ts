export interface AudioData {
  type: 'Audio';
  fileName: string;
  fileSize: string;
  duration: number;
  durationFormatted: string;
  sampleRate: number;
  channels: number;
  channelLabel: string;
  estimatedBitrate: string;
}

export const extractAudioData = (file: File): Promise<AudioData> => {
  return new Promise((resolve, reject) => {
    const audio = document.createElement('audio');
    const objectURL = URL.createObjectURL(file);
    
    audio.preload = 'metadata';
    
    audio.onloadedmetadata = () => {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          const arrayBuffer = e.target?.result as ArrayBuffer;
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
          
          URL.revokeObjectURL(objectURL);
          
          resolve({
            type: 'Audio',
            fileName: file.name,
            fileSize: formatBytes(file.size),
            duration: audio.duration,
            durationFormatted: formatDuration(audio.duration),
            sampleRate: audioBuffer.sampleRate,
            channels: audioBuffer.numberOfChannels,
            channelLabel: audioBuffer.numberOfChannels === 1 ? 'Mono' : 
                         audioBuffer.numberOfChannels === 2 ? 'Stereo' : 
                         `${audioBuffer.numberOfChannels} Channels`,
            estimatedBitrate: Math.round((file.size * 8) / audio.duration / 1000) + ' kbps'
          });
        } catch (error) {
          reject(error);
        }
      };
      
      reader.readAsArrayBuffer(file);
    };
    
    audio.onerror = () => {
      URL.revokeObjectURL(objectURL);
      reject(new Error('Failed to load audio'));
    };
    
    audio.src = objectURL;
  });
};

const formatDuration = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
};

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};
