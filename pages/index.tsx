import Head from 'next/head'
import Link from 'next/link'
import ReactTwitchEmbedVideo from "react-twitch-embed-video"
import { useState } from "react";
import CountUp from 'react-countup';

import { useMoralis } from "react-moralis";
import { truncateAddress } from "../utils/shortAddy";


export default function Home() {

  

  const [playing, setPlaying] = useState(false);

  const {
    authenticate,
    isAuthenticated,
    logout,
    user,
    isWeb3Enabled,
    enableWeb3,
  } = useMoralis();




  return (
    <div >
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex p-4">
        <h1 className="text-2xl font-bold p-3ß">sake</h1>

        <div className="flex flex-auto gap-4 p-3 justify-center">
          <a>explore</a>
          <a>my tokens</a>
          <a>trade</a>
        </div>

        <div>
          {!isAuthenticated ?
          <button 
          className="text-md font-bold rounded-md bg-indigo-500 p-3 text-white"
          onClick={() => {
            authenticate({provider: "metamask"})
          } }
          
          >log in</button>
          :
          <div className="flex grid-row gap-2">
            <h1 className="py-3  ">{truncateAddress(user.get("ethAddress"))}</h1>
            <button 
            className="text-md font-bold rounded-md bg-indigo-500 p-3 text-white"
            onClick={() => {
              logout()
            } }
            
            >log out
            </button>
          </div>

        }
        </div>


      </div>

      

      
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">

      
      {/* <ReactTwitchEmbedVideo className="p-4" channel="nickmercs" layout="video-with-chat" height="480" width="1080" onPlay={() => setPlaying } /> */}
        
      {/* <ReactTwitchEmbedVideo className="p-4" channel="nickmercs" layout="video-with-chat" height="480" width="1080" onPlay={() => setPlaying(true)} />
      { playing ? <div className="flex p-4 gap-2 py-4"><h1 className="font-bold">superfluid token stream</h1><CountUp end={100000} duration={500000} decimals={3}/> 
      <h1>tokens</h1></div> : <h1>count</h1>} */}

      <ReactTwitchEmbedVideo className="p-4" channel="nickmercs" layout="video-with-chat" height="480" width="1080" onPlay={() => setPlaying(true) } />
      { playing ? <div className="flex p-4 gap-2 py-4"><h1 className="font-bold">superfluid token stream</h1><CountUp end={100000} duration={500000} decimals={3}/> 
      <h1>tokens</h1></div> : <h1>count</h1>}
      
      
        

        
      </main>
      </div>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="ml-2 h-4" />
        </a>
      </footer>
    </div>
  )
}
