import {useMoralis} from "react-moralis"
import {useState, useEffect} from "react"
import Moralis from "moralis"
import Header from "../../components/Header"
import { create as ipfsHttpClient } from "ipfs-http-client";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export default function Profile() {

  const [fileUrl, setFileUrl] = useState(null);
  const [value, setValue] = useState(0);
  const [Error, setError] = useState(null);
  const [pic, setPic] = useState();
  var file;
  let profilePic;

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
    let test = await fetchpic.subscribe();
    console.log(test);
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
        <div>
        <Header/>
            {isAuthenticated ? (
        <h1 className="flex justify-center text-2xl">Profile</h1>
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
              className="my-2 mx-4 text-md font-bold rounded-md bg-indigo-500 p-3 text-white "
              onChange={onChange}
            />
            <button onClick={setMode} className="text-md font-bold rounded-md bg-indigo-500 p-3 text-white">
              {" "}
              Save
            </button>
            
          </div>
        ) : null}
        </main>
        </div>
    )
}