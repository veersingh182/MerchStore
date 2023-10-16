import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

export default function AddCouponCode() {
  const pageStyle = {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const formStyle = {
    width: "80%",
    minWidth: "300px",
    maxWidth: "800px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    padding: "10px",
  };
  const childCont = {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: "10px",
  };
  const [DiscountType, setDiscountType] = useState("Percentage");
  const Type = [
    {
      value: "Percentage",
      label: "Percentage",
    },
    {
      value: "Price",
      label: "Price",
    },
  ];

  const BACKEND = process.env.REACT_APP_BACKEND;
  const handleCodeSubmit = async () => {
    const verification = document.getElementById("verificationCode").value;
    if (verification !== "CONNECTDOT2023") {
      window.alert("Invalid verification code");
      return;
    }
    const code = document.getElementById("couponCode").value;
    const discountType = DiscountType;
    const amount = document.getElementById("couponAmount").value;
    const description = document.getElementById("Description").value;
    const discountAmount = document.getElementById("Discount").value;
    if (
      !code ||
      code === "" ||
      !description ||
      !discountType ||
      !discountAmount
    ) {
      window.alert("Please enter all details");
      return;
    }
    const data = {
      code: code,
      amount: amount,
      description: description,
      discountType: discountType,
      discountAmount: discountAmount,
    };
    const response = await fetch(BACKEND + "add-coupon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    window.alert(result.msg);
  };
  return (
    <div className="add-coupon-code" style={pageStyle}>
      <div className="code-form" style={formStyle}>
        <div className="code" style={childCont}>
          <TextField
            id="couponCode"
            label="Coupon Code*"
            variant="standard"
            fullWidth
          />
        </div>
        <div className="discount" style={childCont}>
          <TextField
            id="Discount"
            label="Discount Amount*"
            variant="standard"
            fullWidth
            style={{ width: "50%" }}
            type="number"
          />
          <TextField
            id="discountType"
            select
            label="Discount Type*"
            defaultValue="Percentage"
            style={{ width: "50%" }}
            variant="standard"
            onChange={(e) => {
              setDiscountType(e.target.value);
            }}
          >
            {Type.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="desc" style={childCont}>
          <TextField
            id="Description"
            label="Description*"
            variant="standard"
            fullWidth
          />
        </div>
        <div className="amount" style={childCont}>
          <TextField
            id="couponAmount"
            label="Amount of Coupons"
            variant="standard"
            fullWidth
            type="number"
          />
        </div>
        <div className="verification" style={childCont}>
          <TextField
            id="verificationCode"
            label="Secret Password*"
            variant="standard"
            fullWidth
          />
        </div>
        <div className="submit-btn">
          <div className="btn btn-primary" onClick={handleCodeSubmit}>
            Submit
          </div>
        </div>
      </div>
    </div>
  );
}
