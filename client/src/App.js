import './App.css';
// import { ethers } from 'ethers'
import { BrowserRouter , Route, Routes} from "react-router-dom";
import Home from './Component/Home';
import About from './Component/About';
import Contact from './Component/Contact';
import User from './Component/User';
import NewUser from './Component/NewUser';
// import election from "./abis/Election.json"
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = { <Home/> } />
        <Route path = "/about" element = {<About/>} />
        <Route path = "/contact" element = {<Contact/>} />
        <Route path = "/user" element = {<User/>} />
        <Route path = "/newuser" element = {<NewUser/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
