import Hero from '../components/Hero'
import Categories from '../components/Categories'
import LatestComponent from '../components/LatestComponent'
// import BestSeller from '../components/BestSeller' // Caso queira incluir mais tarde
// import OurPolicy from '../components/OurPolicy' // Caso queira incluir mais tarde

const Home = () => {
  return (
    <div>
      <Hero />
      <Categories />
      <LatestComponent />
      {/* <BestSeller /> */}
      {/* <OurPolicy /> */}
    </div>
  );
};

export default Home;
