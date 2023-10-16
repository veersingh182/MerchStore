import {
    BrowserRouter as Router,
    Route,
    Routes,
    BrowserRouter,
} from "react-router-dom";
import Header from "./components/layout/Header";
import Home from "./components/Home";
import ProductDetails from "./components/ProductDetails";
import "./App.css";
import Cart from "./components/Cart";
import Shipping from "./components/Shipping";
// import PaymentPage from "./components/payment/payment";
import GetOrderDetails from "./components/GetOrderDetails";
import ManualPayment from "./components/payment/ManualPayment";
import AddCouponCode from "./components/AddCouponCode";
import OrderSuccess from "./components/OrderSuccess";
import ExcelDownloadComponent from "./components/GetUsersData";
import PaymentProof from "./components/PaymentProof";
// import IdProof from "./components/Idproof";
import VerifcationProof from "./components/VerifcationProof";
import RemoveCoupon from "./components/RemoveCoupon";
import DeleteOrders from "./components/DeleteOrders";
function App() {
    if (localStorage.getItem("expire_time")) {
        let expire_time = JSON.parse(localStorage.getItem("expire_time"));
        let curr_time = Date.now();

        if ((curr_time - expire_time) > (60 * 60 * 1000)) {
            localStorage.removeItem("expire_time");
        }
    }
    if (!localStorage.getItem("connect_dot_merchandise_cart1")) {
        localStorage.setItem(
            "connect_dot_merchandise_cart1",
            JSON.stringify({
                cartItems: [],
                subTotal: 0,
                shipping: 0,
                tax: 0,
                total: 0,
                couponType: "Percentage",
                couponAmount: 0,
                Discount: 0,
                coupon: ""
            })
        );
    }
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/shipping" element={<Shipping />} />
                    <Route path="/orderdetails" element={<GetOrderDetails />} />
                    {/* <Route
                        path="/order/payment/:orderId"
                        element={<PaymentPage />}
                    /> */}
                    <Route
                        path="/order/payment/:orderId"
                        element={<ManualPayment />}
                    />
                    <Route
                        path="/success/:orderId"
                        element={<OrderSuccess />}
                    />
                    <Route
                        path="/add-coupon"
                        element={<AddCouponCode />}
                    />
                    <Route
                        path="/remove-coupon"
                        element={<RemoveCoupon />}
                    />
                    <Route
                        path="/remove-order"
                        element={<DeleteOrders />}
                    />
                    <Route
                        path="/get-details"
                        element={<ExcelDownloadComponent />}
                    />
                    <Route
                        path="/paymentproofs/:imgAddress"
                        element={<PaymentProof />}
                    />
                    <Route
                        path="/verification/:imgAddress"
                        element={<VerifcationProof />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

// "start": "export PORT=3001 && react-scripts start" for ubuntu
// "start": "set PORT=3001 && react-scripts start" for windows

