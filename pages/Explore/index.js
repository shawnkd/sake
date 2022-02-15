import {useMoralis, useMoralisQuery} from 'react-moralis'
import Header from "../../components/Header"
const Moralis = require("moralis");
import ReactPlayer from "react-player";
import React, { useEffect, useRef } from "react";
import HoverVideoPlayer from 'react-hover-video-player';
import VideoPlayer from "../../components/VideoPlayer"
// import fs from 'fs'
// import Mux from '@mux/mux-node'
// import Hls from 'hls.js';



export default function Explore() {

    //const src = "https://stream.mux.com/{PLAYBACK_ID}.m3u8";

    const { isInitialized, isAuthenticated, user } = useMoralis();
    const {data, error, isLoading} = useMoralisQuery("HighlightVideo4", query => query.descending('video'))
    // const { Video } = new Mux(process.env.MUX_TOKEN_ID, process.env.MUX_TOKEN_SECRET);

    
    
    

    
    //const vid6 = data[6];
    //console.log(query)
    
    // async function LoadPosts() {
    // //     const fetchvid = new Moralis.Query("HighlightVideo");
    // // console.log(fetchvid)
    // // await fetchvid._where.video;
    // // const vidresult = await fetchvid.get("video");
    // // // console.log(picresult);
    // // if (vidresult.length < 1) return;
    // // //setPic(picresult[picresult.length - 1].get("pic"));
    // // console.log(vidresult);

    // console.log(data[0].get('video')._url)
    
    // //   profilePic.equalTo("owner", user.get("ethAddress"));
    // // const result = await profilePic.find();
    // // const fileurl = result[0].get("fileUrl");
    // // console.log(fileurl);
    


    // }
    // LoadPosts();

    return(
        <div className="bg-gg min-h-screen">
        <Header/>
        
        
        
        <h1 className="text-2xl font-bold flex flex-auto justify-center">Explore</h1>
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
            {/* {data &&
                data.map((item, index) => (
                    <div>
                    <h1 >{data[index].get("title")}</h1>
                        {/* <ReactPlayer 
                        className="pb-8"
                        controls
                         url={data[index].get("video")._url}/> */}


                        {/* <HoverVideoPlayer
                            videoSrc={data[index].get("video")._url}
                            
                            restartOnPaused
                            controls
                            muted={false}
                            pausedOverlay={
                                <img
                                src="thumbnail-image.jpg"
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







                         {/* <h1>{data[index].get("creatorAddress")}</h1>
                    </div>
            ))
            
            } */} 
            {data &&
                data.map((item, index) => (
                  
                    <div key={index}>
                    {data[index].get('video') ? 
                      <div className="">
                    <h1 className="flex justify-center text-white text-2xl pb-4 ">{data[index].get("title")}</h1>
                      <div className=" flex justify-center pb-6 ">
                      <VideoPlayer src={"https://stream.mux.com/" + data[index].get("video") + ".m3u8"} />
                      {/* <HoverVideoPlayer
                            videoSrc={data[index].get("video")}
                            restartOnPaused
                            controls
                            mited={false}
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
                         {/* <h1>{data[index].get("creatorAddress")}</h1> */}
                         </div>
                     : null}
                    </div>
            ))
            
            }
            
            </main>
        </div>      
        </div>
    )
}