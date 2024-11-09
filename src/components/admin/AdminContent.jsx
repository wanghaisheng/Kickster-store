import React from 'react'
import { useParams } from 'react-router-dom'

const AdminContent = () => {
    const { section } = useParams();
  return (
    <div>{section+" section"}</div>
  )
}

export default AdminContent