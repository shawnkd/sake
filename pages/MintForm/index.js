import {useMoralis, useMoralisFile} from 'react-moralis';
import { useState, useRef, useEffect, } from "react";
import ReactPlayer from "react-player";
import { useFormik } from "formik";
import * as Yup from "yup";
import Moralis from "moralis"
import Header from "../../components/Header"
import { create as ipfsHttpClient } from "ipfs-http-client";
//import Mux from '@mux/mux-node';
import * as UpChunk from '@mux/upchunk'
import useSWR from 'swr'
//import Mux  from '@mux/mux-node'
import { useRouter, Router } from 'next/router'






export default function MintForm() {

  const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");
  let index = 0;

  const [isUploading, setIsUploading] = useState();
  const [isPreparing, setIsPreparing] = useState(false)
  const [progress, setProgress] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const inputRef = useRef(null)
  const [uploadId, setUploadId] = useState()
  const [uploadUrl, setUploadUrl] = useState(null);
  const [uploadDone, setUploadDone] = useState(false)
  const [savedToDB, setSavedToDB] = useState(0);
  const [playback, setPlayback] = useState();

  const [asset, setAsset] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
    const [Error, setError] = useState("");
    const [uploaded, setUploaded] = useState(false);
    const [file, setFile] = useState()
    

    const [highlight, setHighlight] = useState({
      creatorAddress: "",
      title: "",
      description: "",
      file: [],
      supply: "",
      price: ""
    });

    const {
        isAuthenticated,
        user,
      } = useMoralis();

      const fetcher = (url) => {
        return fetch(url).then((res) => res.json())
      }
    

      const { data: data, error } = useSWR(`/api/upload/${uploadId}`, fetcher)

      const { data: assetData } = useSWR(`/api/asset/${data && data.upload && data.upload.asset_id}`, fetcher)

      

      //const { assetData, assetError } = useSWR(`/api/asset/${data && data.upload && data.upload.asset_id}`, fetcher)


      // const { assetData, assetError } = useSWR(`/api/asset/${asset}`, fetcher)
      
      
      console.log(data && data.upload)
      console.log(assetData && assetData.asset)
      
      // console.log("status: ", data && data.upload && data.upload.status)
      // console.log("asset: ", data && data.upload && data.upload.asset_id)

      
      

      
      // if(data && data.upload && data.upload.status && data.upload.asset_id){
      //    setAsset(data.upload.asset_id);
      //   }

      
      // const { data, error } = useSWR(
      //   () => ( isPreparing ? `/api/uploads/${uploadId}` : null),
      //   fetcher,
      //   { refreshInterval: 5000 },
      // );
    
    
      // const upload = data && data.upload;
      // console.log(data)
      // //setAsset(upload.asset_id)
      //   //console.log(upload + "upload before")
      //   useEffect(() => {
      //     if (upload && upload.asset_id) {
      //       Router.push({
      //         pathname: `/asset/${upload.asset_id}`,
      //         scroll: false,
      //       })
      //       //set(upload.asset.id)
      //     }
      //   }, [upload])
      
    
      // if (error) return "An error has occurred.";
      // if (!data) return "Loading...";

      //const { data, error } = useSWR('/api/asset', fetcher)

      const createUpload = async () => {
        try{
          return fetch('/api/upload', {
            method: 'POST',
          })
            .then((res) => res.json())
            .then(({id, url}) => {
              const upload_id = id;
              setUploadId(upload_id);
              console.log("upload id during upload", id)
              const upload_url = url;
              setUploadUrl(upload_url)
              console.log("url: ", url)
              return url
            });
        } catch (e) {
            console.error('Error in createUpload', e); // eslint-disable-line no-console
            setErrorMessage('Error creating upload');
            
        }
      }

      const getAsset = async () => {
        try {
          return fetch(`/api/asset/`, {
            method: 'GET',
          })
          .then((res) => res.json()
          .then(({asset}) => {
            //setAsset(asset_id)
            console.log("asset", asset)
            
          }))
        } catch {
          console.error('Error in getting asset', e); // eslint-disable-line no-console
            setErrorMessage('Error getting asset');
        }
      }


      const startUpload = async (file) => {
        console.log("start upload");
    
        setIsUploading(true);
        try {
          const upload = UpChunk.createUpload({
            endpoint: createUpload,
            file: file,
          });

          
          console.log(upload, "upload")
    
          upload.on('error', (err) => {
            setErrorMessage(err.detail);
          });
    
          upload.on('progress', (progress) => {
            setProgress(Math.floor(progress.detail));
          });
    
          upload.on('success', () => {
            console.log('success upload')
            setIsPreparing(true);
          });
        } catch (err) {
          setErrorMessage(err.toString());
          console.log(errorMessage)
        }
        setUploadDone(true);
      };

      const startGetAsset = async () => {
        console.log("start get asset");
  
        try {
          const get = getAsset({
            upload_id: uploadId
          });

          
          await console.log(get, "get")
    
          get.on('error', (err) => {
            setErrorMessage(err.detail);
          });
    
          get.on('progress', (progress) => {
            //setProgress(Math.floor(progress.detail));
          });
    
          get.on('success', () => {
            console.log('success upload')
            
          });
        } catch (err) {
          setErrorMessage(err.toString());
          console.log(errorMessage)
        }
        
      };


      const saveAsset = async (id) => {
        console.log("start save asset")
        if(uploaded == true) {
          console.log("already uploaded to DB")
        }
        try {
        const videodata = highlight.file;
        const vidfile = new Moralis.File(highlight.file.name, videodata);
  

        const highlightFile = new Moralis.Object("HighlightVideo4");
          console.log("created moralis object");
          highlightFile.set("title", highlight.title);
          console.log("set Title");
          highlightFile.set("creatorAddress", user.get("ethAddress").toString())
          console.log("set creatorAddress");
          highlightFile.set("description", highlight.description);
          console.log("set description");
          highlightFile.set("video", id)
          console.log("set video");
          highlightFile.set("supply", highlight.supply);
          console.log("set supply");
          highlightFile.set("price", highlight.price);
          console.log("set price");
          
          
          const uploadedVid = await highlightFile.save();
          () => console.log(uploadedVid);
          console.log("uploaded video to cloud");
          setUploaded(true)
  
          
          return ;

          
        
          // let vidfile = await saveFile(highlight.file.name, videodata);
          // // const savedVid = await vidfile.saveIPFS();
          // // console.log(savedVid);
          // // console.log("saved video to ipfs");

          // // save the json to ipfs
          const jsonfile = new Moralis.File("file.json", {
            base64: btoa(JSON.stringify(highlight)),
          });

          
          //await saveHighlight(highlight, vidfile, jsonfile )
          //save video w Moralis Object
        } catch (err) {
          setError(err);
          console.log("error error error error", Error);
        }
      
      };

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
        onSubmit: async (values, { setSubmitting }) => {
          await setTimeout( () => {

            console.log("submit")
            setSubmitting(false)

            if(!uploadDone) {
            startUpload(values.file)
            }
            console.log(uploadId, "uploadId")

            //console.log(upload, 'upload')
            console.log(highlight)

            setHighlight({
              creatorAddress: user.get("ethAddress").toString(),
              title: values.title,
              description: values.description,
              file: values.file,
              supply: values.supply,
              price: values.price,
            }); 
          }, 400);
        },
      });

      
      useEffect(() => {
        
        // if(uploadDone && uploadId && !uploaded && (index<1)) {
          
          if(data && data.upload && data.upload.status === 'asset_created')
          {
          
          //setAsset(data.upload.asset_id)
          console.log("status: ", data && data.upload && data.upload.status)
          console.log("asset id: ", data && data.upload && data.upload.asset_id)
          
          
          // console.log("playback id: ", assetData && assetData.asset && assetData.asset.playback_id)

          index++;

          console.log('getting asset info')
          // startGetAsset()
          //getUpload()
          
          console.log(assetData && assetData.asset && assetData.asset.playback_id, "playback_id")

          console.log("start upload to moralis",highlight, " and ", assetData && assetData.asset)
          // saveAsset(assetData && assetData.asset && assetData.asset.playback_id)
          
          console.log(index, "index")
        }
      
        // }
      
      }, [data && data.upload && data.upload.asset_id])





      useEffect(() => {
        if(assetData && assetData.asset && assetData.asset.playback_id) {
          console.log(assetData.asset.playback_id, "playback_id")
          console.log("start upload to moralis",highlight, " and ", assetData && assetData.asset)
          saveAsset(assetData && assetData.asset && assetData.asset.playback_id)

        }
      }, [assetData && assetData.asset && assetData.asset.playback_id])
      
      // useEffect(() => {
      //   if(uploadDone && uploadId) {
      //     console.log('getting asset info')
      //     startGet()
      //   }
      // }, [uploadDone])
      

    return(
      <div className="min-h-screen bg-gg">
      <Header/>
      <div className="flex  flex-col items-center justify-center py-2">
      <main className="bg-custom-gray rounded-2xl shadow-md  flex  flex-1 flex-col items-center justify-center px-20 text-center">
        <div className="w-full max-w-xs ">
        
        
        { isAuthenticated  ? <div>
            <h1 className="text-2xl text-white font-bold pt-8">Create a Highlight</h1>
            <form 
            className="rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
            >
                <div className="mb-4">
                <label className="px-6 flex block text-white text-sm font-bold mb-2" htmlFor="title">
                    Title
                </label>
                {/* <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"></input> */}
                <input {...formik.getFieldProps("title")} type="text" id="title" className="px-4 py-3 rounded-md"/>
                {formik.touched.title && formik.errors.title ? (
                  <div>{formik.errors.title}</div>
                ) : null}
                </div>
                <div className="mb-4">
                <label className="px-6 flex block text-white text-sm font-bold mb-2" htmlFor="title">
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
                    <label htmlFor="text" className="text-white text-sm font-bold">Preview Clip</label>

                    <div className="flex flex-col items-center justify-center">
                      <ReactPlayer className='' playing={true} controls url={fileUrl} />
                    </div>
                  </>
                ) : (
                  console.log("preview empty")
                )}
                
                <label  className="px-6 flex block text-white text-sm font-bold mb-2" type="file">
                    Video File
                </label>
                <input onChange={onChange} className="px-5 text-white" type="file" ref={inputRef}/>
                </div>
                {formik.touched.file && formik.errors.file ? (
                  <div>{formik.errors.file}</div>
                ) : null}



                <div className="mb-4">
                <label className="px-6 flex block text-white text-sm font-bold mb-2" htmlFor="supply">
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
                <label className="px-6 flex block text-white text-sm font-bold mb-2" htmlFor="title">
                    Price
                </label>
                <input id="price" {...formik.getFieldProps("price")} type="text" className="px-4 py-3 rounded-md"/>
                </div>
                {formik.touched.price && formik.errors.price ? (
                  <div>{formik.errors.price}</div>
                ) : null}

                <div className="flex items-center justify-center">
                { !isUploading ?
                <button type="submit" className="bg-new-green hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Mint
                </button>
                :
                <div>
                  
                  <h1 className="bg-new-green hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Loading...</h1>
                </div>
                
                }
                </div>
                
            </form>
            </div>:<div className="flex items-center justify-center space-x-2">
                    
                    
                    </div>
 }
        </div>
        </main>
        </div>
        </div>
    )
}