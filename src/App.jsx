import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
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

const App = () => {
  const location = useLocation();
  const hideFooterPages = ['/login', '/sign-up', '/otp']; // Adicione a rota '/otp' para ocultar o Footer
  const hideNavBarPages = ['/login', '/sign-up', '/otp']; // Adicione a rota '/otp' para ocultar o NavBar

  return (
    <div>
      <ToastContainer />
      {/* Condicional para renderizar o NavBar apenas se não estiver nas páginas de login */}
      {!hideNavBarPages.includes(location.pathname) && <NavBar />}
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/login' element={<Login />} />
        <Route path='/otp' element={<OTPVerification />} /> {/* Nova rota para OTP */}
      </Routes>
      {/* Condicional para renderizar o Footer apenas se não estiver nas páginas de login */}
      {!hideFooterPages.includes(location.pathname) && <Footer />}
    </div>
  );
};

export default App;
