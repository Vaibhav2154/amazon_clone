export let cart;

loadFromStorage();
    
export function addToCart(productId) {
    let matchingItem;
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
            return;
        }
    });
    if (matchingItem) {
        matchingItem.quantity++;
    } else {
        cart.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1',
        });
    }
    saveToStorage();
}

export function removeFromCart(productId) {
    const newCart = [];
    cart.forEach((cartItem) => {
        if (productId !== cartItem.productId) {
            newCart.push(cartItem);
        }
    });
    cart = newCart;
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function updateDeliveryDate(productID,deliveryOptionId){
    let matchingItem;
    cart.forEach((cartItem) => {
        if (productID === cartItem.productId) {
            matchingItem = cartItem;
            return;
        }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}

export function loadFromStorage() {
    cart = localStorage.getItem('cart') ?
    JSON.parse(localStorage.getItem('cart')) :
    [];
}