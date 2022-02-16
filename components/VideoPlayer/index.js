import React, { useEffect, useRef, useState } from "react";
import Hls from 'hls.js';
import HoverVideoPlayer from 'react-hover-video-player';



export default function VideoPlayer({src}) {
    const videoRef = useRef(null);
    //const [source, setSource] = useState();
    
  
    useEffect(() => {
      


      if (videoRef.current) {
        const video = videoRef.current;
        
  
        if (video.canPlayType("application/vnd.apple.mpegurl")) {
          // Some browers (safari and ie edge) support HLS natively
          video.videoSrc = src;
        } else if (Hls.isSupported()) {

            const videoEl = document.getElementById('hls-hover-video');
            let hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(video);
        } else {
          console.error("This is a legacy browser that doesn't support MSE");
        }
      }
  
      return () => {
        if (hls) {
          hls.destroy();
        }
      };
    }, [videoRef]);
  
    return (
        <div>
      <video
        controls
        ref={videoRef}
        style={{ width: "100%", maxWidth: "1600px" }}
        className="rounded-lg"
      />

      {/* <HoverVideoPlayer
        videoSrc={videoRef}
        restartOnPaused
        controls
        videoId="hls-hover-video"
        muted={false}
        ref={videoRef}
        pausedOverlay={
            <img
            src=""
            alt=""
            style={{
                // Make the image expand to cover the video's dimensions
                width: '100%',
                height: '100%',
                objectFit: 'cover',
            }}
            />
        }
        loadingOverlay={
            <div className="loading-overlay">
            <div className="loading-spinner" />
            </div>
        }
        /> */}
    </div>
    );
  }  