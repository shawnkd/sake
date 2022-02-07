import {useMoralis} from 'react-moralis';
import { useState, useRef } from "react";
import ReactPlayer from "react-player";
import { useFormik } from "formik";
import * as Yup from "yup";
import LoadingBar from 'react-top-loading-bar';
import Moralis from "moralis"
import Header from "../../components/Header"

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export default function MintForm() {
    
    
    const [fileUrl, setFileUrl] = useState(null);
    const [Error, setError] = useState("");
    const [uploaded, setUploaded] = useState(false);
    const ref = useRef(null)
    const [confirm, setConfirm] = useState()

    const {
        authenticate,
        isAuthenticated,
        logout,
        user,
        isWeb3Enabled,
        enableWeb3,
      } = useMoralis();

    const saveAsset = async () => {
        try {
          // save the video to ipfs
          const videodata = highlight.file;
          const vidfile = new Moralis.File(highlight.file.name, videodata);
        //   const savedVid = await vidfile.saveIPFS();
        //   console.log(savedVid);
        //   console.log("saved video to ipfs");
          // save the json to ipfs
          const jsonfile = new Moralis.File("file.json", {
            base64: btoa(JSON.stringify(highlight)),
          });
    
          //save video w Moralis Object
    
          const highlightFile = new Moralis.Object("HighlightVideo");
          console.log("created moralis object");
          highlightFile.set("title", highlight.title);
          highlightFile.set("creatorAddress", highlight.creatorAddress)
          highlightFile.set("description", highlight.description);
          highlightFile.set("video", vidfile);
          highlightFile.set("edition", highlight.supply);
          highlightFile.set("price", highlight.price);
          const uploadedVid = await highlightFile.save();
          console.log(uploadedVid);
          console.log("uploaded video to cloud");
          setUploaded(true)
          const savedFile = await jsonfile.saveIPFS();
          console.log("i saved this file first", savedFile);
          console.log("saved json to ipfs");
        } catch (err) {
          setError(err);
          console.log("error error error error", Error);
        }
      };


    const [highlight, setHighlight] = useState({
        creatorAddress: "",
        title: "",
        description: "",
        file: [],
        supply: "",
        price: "",
        uri: ""
      });

      async function onChange(e) {
        let file = e.target.files[0];
        formik.setFieldValue("file", file);
        try {
          const added = await client.add(file, {
            progress: (prog) => console.log(`received: ${prog}`),
          });
          const url = `https://ipfs.infura.io/ipfs/${added.path}`;
          setFileUrl(url);
        } catch (error) {
          file = null;
          setFileUrl(null);
          setError(error);
          console.log("Error uploading file: ", Error);
        }
      }

      const formik = useFormik({
        initialValues: {
          title: "",
          description: "",
          file: [],
          supply: "",
          price: "",
        },
        validationSchema: Yup.object({
          title: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required ⚠️"),
          description: Yup.string()
            .max(200, "Must be 200 characters or less")
            .required("Required ⚠️"),
          file: Yup.mixed()
            .required("We need a video!")
            // .test("fileSize", "Your video is too big :(", (values) => {
            //   console.log(values.size);
            //   return values && values.size <= 2621440000000;
            ,
          supply: Yup.number().positive().integer().required("Required ⚠️"),
          price: Yup.number().positive().required("Required ⚠️"),
        }),
        onSubmit: (values) => {
          setTimeout(async () => {
            () => ref.current.continuousStart()
            await setHighlight({
              creatorAddress: user.get("ethAddress").toString(),
              title: values.title,
              description: values.description,
              file: values.file,
              supply: values.supply,
              price: values.price,
            });
            await saveAsset();
            //   console.log(values.title)
            //   console.log(values.description)
            //   console.log(values.file)
            //   console.log(values.editions)
            //   console.log(values.price)
            console.log(await highlight)
            console.log("submit")
            ref.current.complete()
          }, 400);
           ;
        },
      });


    return(
      <div>
      <Header/>
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <div className="w-full max-w-xs ">
        
        <LoadingBar color='new-green' ref={ref} />
        { isAuthenticated && !uploaded ? <div>
            <h1>Mint Form</h1>
            <form 
            className="bg-custom-gray shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
            >
                <div className="mb-4">
                <label className="px-6 flex block text-white text-sm font-bold mb-2" for="title">
                    Title
                </label>
                {/* <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"></input> */}
                <input {...formik.getFieldProps("title")} type="text" id="title" className="px-4 py-3 rounded-md"/>
                {formik.touched.title && formik.errors.title ? (
                  <div>{formik.errors.title}</div>
                ) : null}
                </div>
                <div className="mb-4">
                <label className="px-6 flex block text-white text-sm font-bold mb-2" for="title">
                    Description
                </label>
                <textarea
                 type="text"
                 id="description"
                 className="px-4 py-3 rounded-md"
                {...formik.getFieldProps("description")}
                />
                </div>
                {formik.touched.description && formik.errors.description ? (
                  <div>{formik.errors.description}</div>
                ) : null}

                <div className="mb-4">
                {fileUrl !== null && file !== null ? (
                  <>
                    <label htmlFor="text">Preview Clip</label>

                    <div style={{ border: "3px solid #6bf1a7" }} className=" ">
                      <ReactPlayer playing={true} controls url={fileUrl} />
                    </div>
                  </>
                ) : (
                  console.log("not not null")
                )}
                
                <label  className="px-6 flex block text-white text-sm font-bold mb-2" type="file">
                    Video File
                </label>
                <input onChange={onChange} className="px-5 text-white" type="file"/>
                </div>
                {formik.touched.file && formik.errors.file ? (
                  <div>{formik.errors.file}</div>
                ) : null}



                <div className="mb-4">
                <label className="px-6 flex block text-white text-sm font-bold mb-2" for="supply">
                    Supply
                </label>
                <input
                id="supply" 
                {...formik.getFieldProps("supply")}
                 type="text"
                  className="px-4 py-3 rounded-md"

                  />
                </div>
                {formik.touched.supply && formik.errors.supply ? (
                  <div>{formik.errors.supply}</div>
                ) : null}


                <div className="mb-6">
                <label className="px-6 flex block text-white text-sm font-bold mb-2" for="title">
                    Price
                </label>
                <input id="price" {...formik.getFieldProps("price")} type="text" className="px-4 py-3 rounded-md"/>
                </div>
                {formik.touched.price && formik.errors.price ? (
                  <div>{formik.errors.price}</div>
                ) : null}

                <div className="flex items-center justify-center">
                <button type="submit" className="bg-new-green hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Mint
                </button>
                </div>
            </form>
            </div>:<div className="flex items-center justify-center space-x-2">
                    <div clasNamw="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-grow inline-block w-12 h-12 bg-current rounded-full opacity-0" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    </div>
 }
        </div>
        </main>
        </div>
        </div>
    )
}