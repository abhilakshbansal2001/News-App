import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const ListSkeleton = () => {

    const sizeCircle = 75;
    // {width:"15%" , display:'flex' , alignItems:"center" , flexDirection:'column'}

  return (
    <div style={{marginTop : "1rem" , marginBottom: "2rem" , display:"flex" , alignItems:"center"}}>
        <div style={{}}>
        <Skeleton
            circle
            height={sizeCircle}
            width={sizeCircle}
        />
        <Skeleton style={{marginTop: "10px"}} width={sizeCircle} />

        </div>
        <div style={{flex : 1 , paddingLeft:"2rem"}}>
        <Skeleton height={20} style={{marginBottom: "10px"}} />
        <Skeleton count={3} />

        </div>
    </div>
  )
}

export default ListSkeleton