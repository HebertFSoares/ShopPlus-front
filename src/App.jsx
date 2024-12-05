import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import OTPVerification from './components/Otp';
import Orders from './pages/Orders';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  const location = useLocation();
  const hideFooterPages = ['/login', '/sign-up', '/otp'];
  const hideNavBarPages = ['/login', '/sign-up', '/otp'];

  return (
    <div>
      <ToastContainer />
      <ScrollToTop />
      {!hideNavBarPages.includes(location.pathname) && <NavBar />}
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/login' element={<Login />} />
        <Route path='/otp' element={<OTPVerification />} />
      </Routes>
      {!hideFooterPages.includes(location.pathname) && <Footer />}
    </div>
  );
};

export default App;
