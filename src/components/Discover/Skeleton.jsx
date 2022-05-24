import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ListSkeleton from '../ListSkeleton'


export const CountryNewsSkeleton = () => {
    return (
        <>
          <ListSkeleton />
          <ListSkeleton />
          <ListSkeleton />
          <ListSkeleton />
          
        </>
      )
}
export const SourceSkeleton = () => {
    return (
        <>
          <ListSkeleton />
          <ListSkeleton />
          <ListSkeleton />
          
        </>
      )
}
export const DiscoverSkeleton = () => {
    return new Array(10).fill(20).map(el =>(
            <>
            <Skeleton style={{maxHeight:"550px" , height:"50vh" , width:"330px"}} />
            
            </>
      ))
    
}