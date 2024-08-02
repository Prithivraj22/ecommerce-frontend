import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ItemCard from './Itemcard';
import { items as staticItems } from './items';
import '../styles/styles.css';

const Home = ({ setUsername, addToCart,user }) => {
  const [items, setItems] = useState([]);
  const location = useLocation();
  const { us_name } = location.state || {}; 
  

  useEffect(() => {
    setItems(staticItems);
    if (us_name) {
      setUsername(us_name);
    }
  }, [us_name, setUsername]); 

  return (
    <div className="home">
      {items.map(item => (
        <ItemCard 
          key={item.id} 
          item={item} 
        
          username={us_name} 
          addToCart={addToCart} 
          user={user}
        />
      ))}
    </div>
  );
};

export default Home;
