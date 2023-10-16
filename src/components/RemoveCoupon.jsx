import React from "react";
import TextField from "@mui/material/TextField";

function RemoveCoupon() {
  const BACKEND = process.env.REACT_APP_BACKEND;
  const contStyle = {
    height: "auto",
    width: "300px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    margin: "0 auto",
  };
  const handleDeleteButton = async () => {
    const coupon = document.getElementById("coupon").value;
    const password = document.getElementById("Passcode").value;
    if (!password || !coupon) {
      window.alert("Enter details first!");
      return;
    } else {
      const data = {
        password: password,
        coupon: coupon,
      };
      const response = await fetch(BACKEND + "delete-coupon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (result.isSuccess) {
        document.getElementById("Passcode").value = "";
        document.getElementById("coupon").value = "";
        window.alert("Coupon deleted successfully");
      } else {
        window.alert(result.msg);
      }
    }
  };
  return (
    <div style={contStyle}>
      <TextField
        id="coupon"
        label="Coupon Name*"
        variant="standard"
        fullWidth
      />
      <TextField id="Passcode" label="Passcode*" variant="standard" fullWidth />
      <button onClick={handleDeleteButton} className="btn btn-primary">
        Delete Coupon
      </button>
    </div>
  );
}

export default RemoveCoupon;
