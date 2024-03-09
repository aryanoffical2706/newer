import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Header from "../src/components/header/Header.jsx"
import "./style/header.scss"
import "./style/color.scss"
import "./style/app.scss"
import "./style/booking.scss"
import Booking from './components/booking/Booking.jsx';
import Home from './components/home/Home.jsx';
import Footer from './components/footer/Footer.jsx';
import Service from './components/service/Service.jsx';


function App() {
  return (
   <>
   <Router>
    <Header/>
    <Routes>
    <Route path="/home" element={<Home/>}/>
      <Route path="/booking" element={<Booking/>}/>
      <Route path="/service" element={<Service/>}/>

    </Routes>
    <Footer/>
   </Router>
   </>
  );
}

export default App;
