import ReactPlayer from 'react-player';
import HoverVideoPlayer from 'react-hover-video-player';
import '../css/ProductVideoPlayer.css';
import { useRef, useState } from 'react';

function ProductVideoPlayer({ videoUrl , fullscreen }) {

  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayerClick = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePlayerReady = () => {
    // Autoplay the video
    setIsPlaying(false);
  };

  return (
    <div className='video-player-wrapper' onClick={handlePlayerClick}>
      <ReactPlayer
        
        url={videoUrl} // Replace with your video URL
        playing={isPlaying}
        onReady={handlePlayerReady}
        width="80%"
        height={fullscreen ? '80%' : 'auto'}
        loop = {true}
      />
    </div>
  );
}

export default ProductVideoPlayer;
