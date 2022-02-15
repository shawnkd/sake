import { useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'
import useSwr from 'swr'
import {useMoralis, useMoralisQuery} from 'react-moralis'


const fetcher = (url) => {
  return fetch(url).then((res) => res.json())
}


export default function Asset() {
  const router = useRouter()

  const {moralisData, error, isLoading} = useMoralisQuery("HighlightVideo4")

//   const { data, error } = useSWR(`/api/asset/${moralisData.get('video')}`, fetcher, { refreshInterval: 5000 })

//   const { data, error } = useSwr(
//     () => (router.query.id ? `/api/asset/${moralisData.get('video')}` : null),
//     fetcher,
//     { refreshInterval: 5000 }
//   )

  const asset = data && data.asset

  useEffect(() => {
    if (asset && asset.playback_id && asset.status === 'ready') {
      console.log(asset && asset.playback_id)
    }
  }, [asset])

  let errorMessage

  if (error) {
    errorMessage = 'Error fetching api'
  }

  if (data && data.error) {
    errorMessage = data.error
  }

  if (asset && asset.status === 'errored') {
    const message = asset.errors && asset.errors.messages[0]
    errorMessage = `Error creating this asset: ${message}`
  }

  return (
    <div></div>
  )
}