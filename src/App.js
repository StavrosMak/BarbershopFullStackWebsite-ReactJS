import Navbar2 from './components/Navbar2/Navbar2';
import { Route, Routes } from "react-router-dom";
import Home from './routes/Home';
import Book from './routes/Book';
import Appointments from './routes/Appointments';
import MyProfile from './components/MyProfile/MyProfile';
import Footer from './components/Footer/Footer';
function App() {

  return (
    <div className="App">
      <Navbar2 />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/book" element={<Book />} />
        <Route exact path="/myappointments" element={<Appointments />} />
        <Route exact path="/updateprofile" element={<MyProfile />} />
      </Routes>
      <Footer />


    </div>
  );
}

export default App;
