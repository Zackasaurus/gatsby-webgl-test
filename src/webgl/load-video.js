const loadVideo = url => {
  return new Promise((resolve, reject) => {
    try {
      const video = document.createElement('video');
      video.src = url;
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.crossOrigin = 'anonymous';

      video.oncanplay = () => {
        video.play();
        resolve(video);
      };
    } catch (e) {
      reject(e);
    }
  });
};
export default loadVideo;
