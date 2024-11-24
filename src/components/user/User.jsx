import React, { useEffect } from 'react'
import app from '../../utils/firebaseConfigures'
import { getAuth } from 'firebase/auth'
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from "../../store/features/loggedInSlice"
import UserAccount from './UserAccount';
import Login from './Login';
const User = () => {

    const userData = useSelector(state => state.loggedInUser.user)
    const dispatch = useDispatch();
    const auth = getAuth(app);
    const db = getFirestore(app);
    const fetchUser = () => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const docRef = doc(db, "users", `${user.uid}`);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    dispatch(setUser(docSnap.data()))
                } else {
                    console.log("No such document!");
                }
            }
        })
    }

    useEffect(() => {
        // fetchUser();
    }, [])

    return (
        <section className="user-section">
            {
                userData ?
                    <UserAccount />
                    :
                    <Login />
            }
        </section>
    )
}

export default User