import { cart } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency as fm } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary() {
    let productPriceCents = 0;
    let shippingPriceCents = 0;

    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;

        const getDeliveryOptions = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents += getDeliveryOptions.priceCents;
        // console.log(shippingPriceCents);

    });
    const totalCentsBeforeTax = productPriceCents + shippingPriceCents;
    const taxCents = Math.round(totalCentsBeforeTax * 0.1);
    const totalCents = totalCentsBeforeTax + taxCents;


    const paymentSummaryHtml = `
    <div class="payment-summary-title">
        Order Summary
        </div>

        <div class="payment-summary-row">
        <div>Items (3):</div>
        <div class="payment-summary-money">
        ${fm(productPriceCents)}  
        </div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">
                ${fm(shippingPriceCents)}
            </div>
        </div>

        <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">
            ${fm(totalCentsBeforeTax)}
        </div>
        </div>

        <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">${fm(taxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">${fm(totalCents)}</div>
        </div>

        <button class="place-order-button button-primary js-place-order">
        Place your order
        </button>
    `;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml;

    const placeOrderButton = document.querySelector('.js-place-order')
        .addEventListener('click', async () => {

            try {
                const response = await fetch('https://supersimplebackend.dev/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        cart,
                    })
                })
                const order = await response.json();
                addOrder(order);
            } catch (error) {
                console.error('Error placing order:', error);
                alert('There was an error placing your order. Please try again later.');
            }
            window.location.href = 'orders.html';
        });
}