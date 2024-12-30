import React, { useState } from 'react'
import Logo from '../logo/Logo'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../utils/firebaseConfigures';
import { toast } from 'react-toastify';
import GoogleSignInBtn from './GoogleSignInBtn';

const Login = () => {
    const [passwordFlag, showPasswordFlag] = useState(false);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const navigate = useNavigate();


    const submitHandler = async (data) => {
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            toast.success("Signed In successfully!");
            navigate("/login")
        }
        catch (error) {
            if (error.code === "auth/invalid-credential") {
                toast.error("Invalid Credentials!");
            }
            else {
                toast.error("Some error occurred!");
            }
        }
    }


    return (
        <div className='login-page gray-gradient h-fit rounded-2xl lg:mt-8 py-20 lg:py-10 flex flex-col justify-center items-center relative'>
            <div className="user-dets flex w-full justify-between lg:flex-col lg:w-fit lg:justify-center gap-5 absolute bottom-[20px] left-0 px-5 text-[0.7rem] lg:text-[0.8rem]">
                <div className="custom-dets">
                    <span className='block'>User id: user@kickster.app</span>
                    <span className='block'>pass: User@2024</span>
                </div>
                <div className="admin-dets">
                    <span className='block'>Admin id: admin@kickster.app</span>
                    <span className='block'>pass: Admin@13042002</span>
                </div>
            </div>
            <div className="form-container w-full lg:w-1/3 h-full px-5 lg:p-0">
                <div className='logo mx-auto w-fit'>
                    <Logo />
                </div>
                <form onSubmit={handleSubmit(submitHandler)} className='mt-[8vh]'>
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
                        <div className='form-group w-full text-right mt-3'>
                            <Link to="/password reset" className='underline text-[0.95rem]'>Forgot Password?</Link>
                        </div>
                    </div>
                    <div className='form-group w-full'>
                        <button type='submit' disabled={isSubmitting} className='login-btn w-full bg-zinc-100 rounded-md py-2 txt-medium text-zinc-800'>Sign In</button>
                    </div>
                    <div className='form-group w-full mt-3'>
                        {/* Sign in with GOOGLE button */}
                        <GoogleSignInBtn />
                    </div>
                    <div className='form-group w-full mt-3'>
                        Don't have an account? <Link to="/signup" className='underline text-[0.95rem] txt-medium'> Sign Up</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login