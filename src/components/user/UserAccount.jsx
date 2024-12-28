import React from 'react';
import signOut from '../auth/signOut';
import { auth } from '../../utils/firebaseConfigures';
import { Link } from 'react-router-dom';

const UserAccount = () => {
  const user = auth.currentUser;
  return (
    <div className='p-5'>
      <h2> Welcome, <span className='font-semibold'>{user && user.email}</span><br /><Link to="/" className='text-white bg-zinc-800 px-3 py-1 rounded'>Go back</Link> to the HOMEPAGE<br />to EXPLORE <br /><br /> OR</h2>
      <button onClick={signOut} className='mt-5 px-5 py-1.5 bg-zinc-800 text-zinc-100 rounded'>Sign Out</button>
    </div>
  )
}

export default UserAccount