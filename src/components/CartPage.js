import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/styles.css';
import { FaTrashAlt } from 'react-icons/fa';
import SuprSendInbox from '@suprsend/react-inbox';
import 'react-toastify/dist/ReactToastify.css';

const CartPage = ({ user }) => {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false); 
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    paymentMethod: ''
  });

  const fetchCart = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/cart/${user}`);
      const cartData = response.data;
      setData(cartData);
    } catch (error) {
      console.error('Error fetching cart:', error);
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


  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);

  const removeFromCart = async (itemId) => {
    console.log("item id",itemId)
    try {
      await axios.post(`http://localhost:5000/cart/${user}`,{id:itemId});
      
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {data.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {data.map((dataItem) => (
            <li key={dataItem._id}>
              <img src={dataItem.items.image} alt={dataItem.items.name} />
              <div>
                <h2>{dataItem.items.name}</h2>
                <p>Quantity: {dataItem.quantity}</p>
                <p>Price: ${dataItem.items.price}</p>
                <button  onClick={() => {removeFromCart(dataItem._id);fetchCart(); } }>
                  <FaTrashAlt /> Remove
                </button>
                <button style={{marginLeft:"0px"}} onClick={handleBuyNow}>Buy Now</button>
              </div>
            </li>
          ))}
        </ul>
      )}
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

export default CartPage;
