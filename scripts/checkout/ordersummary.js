import { cart, removeFromCart, updateDeliveryDate } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency as fm } from "../utils/money.js";
import dayjs from "https://cdn.skypack.dev/dayjs@1.10.7";
import {getDeliveryOption, deliveryOptions } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentsummary.js";


export function renderOrderSummary() {



    let cartSummaryHtml = '';
    cart.forEach((cartItem) => {

        const productId = cartItem.productId;

        let matchingProduct = getProduct(productId);
        if (!matchingProduct) {
            console.error(`Product with ID ${productId} not found.`);
            return;
        }

        let deliveryOptionId = cartItem.deliveryOptionId;
        let deliveryOption = getDeliveryOption(deliveryOptionId);
        

        // Default to the first delivery option if none is found
        if (!deliveryOption && deliveryOptions.length > 0) {
            deliveryOption = deliveryOptions[1];
        }

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

                    <div class="delivery-options ">
                        <div class="delivery-options-title">
                            Choose a delivery option:
                        </div>
                        ${deliveryOptionsHTML(matchingProduct, cartItem)}
                    </div>
            </div>
        </div>`;
    });
    function deliveryOptionsHTML(matchingProduct, cartItem) {
        let optionHTML = '';
        deliveryOptions.forEach((deliveryOption) => {
            const today = dayjs();
            const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');


            const priceString = deliveryOption.priceCents === 0
                ? 'FREE Shipping'
                : `$${fm(deliveryOption.priceCents)} - Shipping`;
            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

            optionHTML += `
            <div class="delivery-option js-delivery-options"
                data-delivery-option-id="${deliveryOption.id}"
                data-product-id="${matchingProduct.id}">
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
                renderOrderSummary();
                renderPaymentSummary();
                // No need to manually remove the element since we're re-rendering the entire order summary
            });
        });

    document.querySelectorAll('.js-delivery-options')
        .forEach((element) => {
            element.addEventListener('click', () => {
                const { productId, deliveryOptionId } = element.dataset;
                updateDeliveryDate(productId, deliveryOptionId);
                renderOrderSummary();
                renderPaymentSummary();
            });
        });
}

renderOrderSummary();   