import {useMoralis, useMoralisQuery} from 'react-moralis'
import Header from "../../components/Header"
const Moralis = require("moralis");
import ReactPlayer from "react-player";
import HoverVideoPlayer from 'react-hover-video-player';



export default function Explore() {

    const {data, error, isLoading} = useMoralisQuery("HighlightVideo", query => query.descending('video'))

    
    //const vid6 = data[6];
    //console.log(query)
    
    async function LoadPosts() {
        const fetchvid = new Moralis.Query("HighlightVideo");
    console.log(fetchvid)
    await fetchvid._where.video;
    const vidresult = await fetchvid.get("video");
    // console.log(picresult);
    if (vidresult.length < 1) return;
    //setPic(picresult[picresult.length - 1].get("pic"));
    console.log(vidresult);
    /*
      profilePic.equalTo("owner", user.get("ethAddress"));
    const result = await profilePic.find();
    const fileurl = result[0].get("fileUrl");
    console.log(fileurl);
    */


    }
    //LoadPosts()

    return(
        <div>
        <Header/>
        <h1 className="text-2xl font-bold flex flex-auto justify-center">Explore</h1>
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
            {data &&
                data.map((item, index) => (
                    <div>
                    <h1>{data[index].get("title")}</h1>
                        {/* <ReactPlayer 
                        className="pb-8"
                        controls
                         url={data[index].get("video")._url}/> */}


                        <HoverVideoPlayer
                            videoSrc={data[index].get("video")._url}
                            restartOnPaused
                            controls
                            mited={false}
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
                            />







                         <h1>{data[index].get("creatorAddress")}</h1>
                    </div>
            ))
            
            }
            </main>
        </div>      
        </div>
    )
}