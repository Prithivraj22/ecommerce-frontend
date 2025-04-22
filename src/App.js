import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ItemDetail from './components/ItemDetail';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import CartPage from './components/CartPage';
import './styles/styles.css';
import Navbar from './components/Navbar';
import { useState } from 'react';
import axios from 'axios';
import Search from './components/Search';
import ProductDetail from './components/ProductDetail';

function App() {
  const [username, setUsername] = useState("Login to view Username");
  const [user, setUser] = useState(null);
  const[subid,setSubid]=useState()


  const addToCart = async (item, username) => {
    try {
      const userResponse = await axios.get(`http://localhost:5000/create?username=${username}`);
      const user = userResponse.data;

      if (!user) {
        throw new Error('User not found');
      }

      await axios.post('http://localhost:5000/cart', {
        userId: user._id,
        itemId: item.id,
        quantity: item.quantity, 
      });
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };
  console.log(user)

  return (
    <Router>
      <div>
        <Navbar setUsername={setUsername} username={username} subid={subid} />
        <Routes>
          <Route path="/" element={<LoginPage setUser={setUser} setSubid={setSubid} setUsername={setUsername}  />} />
          <Route path="/signup" element={<SignUpPage  />} />
          <Route path="/home" element={<Home setUsername={setUsername} user={user} addToCart={addToCart} />} />
          <Route path="/item/:id" element={<ItemDetail addToCart={addToCart} username={username} />} />
          <Route path="/cart" element={<CartPage user={username} />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path='/search' element={<Search/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
