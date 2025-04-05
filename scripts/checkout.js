import { renderOrderSummary } from "./checkout/ordersummary.js";
import { renderPaymentSummary } from "./checkout/paymentsummary.js";
import { loadProducts } from "../data/products.js";
// import '../data/backend-practice.js'

loadProducts(()=>{
    renderOrderSummary();
    renderPaymentSummary();
});
