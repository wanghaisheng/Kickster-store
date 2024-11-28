import React from 'react'

const Verify = () => {
    const reloader = () => {
        window.location.assign("/login");
    }

  return (
    <div className='h-[80vh] w-full flex justify-center items-center'>
        <p className='w-[45ch]'>
            <h1 className='text-[2.3rem] leading-none mb-3'>Please verify your <span className='underline'>email</span> to continue</h1>
            <span className='text-zinc-800'>Verify your email address to continue. Check your inbox for the verification link. If you haven't received it, please check your spam folder.</span>
            <br />
            <br />
            <span className='text-zinc-950'>
            If verified please continue <span onClick={reloader} className='text-blue-600 underline font-semibold'>here</span> and wait for few seconds for verification on our end.
            </span>
        </p>
    </div>
  )
}

export default Verify