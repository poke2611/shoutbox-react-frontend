import ReactPlayer from 'react-player';
import HoverVideoPlayer from 'react-hover-video-player';
import '../css/ProductVideoPlayer.css';
import React, { useState, useRef, useEffect } from 'react';
import { setMuteFlag } from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import play from '../images/play-button.png';
import mute from '../images/mute.png';
import sound from '../images/speaker.png';


function ProductVideoPlayer({ videoUrl , fullscreen, onReady, prodImg}) {

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const muteFlag = useSelector(state => state.muteFlag);
  const dispatch = useDispatch();

  useEffect(() => {
    // Lazy-load the iframe when the component mounts
    setIsPlaying(false);
  }, [videoUrl]);

  useEffect(() => {
    // Add a scroll event listener to the window
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [window.scrollY]);

  const handleScroll = () => {
    // Get the current scroll position
    console.log("handleScroll")
    
    const scrollY = window.scrollY;
    // Pause the video when scrolling up
    if (scrollY > 0 && isPlaying) {
      setIsPlaying(false);
    }
  };

  const handlePlayerClick = () => {
    console.log("videoUrl", videoUrl);
    setIsPlaying(!isPlaying);
  };

  const handlePlayerReady = () => {
    setIsPlaying(false);
  //  console.log("onReady", onReady);
    if (onReady) {
      onReady();
    }
  };
 
  const handleMuteToggle = (event) => {
    event.stopPropagation(); 
    setIsMuted((prevMuted) => !prevMuted);
    dispatch(setMuteFlag(!muteFlag))
  };


  return (
    <div className='video-player-wrapper' onClick={handlePlayerClick}>

      {!isPlaying && (
          <div className='play-button'>
              <img src={play} width={40} height={40}/>
          </div>
        
      )}
      <ReactPlayer
        
        url={videoUrl} // Replace with your video URL
        playing={isPlaying}
        onReady={handlePlayerReady}
        width="80%"
        height={fullscreen ? '80%' : 'auto'}
        playsinline
        loop = {true}
        muted={muteFlag}
        config={{
          file: {
            attributes: {
              poster: prodImg
            }
          }
        }}
      />
      <a className={`mute-button`} onClick={(e)=>handleMuteToggle(e)}>
        {muteFlag ? <img src={mute} width={20} height={20}/> : <img src={sound} width={20} height={20}/>}
      </a>
    </div>
  );
}

export default ProductVideoPlayer;