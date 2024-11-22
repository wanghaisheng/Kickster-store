import React, { useState } from 'react'
import Logo from '../logo/Logo'
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Login = () => {
    const [passwordFlag, showPasswordFlag] = useState(false);
    const { action } = useParams();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const submitHandler = (data) => {
        console.log(data);
    }

    return (
        <div className='login-page h-fit rounded-2xl mt-8 py-5 pb-20 flex flex-col justify-center items-center'>
            <div className={`sign-up-btn-container w-full text-right px-10 mb-5 text-zinc-800`}>
                {action === "login" ? "Don't" : "Already"} have an account?
                <Link to={`/user/${action === "login" ? "signup" : "login"}`} className='underline font-semibold'> {action === "login" ? "Sign Up" : "Sign In"}</Link>
            </div>
            
            <div className="form-container w-1/3 h-full">
                <div className='logo mx-auto w-fit'>
                    <Logo />
                </div>
                <form onSubmit={handleSubmit(submitHandler)} className='mt-[8vh]'>
                    <div className={`form-group ${action === "login" && "hidden"} w-full border-t-zinc-400 border-t-[1px] p-3 mb-3`}>
                        <label className='login-label uppercase opacity-85' htmlFor='login-name'>Fullname</label>
                        <input 
                            {...register("name", { 
                                required: action === "signup" ? "Name is required" : false,
                                minLength: { value: 2, message: "Name must be at least 2 characters" }
                            })} 
                            type='text' 
                            id='login-name' 
                            className='login-inp placeholder:text-[0.85rem]' 
                            placeholder='Enter your fullname' 
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>
                    <div className={`form-group ${action === "login" && "hidden"} w-full border-t-zinc-400 border-t-[1px] p-3 mb-3`}>
                        <label className='login-label uppercase opacity-85' htmlFor='login-number'>Phone number</label>
                        <input 
                            {...register("phone", {
                                required: action === "signup" ? "Phone number is required" : false,
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
                            <span onClick={() => showPasswordFlag(prev => !prev)} className='flex justify-center items-center absolute top-[50%] -translate-y-[50%] right-0 h-[30px] w-[30px] rounded bg-zinc-400 text-white opacity-80'>?</span>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>
                    <div className='form-group w-full'>
                        <button type='submit' className='login-btn w-full bg-zinc-100 rounded-md py-2 font-semibold text-zinc-800'>{action === "login" ? "Sign In" : "Sign Up"}</button>
                    </div>
                    <div className={`form-group ${action === "signup" && "hidden"} w-full mt-3`}>
                        <Link to="/password reset" className='underline text-[0.95rem]'>Forgot Password?</Link>
                    </div>
                    <div className='form-group w-full mt-3'>
                        <button type='button' className='w-full flex justify-center items-center bg-zinc-100 py-2 gap-1 rounded-md'>
                            <span className='inline-block'>Sign in with</span>
                            <img className='h-[20px]' src="../../../assets/logo/google.png" alt="" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login