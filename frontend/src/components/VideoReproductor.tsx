/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import videojs, { VideoJsPlayerOptions, VideoJsPlayer } from "video.js";
import "video.js/dist/video-js.css";
// import '@devmobiliza/videojs-vimeo/dist/videojs-vimeo.esm.js';
// Interfaces
interface Props {
  settings: VideoJsPlayerOptions;
}

const VideoReproductor = (props: Props) => {
  const refContainer = useRef<HTMLVideoElement | null>();
  const refVideo = useRef<VideoJsPlayer>();

  useEffect(() => {
    // console.log(props.settings);
    refVideo.current = videojs("XD", props.settings);
    return () => {
      // Para resetear el videojs
      refVideo.current?.dispose();
    };
  }, []);

  const noClick = (e: React.PointerEvent<HTMLVideoElement>) => {
    // e.preventDefault();
  };

  //vjs-big-play-centered
  return (
    <div>
      <div data-vjs-player>
        <video id="XD" onContextMenu={noClick} className="video-js vjs-default-skin vjs-fluid"  ref={(node) => (refContainer.current = node)} />
      </div>
    </div>
  );
};

export default VideoReproductor;
