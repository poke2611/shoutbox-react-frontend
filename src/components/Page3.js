import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../css/Page3.css';
import { NavLink, useHistory } from 'react-router-dom';
import { setCartIdentifier } from '../store/actions';
import Cookies from 'js-cookie';


const Page3 = (props) => {

  const cartID = useSelector(state => state.cartID);
  const [cart, setCart] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();
  const [colors, setColors] = useState([]);
  const [size, setSize] = useState([]);
  const [variants, setVariants] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const sizeAbbreviations = {
    Extra_Small: 'XS',
    Small: 'S',
    Medium: 'M',
    Large: 'L',
    Extra_Large:'XL'
    // Add other size mappings here
  };
  const sizeFullforms = {
     XS: 'Extra_Small',
     S: 'Small',
     M: 'Medium',
     L: 'Large',
     XL: 'Extra_Large'
  };


  useEffect(() => {
    getVariantOptions();
  console.log("productr", props.product);
    // Retrieve cart items from the cookie when the product page is loaded
    const existingCartItems = getCartItemsFromCookies();
    setCart(existingCartItems);
    
  }, []);

  const getVariantOptions = async () => {
    try {
     const response = await fetch('https://cliptocart.co.in/shopify/product/'+ props.product.shopifyProductId );
      const productData = await response.json();
      const variants = productData.product.variants;
      setVariants(variants);
     
      // Get the unique sizes and colors from the variants data
      const availableSizes = variants.map((variant) => variant.option1)
        .filter((size, index, self) => self.indexOf(size) === index);
      const availableColors = variants.map((variant) => variant.option2)
        .filter((color, index, self) => self.indexOf(color) === index);
      console.log("availableColors",availableSizes, availableColors);
      setSize(availableSizes.map((size) => sizeAbbreviations[size]));
      setColors(availableColors);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handleAddToCart = () => {
    const variantId =  getVariantId();
    console.log("variantId", variantId);
    setAddedToCart(true);
   // const variantId = getVariantId();
    let cartIdentifier = Cookies.get('cartIdentifier');
   
    if (!cartIdentifier) {
      console.log("inside if", cartIdentifier);
      const url = "https://cliptocart.co.in/cart";
      const payload = {
        "cartItems": [
            
            {
                "product": {
                    "id": props.product.id,
                },
                "variantId": variantId,
                "quantity": 5
            }
        ]
    };
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // You can add additional headers here, such as authorization tokens
        },
        body: JSON.stringify(payload)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        // Handle the response data here
            console.log(data);
            dispatch(setCartIdentifier(data.id));
  
            // Set the cartIdentifier from the API response into cookies
            Cookies.set('cartIdentifier', data.id, { expires: 7 });
            const updatedCartItems = [props.product];
           
            setCart(updatedCartItems);
            Cookies.set('cart', JSON.stringify(updatedCartItems), { expires: 7 });
           
            })
      .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error("Error:", error);
      });
    }
    else{
      const url = "https://cliptocart.co.in/cart";
      const payload = {
        "id": Cookies.get('cartIdentifier'),
        "cartItems": [
            {
                "product": {
                    "id": props.product.id
                },
                "variantId": variantId,
                "quantity": 5
            }
        ]
    }
      
     ;
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // You can add additional headers here, such as authorization tokens
        },
        body: JSON.stringify(payload)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        
            console.log(data);
            const existingCartItems = getCartItemsFromCookies();

            const updatedCartItems = [...existingCartItems, props.product];
        
            Cookies.set('cart', JSON.stringify(updatedCartItems), { expires: 7 });    
            })
      .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error("Error:", error);
      });
    }  
  };

  const getCartItemsFromCookies = () => {
    const cartCookie = Cookies.get('cart');
    return cartCookie ? JSON.parse(cartCookie) : [];
  };

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };

 
  
  const handleColorSelection = (color) => {
    setSelectedColor(color);
  };

  const getVariantId = () => {
    const selectedVariant = variants.find(
      (variant) =>
        variant.option1 === sizeFullforms[selectedSize] && variant.option2 === selectedColor);
    console.log("selectedVariant",selectedVariant);
    return selectedVariant.id;
  };
  

  return (
    <div className="page3-comp"> 
            <div className='prod-other-img'>
                <div>
                      <img src={props.product.imageUrl} className='page3-prod-img'/>
                </div>
                <div>
                    <img src={props.product.imageUrl} className='page3-prod-img'/>
                </div>
            </div>
            <div className='page3-prod-info'>
                <div className='page3-brand-name'>{props.product.brandName}</div>
                <div className='page3-prod-detail'>{props.product.title}</div>
                {/* <div className='page3-rating'>4</div> */}
                <div className='partition-line'></div>
                <div className='page3-price-info'><span className='page3-actual-price' >{props.product.initialPrice != null ? (
                        <>&#x20B9;{props.product.initialPrice}</>
                      ) : (
                        ''
                      )}</span>
                    <span className='page3-selling-price' > &#x20B9;{props.product.finalPrice}</span>
                    <span className='page3-dis-per'>{" "}{props.product.discountPercentage}</span>
                </div>
                <div className='taxes'>Inclusive of all taxes</div>
                <div className='product-info-wrapper'>
                 {/* <div>
                    <span className='page3-heading'>Product Information</span>
                    <div className='product-info-sub-wrapper'>
                      <div>
                        <div className='page3-sub-wrapper'>
                            <div className='info-heading'>Fit</div>
                            <div className='info-value'>Regular Fit</div>
                        </div>
                        <div className='page3-sub-wrapper'>
                            <div className='info-heading'>Fit</div>
                            <div className='info-value'>Regular Fit</div>
                        </div>
                        <div className='page3-sub-wrapper'>
                            <div className='info-heading'>Fit</div>
                            <div className='info-value'>Regular Fit</div>
                        </div>
                      </div>
                      <div>
                        <div className='page3-sub-wrapper'>
                            <div className='info-heading'>Fit</div>
                            <div className='info-value'>Regular Fit</div>
                        </div>
                        <div className='page3-sub-wrapper'>
                            <div className='info-heading'>Fit</div>
                            <div className='info-value'>Regular Fit</div>
                        </div>
                        <div className='page3-sub-wrapper'>
                            <div className='info-heading'>Fit</div>
                            <div className='info-value'>Regular Fit</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  */}
                  <div className='page3-product-desc'>
                    <span className='page3-heading'>Product Description</span>
                    <span className='page3-desc-span'>{props.product.description}</span>
                  </div>
                  <div className='partition-line'></div>
                  <div className='page3-product-desc'>
                    <span className='page3-heading'>Select Variant</span>
                    <div className='variant-div'>
                      <span className='page3-sub-heading'>Size</span>
                      <div className='size-list'>
                        {size.map((x)=>
                        <a className={selectedSize === x ? 'selected' : ''} 
                           onClick={() => handleSizeSelection(x)}>{x}</a>)}
                      </div>
                      <span className='page3-sub-heading'>Color</span>
                      <div className='color-list'>
                        {colors.map((x)=>
                        <a style={{background: ""+x+""}}
                          className={selectedColor === x ? 'selected' : ''} 
                          onClick={() => handleColorSelection(x)}></a>)}
                      </div>
                     
                    </div>
                    
                  </div>
                  
                    {/*
                    <div className='page3-material'>
                        <span className='page3-heading'>Material & Care</span>
                        <span className='page3-desc-span'>Machine wash in cold water</span>
                      </div>*/
                      } 
                </div>
                
            </div>
            <div className='checkout-btn-wrapper'>
            {addedToCart ? (
                // If added to cart, show "View Cart" link
                <NavLink className='buy-now' to={`/cart/${Cookies.get('cartIdentifier')}`}>
                  View Cart
                </NavLink>
              ) : (
                // If not added to cart, show "Add to Cart" button
                <a className='buy-now' onClick={handleAddToCart}>
                  Add to Cart
                </a>
              )}

              <a className='buy-now' href='https://kamikubi.com/cart/add?id=42841423184061&quantity=1'>Buy Now</a>
            </div>
            {/*<a className='buy-now' href={props.product.productUrl}>Buy Now</a> */}
        
    </div>
  );
}

export default Page3;