import {useMoralis} from "react-moralis";
import { truncateAddress } from "../../utils/shortAddy";
import Link from 'next/link'
import {useRouter} from 'next/router'
// import {LoginButton } from "../LogInButton"




export default function Header() {

  const router = useRouter();


  const {
    authenticate,
    isAuthenticated,
    logout,
    user,
    isWeb3Enabled,
    enableWeb3,
  } = useMoralis();

    return(
        <div className="flex p-4 justify-center items-center content-center">
        <Link href="/Explore">
        <a className="text-2xl font-bold font-sans p-3 text-white"> molly 📸 </a>
        </Link>

{isAuthenticated ? <div className="flex flex-auto justify-center items-center place-content-center justify-self-center">

        <div className="flex flex-auto gap-4 p-3 justify-center items-center place-content-center justify-self-center ">
              <Link href="/Explore">
            <button className="font-sans font-bold text-white">explore</button>
            </Link>
          
          <Link href="/Profile">
          <a className="font-sans font-bold text-white">my tokens</a>
          </Link>
          <Link href="/MintForm">
            <a className="font-sans font-bold text-white">mint</a>
          </Link>
        </div>


        </div> : <div className="flex flex-auto justify-center items-center place-content-center justify-self-center">

        {/* <Link href="/Explore">
            <button className="font-sans font-bold text-white">explore</button>
            </Link> */}

        </div> }

        {/* <LoginButton/> */}


        

        <div>

          {!isAuthenticated ?

          <div>


          <button 
          className="rounded-ful hover:rounded-lg hover:bg-indigo-600 flex flex-auto text-md font-bold rounded-md bg-indigo-500 p-3 text-white"
          onClick={() => {
            authenticate({provider: "metamask"})
          } }
          >log in</button>



</div>
          :


          <div className="flex grid-row flex-col gap-2">
            
            <button 
            className="text-md  font-bold rounded-md bg-indigo-500 p-3 text-white "
            onClick={() => {
              router.push("/Explore");
              logout();
              
            } }
            
            >log out
            </button>

            <h1 className="text-md font-bold text-white">{truncateAddress(user.get("ethAddress"))}</h1>

          </div>

        }
        </div>


      </div>
    )
}