
// now we link products data from products.js file
// we will loop through each product in the products array and create html for each product
// then we will append that html to the products grid container

import {cart , addToCart} from "../data/cart.js";
import {products} from "../data/products.js";
// import cart array from cart.js file for avoid name conflict we can use export const cart = []; in cart.js file

let productsHTML = '';
                                                //+= means append to the existing string value of productsHTML productsHTML + productsHTML
products.forEach((product) =>{
    productsHTML +=`           
            <div class="product-container">
                <div class="product-image-container">
                    <img class="product-image"
                    src="${product.image}">
                </div>

                <div class="product-name limit-text-to-2-lines">
                    ${product.name}
                </div>

                <div class="product-rating-container">
                    <img class="product-rating-stars"
                    src="images/ratings/rating-${product.rating.stars * 10}.png">
                    <div class="product-rating-count link-primary">
                    ${product.rating.count}
                    </div>
                </div>

                <div class="product-price">
                    $${(product.priceCents / 100).toFixed(2)}
                </div>

                <div class="product-quantity-container">
                    <select>
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    </select>
                </div>

                <div class="product-spacer"></div>

                <div class="added-to-cart">
                    <img src="images/icons/checkmark.png">
                    Added
                </div>

                <button class="add-to-cart-button button-primary js-add-to-cart"
                data-product-id='${product.id}'>
                    Add to Cart
                </button>
                </div>
                `;
                
// creating html with js help to dynamically add products to the page without manually writing each product in html file
// now we can simply add more products to the products array and they will automatically show up on the page

})

document.querySelector('.js-products-grid').innerHTML = productsHTML;
// now we will add functionality to the add to cart buttons
// we will add event listeners to each button and when clicked we will add the product to the cart array

function updateCartQuantity() {
    // calculate cart quantity//       
        let cartQuantity = 0;

        cart.forEach((cartItem) => {
          cartQuantity += cartItem.quantity;  
        })

        document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

document.querySelectorAll('.js-add-to-cart') // selects all add to cart buttons and give a forEach loop to add event listener to each button
.forEach((button) => {
        button.addEventListener('click', (event) => {
             // Robustly read product id (dataset may be undefined if HTML got altered by a sanitizer/formatter)
             const productId = button.dataset?.productId || button.getAttribute('data-product-id');

             // Debugging output to help diagnose missing dataset for specific products
             console.log('Add to cart clicked', { productId, buttonOuterHTML: button.outerHTML });

             // Log cart state before/after to verify mutation
             try {
                 console.log('Cart before addToCart', JSON.parse(JSON.stringify(cart)));
             } catch (e) {
                 console.log('Cart before addToCart (could not clone)', cart);
             }

             addToCart(productId);

             try {
                 console.log('Cart after addToCart', JSON.parse(JSON.stringify(cart)));
             } catch (e) {
                 console.log('Cart after addToCart (could not clone)', cart);
             }

             updateCartQuantity();
        })
})
// this codes means we are searching for an item in the cart that matches the productId of the button that was clicked
// Every button has a special attribute like data-product-id that contains the id of the product it clicked



