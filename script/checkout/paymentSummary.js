import {cart} from '../../data/cart.js';
import { getProducts} from '../../data/products.js';
import { getDeliveyOption} from '../../data/deliveryOptions.js';

export function renderPaymentSummary() {
    let productsPriceCents = 0;
    let shippingPriceCents = 0;

    cart.forEach(cartItem => {
       const product = getProducts(cartItem.productId)
       productsPriceCents += product.priceCents * cartItem.quantity;

        const deliveryOption = getDeliveyOption(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.price;
    });

    console.log(productsPriceCents);
    
    const totalBeforeTaxCents = productsPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTaxCents * 0.1                               // 0.1 is 10/100 //
    const totalCents = totalBeforeTaxCents + taxCents;

    const paymentSummaryHTML =`
    
    <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${(productsPriceCents / 100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${(shippingPriceCents / 100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${(totalBeforeTaxCents / 100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${(taxCents / 100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${(totalCents / 100).toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>

    `

    document.querySelector('.js-payment-summary')
    .innerHTML = paymentSummaryHTML;
}