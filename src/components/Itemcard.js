import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';
import axios  from 'axios';

const ItemCard = ({ item, username, addToCart,key,user }) => {
  console.log('key',user)
  const [quantity, setQuantity] = useState(1); 
  



  const handleAddToCart = async() => {
    console.log("haihello",username)
   const res =await axios.post("http://localhost:5000/cart",{user:username,items:item,quantity:quantity})
   console.log(res)
  };

  return (
    <div className="item-card">
      <Link to={`/item/${item.id}`}>
        <img src={item.image} alt={item.name} />
        <h2>{item.name}</h2>
      </Link>

      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ItemCard;
