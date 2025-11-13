
export let cart = JSON.parse(localStorage.getItem('cart'))
// If there's saved cart data, sanitize it (coerce types, trim stray quotes). Otherwise initialize with defaults.
if (cart && Array.isArray(cart)) {
    cart = cart.map((item) => {
        return {
            productId: item.productId ? String(item.productId).trim() : String(item.productId),
            quantity: Number(item.quantity) || 0,
            deliveryOptionId: item.deliveryOptionId ? String(item.deliveryOptionId).replace(/^"+|"+$/g, '').trim() : item.deliveryOptionId
        };
    });
} else {
    cart = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
    }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
    }];

}

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart)) // Used to store data in the browser// // it hrlpers to save cart data even after refreshing the page //
}

export function addToCart(productId){
    // defensive: ensure productId is a trimmed string and present
    if (!productId && productId !== 0) {
        console.error('addToCart called without a productId:', productId);
        return;
    }

        productId = String(productId).trim();

        // Debug log to see what's being passed in and current cart
        console.log('addToCart called with', { productId });
        try {
            console.log('current cart (start)', JSON.parse(JSON.stringify(cart)));
        } catch (e) {
            console.log('current cart (start, raw)', cart);
        }

    // check if product already in cart if yes increase quantity else add new item //
    const existingItem = cart.find(cartItem => cartItem.productId === productId);

// cart.find(function(item) {
//   return item.productId === productId;
// });

        if (existingItem) {
        // ensure numeric addition even if quantity was stored as a string
        existingItem.quantity = (Number(existingItem.quantity) || 0) + 1;
        } else {
        cart.push({ productId, quantity: 1, 
            deliveryOptionId: '1'
         });
        }

                saveToStorage();

        try {
            console.log('current cart (end)', JSON.parse(JSON.stringify(cart)));
        } catch (e) {
            console.log('current cart (end, raw)', cart);
        }
}

// function to remove from cart //
export function removeFromCart(productId) {
    const newCart = [];
    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    })

    cart = newCart;

    saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {

    const existingItem = cart.find(cartItem => cartItem.productId === productId);
    // sanitize deliveryOptionId coming from DOM (may include stray quotes)
    existingItem.deliveryOptionId = String(deliveryOptionId).replace(/^"+|"+$/g, '').trim();

    saveToStorage();
}