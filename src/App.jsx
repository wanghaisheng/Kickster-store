import Router from './utils/Router'
import Navbar from './components/navbar/Navbar'
import { useEffect, useCallback } from 'react'
import gsap from 'gsap'
import Footer from './components/footer/Footer'
import { useDispatch } from 'react-redux'
import { getProducts } from './store/features/productsSlice'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { doc, getDoc } from 'firebase/firestore'
import { setUser } from './store/features/loggedInSlice'
import { auth, db } from './utils/firebaseConfigures'

const App = () => {

  const dispatch = useDispatch();
  //Initializing the MOUSE FOLLOWER
  const mouseFollower = useCallback((e) => {
    gsap.to(".mouseFollower", {
      x: e.clientX - 5,
      y: e.clientY - 5,
      opacity: 1,
      duration: 0.2
    })
  }, [])

  // Adding event listener for MOUSE MOVE to follow the mouse cursor
  useEffect(() => {
    const handleMouseMove = (e) => mouseFollower(e)
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [mouseFollower])

  // Fetching products data using Redux
  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  useEffect(() => {
    if(localStorage.getItem("user")){
      dispatch(setUser(JSON.parse(localStorage.getItem("user"))));
    }
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if(user){
        const docRef = doc(db, "users", `${user.uid}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          localStorage.setItem("user", JSON.stringify(docSnap.data()))
          dispatch(setUser(docSnap.data()))
        }
      }
      else{
        localStorage.removeItem("user");
        dispatch(setUser(null));
      }
    })

    return () => unsubscribe();
  }, [])

  return (
    <div className='w-screen h-[100svh] relative overflow-hidden'>
      <span className="mouseFollower hidden absolute lg:block opacity-0 w-[12px] h-[12px] rounded-full bg-[#3d3d3d] top-0 left-0 z-[100] pointer-events-none"></span>
      <div className="outer-container w-full h-full overflow-y-auto flex flex-col items-center bg-[#fff]">
        <Navbar />
        <div className='container w-full pb-[5vh]'>
          <main>
            <Router />
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default App