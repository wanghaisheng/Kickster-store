import { signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import React from 'react'
import { auth, db } from '../../utils/firebaseConfigures';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import googleLogo from '../../../assets/logo/google.png';
import { toast } from 'react-toastify';

const GoogleSignInBtn = () => {

    const navigate = useNavigate();

    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        try {
            await signInWithPopup(auth, provider);
            const user = auth.currentUser;
            const docRef = doc(db, "users", `${user.uid}`);
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) {
                await setDoc(docRef, {
                    name: user.displayName,
                    phone: user.phoneNumber && user.phoneNumber,
                    email: user.email,
                    role: "user",
                    cart: [],
                    wishlist: [],
                    orders: [],
                    isVerified: true
                });
            }
            toast.success("Signed In successfully!");
            navigate("/user");
        }
        catch (error) {
            toast.error(error.code);
        }
    }
    return (
        <button onClick={loginWithGoogle} type='button' className='w-full flex justify-center items-center bg-zinc-100 py-2 gap-1 rounded-md'>
            <span className='inline-block'>Sign in with</span>
            <img className='h-[20px]' src={googleLogo} alt="" />
        </button>
    )
}

export default GoogleSignInBtn