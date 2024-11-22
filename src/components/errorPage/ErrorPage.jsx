import React from 'react'

const ErrorPage = ({message}) => {
  return (
    <div className='h-[80vh] flex justify-center items-center'>
        <p className='text-[1.2rem] text-zinc-400 w-[45ch]'>{message}</p>
    </div>
  )
}

export default ErrorPage