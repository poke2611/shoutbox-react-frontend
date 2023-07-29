import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import '../css/Cart.css';

const Cart = ({  }) => {

    const [cartItems, setCartItems] = useState([]);
  //const cartItems = useSelector(state => state.items);

  useEffect(() => {
    console.log("cart ID 1", Cookies.get('cartIdentifier'));
     
    const fetchData = async () => {
      try {
       
         const response = await fetch('https://cliptocart.co.in/cart/'+Cookies.get('cartIdentifier'));
          const json = await response.json();
          //dispatch(setFilteredProds(json));
          console.log("cart Dtaa", json);
     
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    
  }, []);

  useEffect(() => {
    // Retrieve cart items from the cookie when the cart page is loaded
    const existingCartItems = getCartItemsFromCookies();
    const identifierc= Cookies.get('cartIdentifier');
    console.log("existingCartItems",existingCartItems, identifierc);
    setCartItems(existingCartItems);
  }, []);

  const getCartItemsFromCookies = () => {
    const cartCookie = Cookies.get('cart');
    return cartCookie ? JSON.parse(cartCookie) : [];
  };


  const handleRemoveItem = (itemId) => {

    console.log("itemId",itemId);
    const url = "https://cliptocart.co.in/cartItem/"+itemId;
   
    fetch(url, {
      method: "DELETE",
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
     console.log(data);
         
          })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error("Error:", error);
    });
  };

  /*useEffect(() => {
    // Get the cart identifier from the cookie
    const cartIdentifier = getCartIdentifierFromCookie();

    // Retrieve cart data from the backend using the cart identifier
    getCartData(cartIdentifier);
  }, []);

  const handleQuantityChange = (itemId, newQuantity) => {
    updateCartItem(itemId, newQuantity);
  };

  

  const handleCheckout = () => {
    checkout();
  };  

  const getCartData = async (cartIdentifier) => {
    try {
      // API call to backend to get the cart data based on the cart identifier
      const response = await axios.get(`/api/cart/${cartIdentifier}`);
      setCart(response.data.cartItems); // Assuming the response contains the cart items data
    } catch (error) {
      console.error('Error retrieving cart data:', error);
    }
  };

  const getCartIdentifierFromCookie = () => {
    const cartIdentifier = Cookies.get('cartIdentifier');
    if (cartIdentifier) {
      return cartIdentifier;
    } else {
      
      const temporaryCartIdentifier = generateTemporaryCartIdentifier();
      Cookies.set('cartIdentifier', temporaryCartIdentifier, { expires: 7 });
      return temporaryCartIdentifier;
    }
  };
*/

const clearCart = () => {
    
    Cookies.remove('cart');
    setCartItems([]);
  };

  return (
    <div className="cart">
      <h2>Cart</h2>
      {cartItems.length>0 && cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <span>{item.title}</span>
          <div className='price-info'><span className='actual-price' >{item.initialPrice != null ? (
                            <>&#x20B9;{item.initialPrice}</>
                          ) : (
                            ''
                          )}</span>
                        <span className='selling-price' > &#x20B9;{item.finalPrice}</span>
                        <span className='dis-per'>{" "}{item.discountPercentage}</span>
          </div>
          <input
            type="number"
            value={item.quantity}
           // onChange={(e) => handleQuantityChange(item.id, e.target.value)}
          />
         <a onClick={()=>handleRemoveItem(item.id)}>Remove</a>
        </div>
      ))}
      
      {cartItems.length>0 && 
        <div className='checkout-btns'>
            <a >Checkout</a>
            <a onClick={clearCart}>Clear Cart</a> 
        </div>
      }
    </div>
  );
};

export default Cart;
