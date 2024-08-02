import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { items as staticItems } from './items';
import '../styles/styles.css';

const ItemDetail = ({ addToCart, username }) => {
  const { id } = useParams();
  const item = staticItems.find(item => item.id === parseInt(id)); 
  const [quantity, setQuantity] = useState(1); 
  const [showForm, setShowForm] = useState(false); 
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    paymentMethod: ''
  });

  const handleQuantityChange = (delta) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + delta)); 
  };

  const handleAddToCart = () => {
    if (item && username) {
      addToCart(item, username, quantity); 
    } else {
      console.log('User not logged in or item not found');
    }
  };

  const handleBuyNow = () => {
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Purchase has been successful');
    console.log('Order details:', formData);
    setShowForm(false);
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className="item-detail">
      <img src={item.image} alt={item.name} />
      <h1>{item.name}</h1>
      <p>{item.description}</p>
      <div className="quantity-controls">
        <button onClick={() => handleQuantityChange(-1)}>-</button>
        <span style={{marginLeft:"-15px"}}>{quantity}</span>
        <button onClick={() => handleQuantityChange(1)}>+</button>
      </div>
      <button style={{marginLeft:"0px"}} onClick={handleAddToCart}>Add to Cart</button>
      <button style={{marginLeft:"0px"}} onClick={handleBuyNow}>Buy Now</button>

      {showForm && (
        <div className="modal">
          <form onSubmit={handleFormSubmit} className="buy-now-form">
            <h2>Purchase Form</h2>
            <label>
              Name:
              <input type="text" name="name" value={formData.name} onChange={handleFormChange} required />
            </label>
            <label>
              Address:
              <input type="text" name="address" value={formData.address} onChange={handleFormChange} required />
            </label>
            <label>
              Payment Method:
              <select name="paymentMethod" value={formData.paymentMethod} onChange={handleFormChange} required>
                <option value="">Select</option>
                <option value="creditCard">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="cod">Cash on Delivery</option>
              </select>
            </label>
            <button type="submit">Submit</button>
            <button style={{marginTop:"20px"}} type="button"  onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ItemDetail;
