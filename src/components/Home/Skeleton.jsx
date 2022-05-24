import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ListSkeleton from '../ListSkeleton'


export const TodaySkeleton =  () => {
  return (
    <div style={{padding : "2rem 5%"}}>

      <Skeleton style={{margin : "8px 0"}}  count={8} height={25} />
    </div>
  )
}
export const PastSkeleton =  () => {
  return (
    <div style={{display:"grid" , gridTemplateColumns : "1fr 1fr" , gridGap : "20px"}} >

      <Skeleton height={70} />
      <Skeleton height={70} />
      <Skeleton height={70} />
      <Skeleton height={70} />
    </div>
  )
}

export const ParsoSkeleton = () => {
  return (
    <div style={{padding : "2rem 5%"}}>
      <Skeleton height={400} style={{marginBottom : "2rem"}} />
      {/* <> */}
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
      </div>
    // </div>
  )
}