import {useMoralis} from "react-moralis";
import { truncateAddress } from "../../utils/shortAddy";
import Link from 'next/link'
// import {LoginButton } from "../LogInButton"




export default function Header() {


  const {
    authenticate,
    isAuthenticated,
    logout,
    user,
    isWeb3Enabled,
    enableWeb3,
  } = useMoralis();

    return(
        <div className="flex p-4">
        <h1 className="text-2xl font-bold p-3 text-white">molly</h1>

        <div className="flex flex-auto gap-4 p-3 justify-center items-center place-content-center justify-self-center ">
            <Link href="/Explore">
          <a className="font-sans font-bold text-white">explore</a>
          </Link>
          <Link href="/Profile">
          <a className="font-sans font-bold text-white">my tokens</a>
          </Link>
          <Link href="/MintForm">
            <a className="font-sans font-bold text-white">mint</a>
          </Link>
        </div>

        {/* <LoginButton/> */}


        

        <div>
          {!isAuthenticated ?
          <button 
          className=" flex flex-auto text-md font-bold rounded-md bg-indigo-500 p-3 text-white"
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
    )
}