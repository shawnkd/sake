import {useMoralis, useMoralisQuery} from "react-moralis"
import {useState, useEffect} from "react"
import Moralis from "moralis"
import Header from "../../components/Header"
import { create as ipfsHttpClient } from "ipfs-http-client";
import ReactPlayer from "react-player";
import HoverVideoPlayer from 'react-hover-video-player';




export default function Profile() {

  const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

  const [fileUrl, setFileUrl] = useState(null);
  const [value, setValue] = useState(0);
  const [Error, setError] = useState(null);
  const [pic, setPic] = useState();


  
  var file;
  let profilePic;

  const {data, error, isLoading} = useMoralisQuery("HighlightVideo", query => query.descending('creatorAddress'))

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

  const { isInitialized, isAuthenticated, user } = useMoralis();
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




    return(
        <div className="bg-gg min-h-screen">
        <Header/>
            {isAuthenticated ? (
              <div>
        <h1 className="flex justify-center text-2xl">Profile</h1>
        <h1 className="flex justify-center text-md font-bold p-5" >{user.get("ethAddress")}</h1>
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
          <button className="p-5">my videos</button>
        </div>

        {data &&
                data.map((item, index) => (
                  
                    <div key={index}>
                    {data[index].get('creatorAddress') && user ? 
                      <div className="">
                    <h1 className="flex justify-center">{data[index].get("title")}</h1>
                      <div className=" flex justify-center pb-6 ">
                      <HoverVideoPlayer
                            videoSrc={data[index].get("video")._url}
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
                            />
                      </div>
                         {/* <h1>{data[index].get("creatorAddress")}</h1> */}
                         </div>
                     : null}
                    </div>
            ))
            
            }

        </main>
        </div>
    )
}