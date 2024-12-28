import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import shoe from '../../../../assets/images/shoeNobgL-min.png';
import menShoe from '../../../../assets/images/men_shoe.jpg';
import womenShoe from '../../../../assets/images/women_shoe.jpg';
import circle from '../../../../assets/images/circle_3d.png';

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
        gsap.from(".shoe-img", {
            opacity: 100,
            duration: 1,
            ease: "power1.out",
        })
    })

    let screen;
    useEffect(() => {
        screen = window.innerWidth;
    })

    return (
        // <header className='hero-section relative h-fit lg:h-screen max-h-[768px] w-full lg:px-5 lg:py-[5vh] flex lg:flex-col flex-col-reverse gap-10 items-center justify-center lg:justify-between'>
        <header className='hero-section relative h-fit lg:h-screen w-full px-5 py-5 lg:py-[5vh]'>
            {/* <div className="w-full relative z-[10] flex lg:flex-row flex-row-reverse justify-between bg-[#fff]">
                <NavLink className="font-normal" to="/shoes/sale"><span className="inline-block w-[5px] h-[5px] rounded-full bg-[#34ff22] shadow-[0px_0px_10px_1px_#20f70c] mb-1"></span> On sale</NavLink>
                <p className='w-[25ch] font-normal'>Discover branded footwear to kickstart your wardrobe, one step at a time —</p>
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
            </div> */}
            <div className="w-full h-fit lg:h-[calc(100vh-90px)] flex flex-col lg:flex-row gap-3 lg:gap-5">
                <div className="left-hero hero-gradient w-full lg:w-[73%] h-[500px] lg:h-full flex justify-center items-center overflow-hidden rounded-lg relative">
                    <h1 className='heading-txt text-[7rem] lg:text-[11rem] 2xl:text-[16rem] text-center text-white tracking-tight leading-none w-[4.1ch] lg:w-fit break-words font-semibold relative z-[1]'>KICKSTER</h1>
                    <h1 className='upper-hero-txt text-[7rem] lg:text-[11rem] 2xl:text-[16rem] text-center tracking-tight leading-none w-[4.1ch] lg:w-fit break-words font-semibold'>KICKSTER</h1>
                    <div className="shoe-img">
                        <img src={shoe} className='shoe-img absolute top-[40%] left-[50%] -translate-x-[50%] -translate-y-[50%] h-[300px] lg:h-[80vh] object-cover z-[2]' alt="" />
                    </div>
                    <div className="overlay-circle absolute top-0 left-0 h-full w-full">
                        <img className='h-[4rem] lg:h-[7rem] 2xl:h-[9rem] absolute top-[-2vw] left-[-1vw] object-cover opacity-80' src={circle} alt="" />
                        <img className='h-[2.5rem] lg:visible lg:h-[3.5rem] 2xl:visible 2xl:h-[6rem]  invisible absolute top-[20%] right-[30%] object-cover opacity-80 z-0' src={circle} alt="" />
                        <img className='h-[6.5rem] lg:h-[10rem] 2xl:h-[14rem] absolute top-[30%] left-[10%] object-cover opacity-80 z-0' src={circle} alt="" />
                        <img className='h-[2.8rem] lg:h-[5.5rem] 2xl:h-[7.5rem] absolute bottom-[20%] right-[10%] object-cover opacity-80 z-0' src={circle} alt="" />
                        <img className='h-[4rem] lg:h-[7.5rem] 2xl:h-[10rem] absolute bottom-[-2vw] left-[15%] object-cover opacity-80 z-0' src={circle} alt="" />
                    </div>
                    <Link to="/shop" className='absolute bg-white px-5 2xl:px-7 py-1.5 2xl:py-2.5 rounded bottom-[3vmax] shadow-xl shadow-zinc-300 text-black txt-medium 2xl:text-[1.2rem]'>Shop Now ›</Link>
                </div>
                <div className="right-hero w-full lg:w-[27%] h-[150px] lg:h-full flex lg:flex-col gap-3 lg:gap-5">
                    <div className="men-link w-1/2 lg:w-full h-full lg:h-1/2 relative rounded-md overflow-hidden">
                        <Link to="/shop/men" className="w-full lg:w-full flex justify-center items-center h-[150px] lg:h-full">
                            <img className=' w-full lg:h-full object-cover object-bottom' src={menShoe} alt="" />
                            <div className="overlay absolute top-0 left-0 h-full w-full bg-[#00000021] flex justify-center items-center">
                                <h2 className='txt-medium text-white 2xl:text-[1.2rem]'>Men</h2>
                            </div>
                        </Link>
                    </div>
                    <div className="women-link w-1/2 lg:w-full h-full lg:h-1/2 relative rounded-md overflow-hidden">
                        <Link to="/shop/women" className="w-full h-full flex justify-center items-center lg:h-full">
                            <img className='w-full lg:h-full object-cover object-bottom' src={womenShoe} alt="" />
                            <div className="overlay absolute top-0 left-0 h-full w-full bg-[#00000031] flex justify-center items-center">
                                <h2 className='txt-medium text-white 2xl:text-[1.2rem]'>Women</h2>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Hero