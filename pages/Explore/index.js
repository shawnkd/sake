import {useMoralis, useMoralisQuery} from 'react-moralis'
import Header from "../../components/Header"
import Moralis from "moralis"
import ReactPlayer from "react-player";


export default function Explore() {

    const {data, error, isLoading} = useMoralisQuery("HighlightVideo")

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
    LoadPosts()

    return(
        <div>
        <Header/>
        <h1 className="text-2xl font-bold flex flex-auto justify-center">Explore</h1>
        <ReactPlayer url={data[6]} />
        </div>
    )
}