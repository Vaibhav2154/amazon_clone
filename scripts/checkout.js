import { cart, removeFromCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency as fm } from "./utils/money.js";
import { hello } from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js";
import dayjs from "https://cdn.skypack.dev/dayjs@1.10.7";
import { deliveryOptions } from "../data/deliveryoptions.js";

hello();



let cartSummaryHtml = '';
cart.forEach((cartItem) => {

    const productId = cartItem.productId;

    let matchingProduct;
    products.forEach((productItem) => {
        if (productId === productItem.id) {
            matchingProduct = productItem;
            return;
        }
    });

    let deliveryOptionId = cartItem.deliveryOptionId;
    let deliveryOption;
    deliveryOptions.forEach((option) => {
        if (deliveryOptionId === option.id) {
            deliveryOption = option;
            return;
        }
    }
    );
    

    
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');


    cartSummaryHtml += `<div class="cart-item-container js-cart-item-${matchingProduct.id}">
        <div class="delivery-date">
            Delivery date: ${deliveryDate.format('dddd, MMMM D')}
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                    $${fm(matchingProduct.priceCents)}
                    </div>
                    <div class="product-quantity">
                        <span>
                            Quantity: 
                            <span class="quantity-label">
                                ${cartItem.quantity}
                            </span>
                        </span>
                        <span class="update-quantity-link link-primary">
                            Update
                        </span>
                        <span class="delete-quantity-link link-primary js-delete-link"
                            data-product-id="${matchingProduct.id}">
                            Delete
                        </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(matchingProduct,cartItem)}
                </div>
        </div>
    </div>`;
});
function deliveryOptionsHTML(matchingProduct,cartItem) {
    let optionHTML = '';
    deliveryOptions.forEach((deliveryOption) => {
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        
        
        const priceString = deliveryOption.priceCents === 0 
            ?'FREE Shipping' 
            : `$${fm(deliveryOption.priceCents)} - Shipping`;
        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

        optionHTML += `
        <div class="delivery-option">
            <input type="radio" ${isChecked ? 'checked' : ''}
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
            <div>
                <div class="delivery-option-date">
                        ${deliveryDate.format('dddd, MMMM D')}
                </div>
                <div class="delivery-option-price">
                        ${priceString}
                </div>
            </div>
        </div>`;
    });
    return optionHTML;
};


document.querySelector('.js-order-summary').innerHTML = cartSummaryHtml;

document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
        link.addEventListener('click', (event) => {
            const productId = link.dataset.productId;
            removeFromCart(productId);
            const container = document.querySelector(
                `.js-cart-item-${productId}`);
            container.remove();
        });
    });