import React from 'react'

const AddUpdateProduct = ({action=null, data=null}) => {
  return (
    <div className='popup-bg w-full h-full min-h-[80vh] bg-[#0000005d] absolute top-0 left-0'>
        <h2>{action ? "Add Product" : "Update Product"}</h2>
        <form>
            
        </form>
    </div>
  )
}

export default AddUpdateProduct