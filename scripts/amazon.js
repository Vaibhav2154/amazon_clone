import { cart, addToCart } from "../data/cart.js";
import { products,loadProducts } from "../data/products.js";
import { formatCurrency as fm } from "./utils/money.js";

loadProducts(renderProductsGrid);


function renderProductsGrid(){
    let productHTML = '';
    products.forEach((product) => {
        productHTML += `
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
                src="${product.getStartsUrl()}">
            <div class="product-rating-count link-primary">
                ${product.rating.count}
            </div>
            </div>

            <div class="product-price">
                ${product.getPrice()}
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
            
            ${product.extraInfoHTML()}

            <button class="add-to-cart-button
            button-primary 
            js-add-to-cart"
            data-product-id="${product.id}"
            >
            Add to Cart
            </button>
        </div> 
        `;

    })

    document.querySelector('.js-products-grid').innerHTML = productHTML;

    function updateCartCount() {
        let cartQyuantity = 0;
        cart.forEach((cartItem) => {
            cartQyuantity += cartItem.quantity;
        });
        document.querySelector('.js-cart-quantity').innerHTML = cartQyuantity;
    }

    const addToCartButtons = document.querySelectorAll('.js-add-to-cart').forEach((button) => {
        button.addEventListener('click', (event) => {
            const productId = button.dataset.productId;
            addToCart(productId);
            updateCartCount();
        });
    });
}