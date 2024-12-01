import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Logo from '../logo/Logo';
import { toast } from 'react-toastify';
import { auth, db } from '../../utils/firebaseConfigures';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import GoogleSignInBtn from '../auth/GoogleSignInBtn';


const SignUp = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
    const [passwordFlag, showPasswordFlag] = useState(false)
    const navigate = useNavigate();


    const submitHandler = async (data) => {
        try {
            await createUserWithEmailAndPassword(auth, data.email, data.password);
            const user = auth.currentUser;
            await setDoc(doc(db, "users", `${user.uid}`), {
                name: data.name,
                phone: parseInt(data.phone),
                email: data.email,
                isVerified: false,
                id: user.uid
            });
            await sendEmailVerification(user);
            await signInWithEmailAndPassword(auth, data.email, data.password);
            navigate("/verify");
        }
        catch (error) {
            toast.error(error.code);
        }
    }


    return (
        <div className='login-page h-fit rounded-2xl lg:mt-8 py-10 flex flex-col justify-center items-center'>
            <div className="form-container w-full lg:w-1/3 h-full px-5 lg:p-0">
                <div className='logo mx-auto w-fit'>
                    <Logo />
                </div>
                <form onSubmit={handleSubmit(submitHandler)} className='mt-[8vh]'>
                    <div className="form-group w-full border-t-zinc-400 border-t-[1px] p-3 mb-3">
                        <label className='login-label uppercase opacity-85' htmlFor='login-name'>Fullname</label>
                        <input
                            {...register("name", {
                                required: "Name is required",
                                minLength: { value: 2, message: "Name must be at least 2 characters" }
                            })}
                            type='text'
                            id='login-name'
                            className='login-inp placeholder:text-[0.85rem]'
                            placeholder='Enter your fullname'
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>
                    <div className="form-group w-full border-t-zinc-400 border-t-[1px] p-3 mb-3">
                        <label className='login-label uppercase opacity-85' htmlFor='login-number'>Phone number</label>
                        <input
                            {...register("phone", {
                                required: "Phone number is required",
                                pattern: { value: /^[0-9]{10}$/, message: "Please enter a valid 10-digit phone number" }
                            })}
                            type='number'
                            id='login-number'
                            className='login-inp placeholder:text-[0.85rem]'
                            placeholder='Enter your number'
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                    </div>
                    <div className='form-group w-full border-t-zinc-400 border-t-[1px] p-3 mb-3'>
                        <label className='login-label uppercase opacity-85' htmlFor='login-email'>Email</label>
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address" }
                            })}
                            type='email'
                            id='login-email'
                            className='login-inp placeholder:text-[0.85rem]'
                            placeholder='Enter your email'
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>
                    <div className='form-group w-full border-t-zinc-400 border-t-[1px] p-3 mb-3'>
                        <label className='login-label uppercase opacity-85' htmlFor='login-password'>Password</label>
                        <div className="login-pass-container w-full relative">
                            <input
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 8, message: "Password must be at least 8 characters" },
                                    pattern: {
                                        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                                        message: "Password must contain at least one letter, one number and one special character"
                                    }
                                })}
                                type={passwordFlag ? "text" : "password"}
                                id='login-password'
                                className='login-inp placeholder:text-[0.85rem]'
                                placeholder='Enter your password'
                            />
                            <span onClick={() => showPasswordFlag(prev => !prev)} className={`flex justify-center items-center absolute top-[50%] -translate-y-[50%] right-0 h-[30px] w-[30px] rounded text-white ${passwordFlag ? "bg-zinc-800  opacity-100" : "bg-[#888888] opacity-80"} hover:opacity-100 duration-300 transition-all`}>?</span>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>
                    <div className='form-group w-full'>
                        <button type='submit' className={`login-btn w-full bg-zinc-100 rounded-md py-2 font-semibold text-zinc-800 ${isSubmitting ? 'cursor-not-allowed' : ''}`} disabled={isSubmitting}>Sign Up</button>
                    </div>
                </form>
                <div className='form-group grid grid-cols-2 gap-3 sign-in-btn-container w-full mt-5'>
                    <span className='col-span-2'>Already have an account?</span>
                    <Link to="/login" className='w-full flex justify-center items-center bg-zinc-100 py-2 gap-1 rounded-md'> Sign In</Link>
                    
                    {/* Sign in with GOOGLE button */}
                    <GoogleSignInBtn />
                </div>
            </div>
        </div>
    )
}

export default SignUp