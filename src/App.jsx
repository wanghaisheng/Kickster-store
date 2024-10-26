import Router from './utils/Router'
import Navbar from './components/navbar/Navbar'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Footer from './components/footer/Footer'

const App = () => {
  let mouseFollower;
  useGSAP(
    mouseFollower = (e) => {
      gsap.to(".mouseFollower", {
        x: e.clientX - 5,
        y: e.clientY - 5,
        duration: 0.2
      })
    }
  )

  return (
    <div onMouseMove={(e) => mouseFollower(e)} className='bg-[#e9e9e9] w-screen h-screen relative overflow-hidden'>
      <span className="mouseFollower absolute block w-[12px] h-[12px] rounded-full bg-[#3d3d3d] top-0 left-0 z-[100] pointer-events-none"></span>
      <div className="outer-container w-full h-full overflow-y-auto flex flex-col items-center bg-[#fff]">
        <Navbar />
        <div className='container w-full'>
          <main>
            <Router />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default App