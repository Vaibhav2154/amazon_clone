export let cart = localStorage.getItem('cart') ?
    JSON.parse(localStorage.getItem('cart')) :
    [];

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
            quantity: 1
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