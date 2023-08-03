import ReactPlayer from 'react-player';
import HoverVideoPlayer from 'react-hover-video-player';
import '../css/ProductVideoPlayer.css';
import React, { useState, useRef, useEffect } from 'react';
import mute from '../images/mute.png';
import sound from '../images/sound.png';


function ProductVideoPlayer({ videoUrl , fullscreen, onReady }) {

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Lazy-load the iframe when the component mounts
    setIsPlaying(false);
  }, [videoUrl]);

  const handlePlayerClick = () => {
    console.log("videoUrl", videoUrl);
    setIsPlaying(!isPlaying);
  };

  const handlePlayerReady = () => {
    // Autoplay the video
    setIsPlaying(false);
  //  console.log("onReady", onReady);
    if (onReady) {
      onReady();
    }
  };
 
  const handleMuteToggle = (event) => {
    event.stopPropagation(); // Add this line to stop event propagation
    setIsMuted((prevMuted) => !prevMuted);
  };


  return (
    <div className='video-player-wrapper' onClick={handlePlayerClick}>

      {!isPlaying && (
          <div className='play-button'></div>
      )}
      <ReactPlayer
        
        url={videoUrl} // Replace with your video URL
        playing={isPlaying}
        onReady={handlePlayerReady}
        width="80%"
        height={fullscreen ? '80%' : 'auto'}
        playsinline
        loop = {true}
        loading="lazy"
        muted={isMuted}
      />
      <a className={`mute-button`} onClick={(e)=>handleMuteToggle(e)}>
        {isMuted ? <img src={mute} width={20} height={20}/> : <img src={sound} width={20} height={20}/>}
      </a>
    </div>
  );
}

export default ProductVideoPlayer;