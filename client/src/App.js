import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react'; // Import Box component from Chakra UI
import Home from './Component/Home';
import About from './Component/About';
import Contact from './Component/Contact';
import User from './Component/User';
import NewUser from './Component/NewUser';
import Election from './Component/Election';
import CreateElection from './Component/CreateElection';
import Profile from './Component/Profile';

function App() {
  return (
    <Router>
      <Box bg="#EEF5FF" minHeight="100vh"> {/* Set the background color here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/user" element={<User />} />
          <Route path="/newuser" element={<NewUser />} />
          <Route path="/election" element={<Election />} />
          <Route path="/createElections" element={<CreateElection />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
