import React from "react";
import { useState, Fragment, useEffect } from "react";
import TextField from "@mui/material/TextField";
import "./GetOrderDetails.css";
import { Link } from "react-router-dom";
import Alumni from "./Alumni";
import Students from "./Students";

export default function GetOrderDetails() {
  const [orderDetails, setOrderDetails] = useState(null);
  const BACKEND = process.env.REACT_APP_BACKEND;
  const keyPair = {
    fontSize: "15px",
    letterSpacing: "0.2px",
    fontWeight: "500",
  };
  const valuePair = {
    fontSize: "15px",
    letterSpacing: "0.1px",
    fontWeight: "300",
  };
  const handleOrderId = async () => {
    // const formData = new FormData();
    const orderId = document.getElementById("orderId").value;
    if (!orderId) {
      window.alert("Please enter a valid order id");
      return;
    }
    const response = await fetch(BACKEND + "get-order-details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: orderId,
      }),
    });
    const result = await response.json();
    if (!result.msg) {
      var data = result.data;
      data["id"] = orderId;
      data["orderDetail"] = data.orderDetails;
      setOrderDetails({ data: data });
    } else {
      setOrderDetails({ msg: result.msg });
    }
  };
  return (
    <div className="get-order-details">
      <div className="details-container">
        {!orderDetails && (
          <>
            <div className="order-id-textfield">
              Enter Order Id :{" "}
              <TextField id="orderId" label="Order Id" variant="standard" />
            </div>
            <div className="submit-btn">
              <div className="btn btn-primary" onClick={handleOrderId}>
                Submit
              </div>
            </div>
          </>
        )}
        {orderDetails && (
          <>
            {orderDetails.msg && <>orderDetails.msg</>}
            {!orderDetails.msg && (
              <>
                <div
                  className="title"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <div style={keyPair}>Order Details for Id :</div>{" "}
                  <div style={valuePair}>{orderDetails.data.id}</div>
                </div>
                <div className="user-detials" style={{ paddingInline: "5px" }}>
                  <div
                    className="title"
                    style={{
                      fontSize: "20px",
                      letterSpacing: "0.5px",
                      fontWeight: "500",
                    }}
                  >
                    User Details{" "}
                  </div>
                  <div
                    className="details-cont"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      marginLeft: "10px",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <div style={keyPair}>Full Name</div>{" "}
                      <div style={valuePair}>
                        : {orderDetails.data.FullName}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <div style={keyPair}>Email</div>{" "}
                      <div style={valuePair}>: {orderDetails.data.Email}</div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <div style={keyPair}>Phone Number</div>{" "}
                      <div style={valuePair}>: {orderDetails.data.PNumber}</div>
                    </div>
                  </div>
                </div>
                <Fragment>
                  <div
                    className="title"
                    style={{
                      fontSize: "20px",
                      letterSpacing: "0.5px",
                      fontWeight: "500",
                      paddingInline: "10px",
                    }}
                  >
                    Order Details
                  </div>
                  <section className="" style={{ marginBottom: "20px" }}>
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-9">
                          <div className="card border shadow-0">
                            <div className="m-4">
                              <h4 className="card-title mb-4">
                                Total Items :{" "}
                                {
                                  orderDetails.data.orderDetail.cartItems
                                    ?.length
                                }{" "}
                                items
                              </h4>
                              {orderDetails.data.orderDetail.cartItems?.map(
                                (item) => (
                                  <CartItem key={item.id} item={item} />
                                )
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div
                            className="card mb-3 border shadow-0"
                            style={{ minWidth: "250px" }}
                          >
                            <div className="card-body">
                              <span className="me-2">Total Items :</span>
                              {orderDetails.data.orderDetail.cartItems.reduce(
                                (acc, item) => acc + Number(item.quantity),
                                0
                              )}
                            </div>
                          </div>

                          <div
                            className="card shadow-0 border"
                            style={{ minWidth: "250px" }}
                          >
                            <div className="card-body">
                              <div className="d-flex justify-content-between">
                                <p className="mb-2">Subtotal price:</p>
                                <p className="mb-2">
                                  ₹{orderDetails.data.orderDetail.subTotal}
                                </p>
                              </div>
                              <div className="d-flex justify-content-between">
                                <p className="mb-2">Shipping:</p>
                                <p className="mb-2 text-success">
                                  ₹{orderDetails.data.orderDetail.shipping}
                                </p>
                              </div>

                              <hr />
                              <div className="d-flex justify-content-between">
                                <p className="mb-2">Total price:</p>
                                <p className="mb-2 fw-bold">
                                  ₹{orderDetails.data.orderDetail.total}
                                </p>
                              </div>
                              <div className="d-flex justify-content-between">
                                <p className="mb-2">Total tax:</p>
                                <p className="mb-2 fw-bold">
                                  ₹{orderDetails.data.orderDetail.tax}
                                </p>
                              </div>
                              <hr />
                              <div className="d-flex justify-content-between">
                                <p className="mb-2">Transaction Id:</p>
                                <p className="mb-2">
                                  {orderDetails.data.transactionId === "$"
                                    ? "Null"
                                    : orderDetails.data.transactionId}
                                </p>
                              </div>
                              <div className="d-flex justify-content-between">
                                <p className="mb-2">Payment Status:</p>
                                <p className="mb-2 ">
                                  {orderDetails.data.isPayment
                                    ? "Transferred"
                                    : "Active"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </Fragment>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const CartItem = ({ item }) => {
  const keyPair = {
    fontSize: "15px",
    letterSpacing: "0.2px",
    fontWeight: "500",
  };
  const valuePair = {
    fontSize: "15px",
    letterSpacing: "0.1px",
    fontWeight: "300",
  };
  const id = item.id;
  var Items;
  if (Math.floor(id / 1000) === 2) {
    Items = Alumni;
  } else {
    Items = Students;
  }
  const getProductImage = (id) => {
    const numId = Number(id);

    var cat = Math.floor(numId / 100);
    cat = Math.floor(cat % 10);
    let category = "none",
      index = numId % 10;
    if (cat === 1) {
      category = "Tshirts";
    } else if (cat === 2) {
      category = "Hoodies";
    } else if (cat === 3) {
      category = "Caps";
    } else {
      category = "Combos";
    }
    return Items[category][index - 1].images[0];
  };
  return (
    <div className="row gy-3 mb-4">
      <div className="col-lg-5">
        <div className="me-lg-5">
          <div className="d-flex">
            <img
              src={getProductImage(item.id)}
              className="border rounded me-3"
              id="cart-img-id"
              style={{
                width: "96px !important",
                height: "fit-content",
              }}
              alt=""
            />
            <div className="">
              <div className="item-name">
                {item?.name.substring(0, 20) + "..."}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
        <div className="input-group mb-2" style={{ width: "150px" }}>
          <input
            type="text"
            style={{
              width: "40px",
              height: "40px",
            }}
            className="text-center border border-secondary"
            value={item.quantity}
            readOnly
          />
        </div>
        <div className="" style={{ display: "flex", flexDirection: "column" }}>
          <small
            className="text-muted text-nowrap"
            style={{ display: "flex", flexDirection: "row", gap: "5px" }}
          >
            <div style={keyPair}>Addon :</div>{" "}
            <div style={valuePair}>{item.addon}</div>
          </small>
          <small
            className="text-muted text-nowrap"
            style={{ display: "flex", flexDirection: "row", gap: "5px" }}
          >
            <div style={keyPair}>Size :</div>{" "}
            <div style={valuePair}>{item.size}</div>
          </small>
        </div>
      </div>
    </div>
  );
};
