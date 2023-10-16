import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Shipping() {
  const OrderDetails = useSelector((state) => state.cart);
  const [sendData, setSendData] = useState([]);
  const navigate = useNavigate();
  const BACKEND = process.env.REACT_APP_BACKEND;
  useEffect(() => {
    var curr = [];
    for (let index = 0; index < OrderDetails["cartItems"].length; index++) {
      const element = OrderDetails["cartItems"][index];
      var data = {
        id: element.product.id,
        name: element.product.name,
        quantity: element.product.quantity,
        addon: element.addon,
        size: element.size,
      };
      curr.push(data);
    }
    setSendData(curr);
  }, []);
  const currencies = [
    {
      value: "Logo",
      label: "Logo",
    },
    {
      value: "Text",
      label: "Text",
    },
  ];
  const [image, setImage] = useState("");

  const handleImageChange = (event) => {
    try {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const dataURItoBlob = (dataURI) => {
    try {
      const byteString = atob(dataURI.split(",")[1]);
      const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var coupon = OrderDetails["coupon"];
    if (coupon || coupon !== "") {
      const check = await fetch(BACKEND + "dec-coupon-amount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: coupon,
        }),
      });
      const res_chck = await check.json();
      if (!res_chck.isSuccess || (res_chck.isSuccess && !res_chck.valid)) {
        window.alert(
          `There is some issue with coupon code you have used :${res_chck.msg}\nEither remove items from your cart or use another code!`
        );
        window.location.href = "/cart";
        return;
      }
    }

    const blob = dataURItoBlob(image);
    const formData = new FormData();
    const FullName =
      document.getElementById("firstName").value +
      " " +
      document.getElementById("lastName").value;
    const Address = document.getElementById("deliveryAddress").value;
    const Email = document.getElementById("email").value;
    const PNumber = document.getElementById("pnumber").value;
    if (!FullName || !Address || !blob || !Email || !PNumber) {
      window.alert("Please enter all details");
      return;
    }
    formData.append("image", blob);
    formData.append("FullName", FullName);
    formData.append("Address", Address);
    formData.append("Email", Email);
    formData.append("PNumber", PNumber);
    var sendDet = {
      shipping: OrderDetails["shipping"],
      subTotal: OrderDetails["subTotal"],
      total: OrderDetails["total"],
      tax: OrderDetails["tax"],
      coupon: OrderDetails["coupon"],
      cartItems: sendData,
    };
    formData.append("orderDetails", JSON.stringify(sendDet));

    const response = await fetch(BACKEND + "order-placed", {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    if (result.scam) {
      window.alert(result.msg);
      localStorage.removeItem("connect_dot_merchandise_cart1");
      navigate("/");
    } else if (result.isSuccess) {
      localStorage.removeItem("connect_dot_merchandise_cart1");
      navigate(`/order/payment/${result.orderId}`);
    } else {
      window.alert("Can't place order");
    }
  };
  const formContainerStyle = {
    maxWidth: "400px",
    margin: "20px auto 0",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  const formGroupStyle = {
    marginBottom: "20px",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "5px",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  const textareaStyle = {
    width: "100%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    resize: "vertical",
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    <div style={formContainerStyle}>
      <form>
        <div style={formGroupStyle}>
          <label style={labelStyle} htmlFor="firstName">
            First Name
          </label>
          <input
            style={inputStyle}
            type="text"
            id="firstName"
            name="firstName"
            required
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle} htmlFor="lastName">
            Last Name
          </label>
          <input
            style={inputStyle}
            type="text"
            id="lastName"
            name="lastName"
            required
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle} htmlFor="email">
            Email Address
          </label>
          <input
            style={inputStyle}
            type="text"
            id="email"
            name="email"
            required
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle} htmlFor="pnumber">
            Phone Number
          </label>
          <input
            style={inputStyle}
            type="text"
            id="pnumber"
            name="pnumber"
            required
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle} htmlFor="idProof">
            ID Proof
          </label>
          <input
            style={inputStyle}
            type="file"
            id="idProof"
            name="idProof"
            accept="image/*"
            required
            onChange={handleImageChange}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle} htmlFor="deliveryAddress">
            Delivery Address
          </label>
          <textarea
            style={textareaStyle}
            id="deliveryAddress"
            name="deliveryAddress"
            rows="4"
            required
          ></textarea>
        </div>
        <button style={buttonStyle} onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}
