import { renderOrderSummary } from "./checkout/ordersummary.js";
import { renderPaymentSummary } from "./checkout/paymentsummary.js";
import { loadProducts } from "../data/products.js";
// import '../data/backend-practice.js'


new Promise((resolve) => {

    loadProducts(()=>{
        resolve();
    });
}).then(()=>{
    renderOrderSummary();
    renderPaymentSummary();
});



