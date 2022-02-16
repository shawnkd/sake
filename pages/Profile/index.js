import {useMoralis, useMoralisQuery} from "react-moralis"
import {useState, useEffect, useRef} from "react"
import Moralis from "moralis"
import Header from "../../components/Header"
import { create as ipfsHttpClient } from "ipfs-http-client";
import ReactPlayer from "react-player";
import Router from 'next/router'
import HoverVideoPlayer from 'react-hover-video-player';
import Hls from "hls.js";
import VideoPlayer from "../../components/VideoPlayer"
// import videojs from '@mux/videojs-kit';
// import '@mux/videojs-kit/dist/index.css';




export default function Profile() {

  const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

  const [fileUrl, setFileUrl] = useState(null);
  const [value, setValue] = useState(0);
  const [Error, setError] = useState(null);
  const [pic, setPic] = useState();


  
  var file;
  let profilePic;

  const {
    authenticate,
    isAuthenticated,
    logout,
    user,
    isWeb3Enabled,
    enableWeb3,
    isInitialized
  } = useMoralis();

  // const userAddress = () =>  user.get("ethAddress");

  const {data, error, isLoading} = useMoralisQuery("HighlightVideo4", query => query.descending('creatorAddress'))


  

  async function onChange(e) {
    file = e.target.files[0];

    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  //const { isInitialized, isAuthenticated, user } = useMoralis();
  // const ShowFile = () => {
  //   console.log(fileUrl);
  // if (fileUrl !== null) {

  // }
  // };

  const setMode = async () => {
    if (fileUrl === null) return;
    // showFile();
    // setshowFile(true);
    try {
      profilePic = new Moralis.Object("profilePic");
      console.log("created moralis object");
      profilePic.set("owner", user.get("ethAddress"));
      profilePic.set("pic", fileUrl);
      const uploadedPFP = await profilePic.save();
      console.log(uploadedPFP);
      console.log("uploaded a profile pic");
    } catch (e) {
      setError(e);
    }
  };

  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      //showFile();
      LoadPic();
    }
  }, [isInitialized, isAuthenticated]);

  async function LoadPic() {
    const fetchpic = new Moralis.Query("profilePic");
    // let test = await fetchpic.subscribe();
    // console.log(test);
    await fetchpic.equalTo("owner", user.get("ethAddress"));
    const picresult = await fetchpic.find();
    // console.log(picresult);
    if (picresult.length < 1) return;
    setPic(picresult[picresult.length - 1].get("pic"));
    console.log(pic);
    /*
      profilePic.equalTo("owner", user.get("ethAddress"));
    const result = await profilePic.find();
    const fileurl = result[0].get("fileUrl");
    console.log(fileurl);
    */
  }
  // = useRef(null);
  // const src = ''

  // useEffect(() => {
  //   let hls;
  //   if (videoRef.current) {
  //     const video = videoRef.current;

  //     if (video.canPlayType("application/vnd.apple.mpegurl")) {
  //       // Some browers (safari and ie edge) support HLS natively
  //       video.src = src;
  //     } else if (Hls.isSupported()) {
  //       // This will run in all other modern browsers
  //       hls = new Hls();
  //       hls.loadSource(src);
  //       hls.attachMedia(video);
  //     } else {
  //       console.error("This is a legacy browser that doesn't support MSE");
  //     }

  //     // I need to use unique ID for each as I have many video elements on the page.
  //     const videoEl = document.querySelector(`#video--${uuid} video`);
  //     var hls = new Hls();
  //     // Bind them together
  //     hls.loadSource(video);
  //     hls.attachMedia(video);
  //   }
  // }, []);

  // console.log(() => user.get("ethAddress"))




    return(
        <div className="bg-gg min-h-screen">
        <Header/>
            {isAuthenticated ? (
              <div>
        <h1 className="flex justify-center text-2xl font-bold text-white">Profile</h1>
        <h1 className="flex justify-center text-md font-bold p-5 text-white" >{user.get("ethAddress")}</h1>
        </div>
      ) : null}
      <main className="">
        {isAuthenticated ? (
          <div className="flex justify-center ">
            {fileUrl !== null ? (
              <img
                alt=""
                className="rounded mt-4"
                style={{ height: "150px", width: "150px" }}
                src={fileUrl}
              />
            ) : (
              <>
                {pic !== undefined ? (
                  <img
                    alt=""
                    className="rounded mt-4 rounded-full"
                    style={{ height: "150px", width: "150px" }}
                    src={pic}
                  />
                ) : null}{" "}
              </>
            )}
          </div>
        ) : null}
        <br />
        {isAuthenticated ? (
          <div className="flex justify-center">
            
              
            <input
              required
              type="file"
              name="NFT"
              className="my-2 mx-4 text-md font-bold rounded-md bg-new-green p-3 text-white "
              onChange={onChange}
            />
            <button onClick={setMode} className="text-md font-bold rounded-md bg-new-green p-3 text-white">
              {" "}
              Save
            </button>
            
          </div>
        ) : null}
        <div className="flex justify-center">
          <button className="p-5 font-bold text-white">my videos</button>
        </div>

        {data &&
                data.map((item, index) => (
                  
                    <div key={index}>
                    {data[index].get('creatorAddress') === user.get("ethAddress")  ? 
                      <div className="">
                    <h1 className="flex justify-center font-bold text-white">{data[index].get("title")}</h1>
                    <h1 className="p-4 flex justify-center font-bold text-white">{data[index].get("creatorAddress")}</h1>

                      <div className=" flex justify-center pb-6 ">
                      {/* <HoverVideoPlayer
                            videoSrc={ getVideo("https://stream.mux.com/" + data[index].get("video") + ".m3u8") }
                            restartOnPaused
                            controls
                            videoId=".hls-hover-video"
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
                            <VideoPlayer src={"https://stream.mux.com/" + data[index].get("video") + ".m3u8"}/>
                      </div>
                         </div>
                     : null}
                    </div>
            ))
            
            }

        </main>
        </div>
    )
}