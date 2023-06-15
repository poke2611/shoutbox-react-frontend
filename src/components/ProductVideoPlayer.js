import ReactPlayer from 'react-player';
import '../css/ProductVideoPlayer.css';

function ProductVideoPlayer({ videoUrl }) {
  return (
    <div className="video-player-wrapper">
      <ReactPlayer url={videoUrl} controls={true} width="100%" height="100%" />
    </div>
  );
}

export default ProductVideoPlayer;
