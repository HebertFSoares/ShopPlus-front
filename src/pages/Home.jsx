import Hero from '../components/Hero'
import LatestComponent from '../components/LatestComponent'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import Categories from '../components/Categories'
// import NewsLetterBox from '../components/NewsLetterBox'
const Home = () => {
  return (
    <div>
      <Hero/>
      <Categories />
      <LatestComponent/>
      <BestSeller/>
      <OurPolicy/>
    </div>
  )
}

export default Home
