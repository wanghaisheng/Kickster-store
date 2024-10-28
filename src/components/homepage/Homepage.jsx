import Hero from './sections/Hero'
import Brands from './sections/brands/Brands'
import NewArrivals from './sections/NewArrivals'

const Homepage = () => {

  return (
    <section className='homepage flex flex-col items-center'>
        <Hero />
        <NewArrivals />
        <Brands />
    </section>
  )
}

export default Homepage