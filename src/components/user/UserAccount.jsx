import React from 'react';
import { auth } from '../../utils/firebaseConfigures';

const UserAccount = () => {
    const signOut = async() => {
        await auth.signOut();
        location.reload();
    }

  return (
    <div>
        <button onClick={signOut}>Sign Out</button>
    </div>
  )
}

export default UserAccount