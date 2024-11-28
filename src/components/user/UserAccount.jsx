import React from 'react';
import signOut from '../signOut';

const UserAccount = () => {

  return (
    <div className='p-10'>
        <button onClick={signOut} className='px-5 py-1.5 bg-zinc-800 text-zinc-100 rounded'>Sign Out</button>
    </div>
  )
}

export default UserAccount