import { renderOrderSummary } from "./checkout/ordersummary.js";
import { renderPaymentSummary } from "./checkout/paymentsummary.js";
import { loadProducts } from "../data/products.js";
import { loadProductsFetch } from "../data/products.js";
// import '../data/backend-practice.js'


async function loadPage(){
    console.log('Page loaded');
    await loadProductsFetch();
    renderOrderSummary();
    renderPaymentSummary();
}

loadPage();
// loadPage().then(() => {
//     console.log('Page loaded');
// });


// loadProductsFetch().then(()=>{
//     renderOrderSummary();
//     renderPaymentSummary();
// });



