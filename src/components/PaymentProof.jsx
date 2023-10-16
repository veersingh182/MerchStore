import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function PaymentProof() {
  const [img, setImage] = useState(null);
  const BACKEND = process.env.REACT_APP_BACKEND;
  const { imgAddress } = useParams();
  useEffect(() => {
    const loadImage = async () => {
      const data = {
        address: imgAddress,
        type: "payment",
      };
      const response = await fetch(BACKEND + "load-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (result.isSuccess) {
        setImage(result.img);
      } else {
        window.alert(result.msg);
      }
    };
    loadImage();
  }, []);
  const pageStyle = {
    height: "100vh",
    width: "100vw",
    minWidth: "350px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const imageCont = {
    width: "320px",
    height: "auto",
  };
  return (
    <div className="payment-proof" style={pageStyle}>
      {/* {img && (
        <div className="Img-container" style={imageCont}>
          <img src={img} alt="" style={imageCont} />
          <img
            src={`${BACKEND}payments/${imgAddress}`}
            alt=""
            style={imageCont}
          />
        </div>
      )} */}
      <div className="Img-container" style={imageCont}>
        {/* <img src={img} alt="" style={imageCont} /> */}
        <img
          src={`${BACKEND}payments/${imgAddress}`}
          alt=""
          style={imageCont}
        />
      </div>
    </div>
  );
}
