import React from "react";
import TextField from "@mui/material/TextField";

function DeleteOrders() {
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
    const OrderId = document.getElementById("OrderId").value;
    const password = document.getElementById("Passcode").value;
    if (!password || !OrderId) {
      window.alert("Enter details first!");
      return;
    } else {
      const data = {
        password: password,
        OrderId: OrderId,
      };
      const response = await fetch(BACKEND + "delete-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (result.isSuccess) {
        document.getElementById("Passcode").value = "";
        document.getElementById("OrderId").value = "";
        window.alert("Order deleted successfully");
      } else {
        window.alert(result.msg);
      }
    }
  };
  return (
    <div style={contStyle}>
      <TextField id="OrderId" label="Order Id*" variant="standard" fullWidth />
      <TextField id="Passcode" label="Passcode*" variant="standard" fullWidth />
      <button onClick={handleDeleteButton} className="btn btn-primary">
        Delete Order
      </button>
    </div>
  );
}

export default DeleteOrders;
