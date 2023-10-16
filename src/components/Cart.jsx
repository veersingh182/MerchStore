import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  // const dispatch = useDispatch();
  const { cartItems, subTotal, shipping, tax, total, Discount } = useSelector(
    (state) => state.cart
  );
  const BACKEND = process.env.REACT_APP_BACKEND;
  const dispatch = useDispatch();
  const handleCoupon = async () => {
    const code = document.getElementById("couponCode").value;
    if (!code || code === "") {
      window.alert("Enter a coupon code");
      return;
    } else {
      const response = await fetch(BACKEND + "verify-coupon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: code }),
      });
      const result = await response.json();
      if (!result.isSuccess || !result.valid) {
      } else {
        const coupon = result.data;
        dispatch({ type: "addCoupon", payload: { coupon: coupon } });
        dispatch({ type: "calculatePrice" });
      }
      window.alert(result.msg);
    }
  };

  return (
    <Fragment>
      {cartItems?.length === 0 ? (
        <h3 className="ms-4 mt-4 vh-100">Your Cart is Empty</h3>
      ) : (
        <section className="bg-light my-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-9">
                <div className="card border shadow-0">
                  <div className="m-4">
                    <h4 className="card-title mb-4">
                      Your Cart : {cartItems?.length} items
                    </h4>
                    {cartItems?.map((item) => (
                      <CartItem key={item.product.id} item={item} />
                    ))}
                  </div>

                  <div className="border-top pt-4 mx-4 mb-4">
                    <p>
                      <i className="fas fa-truck text-muted fa-lg"></i> Free
                      Delivery within 1-2 weeks
                    </p>
                    <p className="text-muted">
                      If you have any questions or comments, please contact us
                      at <strong>theconnectdotco@gmail.com</strong>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="card mb-3 border shadow-0">
                  <div className="card-body">
                    <div>
                      <div className="form-group">
                        <label className="form-label">Have coupon?</label>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control border"
                            name=""
                            placeholder="Coupon code"
                            id="couponCode"
                          />
                          <button
                            className="btn btn-light border cpn-apply"
                            // disabled={true}
                            onClick={handleCoupon}
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card mb-3 border shadow-0">
                  <div className="card-body">
                    <span className="me-2">Total Items :</span>
                    {cartItems.reduce(
                      (acc, item) => acc + Number(item.product.quantity),
                      0
                    )}
                  </div>
                </div>

                <div className="card shadow-0 border">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <p className="mb-2">Subtotal price:</p>
                      <p className="mb-2">₹{subTotal}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="mb-2">Shipping:</p>
                      <p className="mb-2 text-success">₹{shipping}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="mb-2">Gst Tax:</p>
                      <p className="mb-2 text-success">₹{tax}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="mb-2">Discount:</p>
                      <p className="mb-2 text-success">₹{Discount}</p>
                    </div>

                    <hr />
                    <div className="d-flex justify-content-between">
                      <p className="mb-2">Total price:</p>
                      <p className="mb-2 fw-bold">₹{total}</p>
                    </div>

                    <div className="mt-3">
                      <Link
                        to="/shipping"
                        className="btn btn-success w-100 shadow-0 mb-2"
                      >
                        Checkout
                      </Link>
                      <Link
                        to={"/"}
                        className="btn btn-light w-100 border mt-2"
                      >
                        {" "}
                        Back to shop{" "}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- summary --> */}
            </div>
          </div>
        </section>
      )}
    </Fragment>
  );
};

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const { cartItems, subTotal, shipping, tax, total } = useSelector(
    (state) => state.cart
  );
  let ind = cartItems.findIndex((i) => i.product.id === item.product.id);

  const [qty, setQty] = useState(cartItems[ind]["product"].quantity);
  const [totalPrice, setTotalPrice] = useState(
    cartItems[ind]["product"].quantity * cartItems[ind]["product"].price +
      (cartItems[ind].addon ? cartItems[ind]["product"].quantity * 50 : 0)
  );
  const increment = (item) => {
    let ind = cartItems.findIndex(
      (i) => i.product.id === Number(item.product.id)
    );
    dispatch({ type: "addToCart", payload: item });
    dispatch({ type: "calculatePrice" });

    setQty(ind === -1 ? 0 : cartItems[ind]["product"].quantity + 1);
    setTotalPrice(
      cartItems[ind]["product"].price *
        (cartItems[ind]["product"].quantity + 1) +
        (cartItems[ind].addon ? 50 : 0)
    );
  };

  const decrement = (id) => {
    let ind = cartItems.findIndex((i) => i.product.id === Number(id));
    dispatch({ type: "decrement", payload: id });
    dispatch({ type: "calculatePrice" });

    setQty(ind === -1 ? 0 : cartItems[ind]["product"].quantity - 1);
    setTotalPrice(
      cartItems[ind]["product"].price *
        (cartItems[ind]["product"].quantity - 1) +
        (cartItems[ind].addon ? 50 : 0)
    );
  };
  const deleteHandler = (id) => {
    dispatch({ type: "deleteItem", payload: id });
    dispatch({ type: "calculatePrice" });
  };

  return (
    <div className="row gy-3 mb-4">
      <div className="col-lg-5">
        <div className="me-lg-5">
          <div className="d-flex">
            <img
              src={item.product.images[0]}
              className="border rounded me-3"
              id="cart-img-id"
              style={{
                width: "96px !important",
                height: "fit-content",
              }}
              alt=""
            />
            <div className="">
              <Link to={`/product/₹{item.product}`} className="nav-link">
                {item?.product.name.substring(0, 20) + "..."}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
        <div className="input-group mb-2" style={{ width: "150px" }}>
          <button
            className="px-2 btn btn-outline-danger border border-secondary"
            type="button"
            style={{ height: "40px" }}
            data-mdb-ripple-color="dark"
            onClick={() => {
              decrement(item.product.id);
            }}
          >
            -
          </button>
          <input
            type="text"
            style={{
              width: "40px",
              height: "40px",
            }}
            className="text-center border border-secondary"
            value={qty}
            readOnly
          />
          <button
            className="btn btn-outline-success border border-secondary"
            type="button"
            style={{
              padding: "0 6px",
              height: "40px",
            }}
            data-mdb-ripple-color="dark"
            onClick={() => {
              increment(item);
            }}
          >
            +
          </button>
        </div>
        <div className="">
          <span className="h6">₹{totalPrice}</span> <br />
          <small className="text-muted text-nowrap">
            {" "}
            ₹{item.product.price} / per item{" "}
          </small>
        </div>
      </div>
      <div className="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
        <div className="float-md-end">
          <a
            href="#"
            className="btn btn-light border text-danger icon-hover-danger"
            onClick={() => {
              deleteHandler(item.product.id);
            }}
          >
            <i className="bi bi-trash"></i>
          </a>
        </div>
      </div>
    </div>
  );
};
export default Cart;
