import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import shoe from '../../../../assets/images/shoeNobgL-min.png'

const Hero = () => {
    gsap.registerPlugin(useGSAP);
    useGSAP(() => {
        gsap.from(".main-heading-txt", {
            y: "60vh",
            duration: 1.2,
            delay: 0.2,
            stagger: 0.1,
            ease: "power1.out",
        })
        gsap.from(".shoeImg", {
            opacity: 0,
            duration: 0.6,
            delay: 1.5,
            ease: "power1.out",
        })
    })

    let screen;
    useEffect(()=>{
        screen = window.innerWidth;
    })

    return (
        <header className='hero-section relative h-fit lg:h-screen max-h-[768px] w-full pt-[20vh] lg:py-[10vh] flex lg:flex-col flex-col-reverse gap-10 items-center justify-center lg:justify-between'>
            <div className=" w-full relative z-[10] px-5 flex lg:flex-row flex-row-reverse justify-between bg-[#fff]">
                <NavLink to="/shoes/sale"><span className="inline-block w-[5px] h-[5px] rounded-full bg-[#34ff22] shadow-[0px_0px_10px_1px_#20f70c] mb-1"></span> On sale</NavLink>
                <p className='w-[25ch]'>Discover branded footwear to kickstart your wardrobe, one step at a time —</p>
            </div>
            <div className="heading-container w-full h-fit lg:overflow-hidden pb-[1.5vh]">
                <div className="main-heading flex-shrink-0 w-full">
                    <h1 className='w-full h-fit bg-[#fff] mix-blend-lighten flex flex-wrap justify-center text-[6.8rem] lg:text-[22rem] 2xl:text-[25rem] leading-none tracking-[-5px] lg:tracking-[-10px]'>
                        {
                            screen = 1024 ?
                            "Kickster".split("").map((item, index) => (
                                <span key={item} className={`${index === 0 && "uppercase"} main-heading-txt`}>{item}</span>
                            )) :
                            <span className='block'>KICK<br />STER</span>
                        }
                    </h1>
                </div>
                <img className='shoeImg absolute bottom-[9vh] lg:bottom-[3vh] left-[50%] -translate-x-[50%] h-[30vh] lg:h-[95vh] max-h-[750px] z-10' src={shoe} alt="Nike Shoe Img" />
            </div>
        </header>
    )
}

export default Hero