import { getAuth } from 'firebase/auth'
import React from 'react'
import app from '../../utils/firebaseConfigures'
import { useDispatch } from 'react-redux'
import { setUser } from '../../store/features/loggedInSlice'
import { useNavigate } from 'react-router-dom'

const UserAccount = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const signOut = async() => {
        const auth = getAuth(app);
        await auth.signOut();
        dispatch(setUser(null))
        navigate("/user/login")
    }

  return (
    <div>
        <button onClick={signOut}>Sign Out</button>
    </div>
  )
}

export default UserAccount