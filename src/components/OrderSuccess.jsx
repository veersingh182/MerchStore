import React from "react";
import { useParams } from "react-router-dom";

export default function OrderSuccess() {
  const { orderId } = useParams();

  return (
    <div
      className="order-success-page"
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="order-succ-cont"
        style={{
          width: "350px",
          height: "fit-content",
          padding: "20px",
          paddingInline: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
          color: "black",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
      >
        <h6
          style={{ fontWeight: "500", color: "black", letterSpacing: "0.8px" }}
        >
          You have successfully placed your order
        </h6>
        <h8
          style={{ fontWeight: "500", color: "black", letterSpacing: "0.5px" }}
        >
          This is Your order Id :
        </h8>{" "}
        <h9
          style={{ fontWeight: "400", color: "black", letterSpacing: "0.4px" }}
        >
          {orderId}
        </h9>
        <h9
          style={{ fontWeight: "500", color: "grey", letterSpacing: "0.8px" }}
        >
          Copy your order id and click on the below button to get details of
          your order
        </h9>
        <div className="btn-cont">
          <a href="/orderdetails">
            <div className="btn btn-primary">Click</div>
          </a>
        </div>
      </div>
    </div>
  );
}
