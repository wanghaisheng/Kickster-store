import React from 'react'
import loading from "../../../assets/images/loading.gif"
const Loader = () => {
  return (
    <div className="w-full h-[80vh] flex justify-center items-center"><img className="h-[80px]" src={loading} alt="" /></div>
  )
}

export default Loader