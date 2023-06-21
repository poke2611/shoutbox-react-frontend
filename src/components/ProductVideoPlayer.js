import ReactPlayer from 'react-player';
import HoverVideoPlayer from 'react-hover-video-player';
import '../css/ProductVideoPlayer.css';
import { useRef, useState } from 'react';

function ProductVideoPlayer({ videoUrl }) {

  const playerRef = useRef();

  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const handlePlayerClick = () => {

    
    console.log("handlePlayerClick", isPlaying);
    const player = playerRef.current;
    if (isPlaying) {
      player.pause();
      setIsPlaying(false);
    } else {
      player.play();
      setIsPlaying(true);
    }
  };
  

  const handleVideoEnded = () => {
   console.log("handleVideoEnded", );
    playerRef.current && playerRef.current.getInternalPlayer().play();
  };

  const handlePlayerClickk = () => {

    console.log("handlePlayerClick");
    const player = playerRef.current;
    if (player && player.isReady()) {
      if (player.isPlaying()) {
        player.pause();
      } else {
        player.play();
      }
    }
  };


  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handlePlayerHover = (hovered) => {
    setIsHovered(hovered);
    const player = playerRef.current;
    if (player) {
      if (hovered) {
        player.play();
      } else {
        player.pause();
      }
    }
  };
 
  return (
    <div className="video-player-wrapper"  onMouseEnter={() => handlePlayerHover(true)}
    onMouseLeave={() => handlePlayerHover(false)}>

<HoverVideoPlayer
                    videoSrc={videoUrl}
                    muted={false}
                    controls
                    ref={playerRef}
                    loop = {true}      
            />
        
   
    {/*  
            <ReactPlayer
         ref= {playerRef}
         url={videoUrl} 
         onClick={handlePlayerClick}
         controls={true} 
         playing={isPlaying}
         loop={true}
         width="100%" 
         height="100%" 
         />
   
        

    
    
          */}
    </div>
  );
}

export default ProductVideoPlayer;
