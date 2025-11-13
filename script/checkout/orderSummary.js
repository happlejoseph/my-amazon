import {cart, removeFromCart, updateDeliveryOption} from '../../data/cart.js';
import { products, getProducts} from '../../data/products.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions, getDeliveyOption} from '../../data/deliveryOptions.js';
import { renderPaymentSummary} from './paymentSummary.js';


export function renderOrderSummary() {

    let cartSummaryHTML = '';

// we will loop through each product in the products array and create html for each product
// then we will append that html to the products grid container
cart.forEach((cartItem) =>{
    const productId = cartItem.productId;

    const product = getProducts(productId);
                    //     OR   //

            //     let matchingProducts;
                
            //     products.forEach((product) => {
            // if (product.id === productId) {
            //     matchingProducts = product;
            // }
            // });

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveyOption(deliveryOptionId);
    
    if (!deliveryOption) {
        return;
    }
    
    const today = dayjs();
        const deliveryDate = today.add(
            deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd,  MMMM D');
            
    cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${product.id}">
            <div class="delivery-date">
            Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
            <img class="product-image"
                src="${product.image}">

            <div class="cart-item-details">
                <div class="product-name">
                ${product.name}
                </div>
                <div class="product-price">
                $${(product.priceCents / 100).toFixed(2)}
                </div>
                <div class="product-quantity">
                <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                    Update
                </span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id='${product.id}'>
                    Delete
                </span>
                </div>
            </div>

            <div class="delivery-options">
                <div class="delivery-options-title">
                Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(product, cartItem)}
            </div>
            </div>
        </div>
    `;
});

function deliveryOptionsHTML(product, cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
        const today = dayjs();
        const deliveryDate = today.add(
            deliveryOption.deliveryDays, 'days'
        )
        const dateString = deliveryDate.format(
            'dddd,  MMMM D'
        );
        
        const priceString = deliveryOption.price === 0 ? 'FREE' : `$${(deliveryOption.price) / 100} -`;

        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

        html += `
     <div class="delivery-option js-delivery-option" data-product-id="${product.id}" data-delivery-option-id="${deliveryOption.id}">
                <input type="radio"
                ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${product.id}">
                <div>
                    <div class="delivery-option-date">
                    ${dateString}
                    </div>
                    <div class="delivery-option-price">
                    ${priceString} Shipping
                    </div>
                </div>
                </div>
     `   
    });

    return html;
}

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML

document.querySelectorAll('.js-delete-link')
.forEach((link) => {
    link.addEventListener('click', () => {
     const productId = link.dataset.productId;
     removeFromCart(productId);
     const container = document.querySelector(`.js-cart-item-container-${productId}`)
     container.remove()

     renderOrderSummary();
     renderPaymentSummary();
    
    })
});

document.querySelectorAll('.js-delivery-option')
.forEach((element) => {
    element.addEventListener('click', () => {
        const {productId, deliveryOptionId} = element.dataset; // shortcut of const productId = element.dataset.productId; // const deliveryOptionId = element.dataset.deliveryOptionId;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();  // for regenerate the html for the payment summary //
    });
});

}




