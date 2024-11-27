import React from 'react';
import signOut from '../signOut';

const UserAccount = () => {

  return (
    <div>
        <button onClick={signOut}>Sign Out</button>
    </div>
  )
}

export default UserAccount