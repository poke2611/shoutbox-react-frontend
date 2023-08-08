import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../css/Page3.css';
import { NavLink, useHistory } from 'react-router-dom';
import { setCartIdentifier } from '../store/actions';
import Cookies from 'js-cookie'
import Carousel from './Carousel';;
//import { Carousel } from 'react-responsive-carousel';


const Page3 = (props) => {

  const cartID = useSelector(state => state.cartID);
  const [cart, setCart] = useState([]);
  const [images, setImages] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [colors, setColors] = useState([]);
  const [size, setSize] = useState([]);
  const [variants, setVariants] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [isAddToCartDisabled, setIsAddToCartDisabled] = useState(true);
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
 let cartCookie = Cookies.get('cart');
 if(cartCookie){
  cartCookie = JSON.parse(cartCookie);
 }
  console.log("cartCookie", cartCookie);
  const itemParams = (cartCookie!=undefined && cartCookie.length>0)?cartCookie.map((item) => `items[][id]=${item.variantId}&items[][quantity]=${item.quantity}&items[][properties][POWERED_BY]=C2C`).join('&'):'';
  const apiUrl = cartCookie!=undefined && cartCookie.length > 0 ? 'https://theaayna.com/cart/add?'+itemParams+'&note=Powered_By_C2C' : 'https://theaayna.com/cart';
  https://kamikubi.com/cart/add?items[][id]=42841423184061&items[][quantity]=1&items[][properties][POWERED_BY]=C2C&items[][id]=42841422659773&items[][quantity]=3&items[][properties][POWERED_BY]=C2C

  useEffect(() => {
    console.log("api call");
    const fetchData = async () => {
      try {
          const response = await fetch('https://cliptocart.co.in/content?productId='+props.product.id);
          const json = await response.json();
          console.log("page 3", json);
          const imgs= json.filter(prod=> prod.type=='P').map(prod=> prod.link);
          console.log("imgs",imgs );
          setImages(imgs);
          setIsLoading(false);

         
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    
  }, []);

  useEffect(() => {

    getVariantOptions();
    console.log("productr", props.product);
    // Retrieve cart items from the cookie when the product page is loaded
    const existingCartItems = getCartItemsFromCookies();
    setCart(existingCartItems);
    
  }, []);

  const getVariantOptions = async () => {
    try {
     const response = await fetch('https://cliptocart.co.in/shopify/product/'+props.product.shopifyProductId );
      const productData = await response.json();
      const variants = productData.product.variants;
      console.log(productData.product.images.length,"productData.product.images",productData.product.images);

      
      setVariants(variants);
      if(variants.length==1){
        setIsAddToCartDisabled(false);
      }
      // Get the unique sizes and colors from the variants data
      const availableSizes = variants.map((variant) => variant.option1)
        .filter((size, index, self) => self.indexOf(size) === index);
        const availableColors = variants.map((variant) => variant.option2)
        .filter((color, index, self) => color !== null && self.indexOf(color) === index);
      console.log("availableColors",availableSizes, availableColors.length);
      setSize(availableSizes);
      setColors(availableColors);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddToCart = (event) => {
    event.preventDefault();
    const variantId =  getVariantId();
    console.log("variantId", variantId);
    const newCartItem = {
      productId: props.product.id,
      variantId: variantId, // Assuming you have a way to get the selected variant ID
      quantity: 1, // You can set the quantity based on user input or any other logic
      addedToCart: true,
    };
 
   if(cartCookie!= undefined){
    console.log("inside if", cartCookie);
    const existingCartItem = cartCookie.find(
      (item) =>
        item.productId === newCartItem.productId
     //    && item.variantId === newCartItem.variantId
    );

    if (!existingCartItem) {
      cartCookie.push(newCartItem);
      saveCartToCookieOrState(cartCookie);  

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
            setCart(updatedCartItems);
          //  Cookies.set('cart', JSON.stringify(updatedCartItems), { expires: 7 });    
            })
      .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error("Error:", error);
      });
    }
  
   }
   else{
    let cart=[];
    console.log("inside else", cart);
    cart.push(newCartItem);
    saveCartToCookieOrState(cart);  

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
     //     Cookies.set('cart', JSON.stringify(updatedCartItems), { expires: 7 });
         
          })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error("Error:", error);
    });

   }
   setAddedToCart(true);
    
  };

  const getCartItemsFromCookies = () => {
    const cartCookie = Cookies.get('cart');
    return cartCookie ? JSON.parse(cartCookie) : [];
  };

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
    
    if(colors.length>0){
      setIsAddToCartDisabled(!size || !selectedColor);
    }
    else{
      setIsAddToCartDisabled(false);
    }
    
  };
 
  
  const handleColorSelection = (color) => {
    setSelectedColor(color);
    setIsAddToCartDisabled(!selectedSize || !color);
  };

  const getVariantId = () => {
    let selectedVariant ='';
    if(variants.length === 1){
      console.log("length =1 ")
      selectedVariant = variants[0];
    }
    else if(selectedSize==''){
      console.log("selectedSize=='' ");
      selectedVariant = variants.find(
        (variant) =>
        variant.option2 === selectedColor);
    }
    else if(selectedColor==''){
      console.log("selectedColor=='' ");
      selectedVariant = variants.find(
        (variant) =>
        variant.option1 === selectedSize);
    }
    else{
      selectedVariant = variants.find(
        (variant) =>
          variant.option1 === selectedSize && variant.option2 === selectedColor);
    }
    
    console.log("selectedVariant",selectedVariant);
    return selectedVariant.id;
  };
  
  const saveCartToCookieOrState = (updatedCart) => {
    Cookies.set('cart', JSON.stringify(updatedCart), { expires: 7 });
  };

  return (

    <div className="page3-comp"> 
            <a className='close-popup-btn' onClick={props.onClose}>x</a>
            <div className='prod-other-img'>
              
              <Carousel images={images} />
                {/*<Carousel showThumbs={false} showIndicators={images.length > 1}>
                    {
                      images.map((image, index) => (
                        <div key={index}>
                          <img src={image.src} alt={image.handle} />
                        </div>
                      ))
                    }
                  </Carousel> */}
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
                  {
                    variants.length==1?'':
                    <div className='page3-product-desc'>
                    <span className='page3-heading'>Select Variant</span>
                    <div className='variant-div'>
                    {
                      size.length>1?
                      <>
                          <span className='page3-sub-heading'>Size</span>
                          <div className='size-list'>
                              {size.map((x)=>
                              <a className={selectedSize === x ? 'selected' : ''} 
                                onClick={() => handleSizeSelection(x)}>{x}</a>)}
                          </div>
                          </>:''
                        
                      }   
                      
                      {
                        colors.length>1?
                        <>
                            <span className='page3-sub-heading'>Color</span>
                            <div className='color-list'>
                              {colors.map((x)=>
                              <a style={{background: ""+x+""}}
                                className={selectedColor === x ? 'selected' : ''} 
                                onClick={() => handleColorSelection(x)}></a>)}
                             </div>
                          </>:''
                      }
                     
                     
                    </div>
                    
                  </div>
                  }
                  
                  
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
                <a  className='buy-now' href={apiUrl}>
                  View Cart
                </a>
              ) : (
                // If not added to cart, show "Add to Cart" button
                <a className={`buy-now ${isAddToCartDisabled ? 'disabled' : ''}`} 
                 disabled={isAddToCartDisabled} onClick={(e)=>handleAddToCart(e)} >
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