import React, { Fragment, useState, useEffect } from "react";
// import Search from "./Search";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import logo from "../../assets/logo.png";
import "./header.css";

const Header = () => {
  const { subTotal, cartItems } = useSelector((state) => state.cart);
  const [coupons, setCoupons] = useState({ msg: "Loading coupons..." });
  const BACKEND = process.env.REACT_APP_BACKEND;

  useEffect(() => {
    const loadCoupons = async () => {
      const response = await fetch(BACKEND + "get-coupons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: "CONNECTDOT2023" }),
      });
      const result = await response.json();
      if (result.isSuccess) {
        setCoupons({ coupons: result.coupons });
      } else {
        setCoupons({ msg: result.msg });
      }
    };
    loadCoupons();
  }, []);
  return (
    <Fragment>
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            to="/"
            style={{ fontSize: "1.2rem", fontWeight: "bold" }}
          >
            Merchandise Store
          </Link>
          <img
            src={logo}
            alt="logo"
            style={{
              height: "70px",
              width: "70px",
              marginInline: "10px",
              borderRadius: "10px",
            }}
          />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ padding: "10px" }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* <Search /> */}
            <ul className="navbar-nav">
              <li className="nav-item cart-btn-custom border rounded me-3">
                <Link className="nav-link" to="/cart">
                  <i className="h5 ms-1 bi bi-cart-check"></i>
                  <span className="ms-2 h5">{cartItems?.length}</span>
                </Link>
              </li>
            </ul>
            <div className="dropdown coupons">
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              >
                coupons
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                {coupons.msg && (
                  <>
                    <h6>{coupons.msg}</h6>
                  </>
                )}
                {coupons.coupons && (
                  <>
                    {coupons.coupons.map((coupon, key) => {
                      return (
                        <div className="cpn" key={key}>
                          <li className="m-2">
                            <div className="col-12 float-right">
                              "
                              <span className="fw-bold" id="coupon1">
                                {coupon.Code}
                              </span>
                              " {coupon.Description}{" "}
                              <span
                                className="btn btn-outline-success ms-2"
                                style={{
                                  padding: "4px 8px",
                                  fontSize: "0.7rem",
                                }}
                                onClick={() => {
                                  navigator.clipboard.writeText(coupon.Code);
                                  window.alert("Coupon copied to clipboard");
                                }}
                              >
                                COPY
                              </span>
                            </div>
                          </li>
                          <hr />
                        </div>
                      );
                    })}
                  </>
                )}
                {/* <li className="m-2">
                  <div className="col-12 float-right">
                    "
                    <span className="fw-bold" id="coupon2">
                      ALUMNI20
                    </span>
                    " Get flat 20% off on order more then 2000{" "}
                    <span
                      className="btn btn-outline-success ms-2"
                      style={{
                        padding: "4px 8px",
                        fontSize: "0.7rem",
                      }}
                      onClick={() => {
                        copyToClipboard("coupon2");
                      }}
                    >
                      COPY
                    </span>
                  </div>
                </li>
                <hr />
                <li className="m-2">
                  <div className="col-12 float-right">
                    "
                    <span className="fw-bold" id="coupon3">
                      DIWALI15
                    </span>
                    " Get flat 15% off from 10 oct. to 20 oct.{" "}
                    <span
                      className="btn btn-outline-success ms-2"
                      style={{
                        padding: "4px 8px",
                        fontSize: "0.7rem",
                      }}
                      onClick={() => {
                        copyToClipboard("coupon3");
                      }}
                    >
                      COPY
                    </span>
                  </div>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </nav>
      {cartItems.length > 0 && subTotal < 2000 && (
        <div
          className="bg-info px-3 py-2"
          style={{ color: "black", fontWeight: "500" }}
        >
          Add Products worth ₹{2000 - subTotal}/- to Your Cart and Get Free
          Delivery.
        </div>
      )}
    </Fragment>
  );
};

export default Header;
