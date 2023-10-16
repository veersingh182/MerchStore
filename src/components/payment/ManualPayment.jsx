import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./mpayment.css";
import Onload from "../Onload/Onload";
import Qr from "../../assets/paymentqr.png";
const ManualPayment = () => {
  const [imgFile, setImgFile] = useState();
  const [transId, setTransId] = useState("");
  const [image, setImage] = useState("");
  const { orderId } = useParams();
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState({ msg: "" });
  const BACKEND = process.env.REACT_APP_BACKEND;
  useEffect(() => {
    setLoading(true);
    const findDetails = async () => {
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
        setOrderDetails({ data: data });
      } else {
        setOrderDetails({ msg: result.msg });
      }
    };
    findDetails();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  function handleChange(e) {
    setImgFile(URL.createObjectURL(e.target.files[0]));
  }
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
    handleChange(event);
  };
  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const handleSaveImage = async () => {
    if (!image) {
      window.alert("Please provide a payment proof");
      return;
    }
    const blob = dataURItoBlob(image);
    const formData = new FormData();
    formData.append("image", blob);
    formData.append("orderId", orderId);
    formData.append("transId", transId);
    const response = await fetch(BACKEND + "save-user-payment-proof", {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    window.alert(result.msg);
    if (result.isSuccess) {
      var sendId;
      if (!transId) {
        sendId = "$";
      } else {
        sendId = transId;
      }
      const Mydata = { transId: sendId, id: orderId };
      const updateTrans = await fetch(BACKEND + "mark-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Mydata),
      });
      const newresult = await updateTrans.json();
      if (!newresult.isSuccess) {
        window.alert(
          "Unable to update transaction id please contact the administrator, with your order id and transaction details"
        );
        return;
      }
    }
    window.location.href = `/success/${orderId}`;
  };
  return (
    <>
      {loading && <Onload />}
      {!loading && (
        <>
          {orderDetails.msg && (
            <>
              <h2>{orderDetails.msg}</h2>
            </>
          )}
          {orderDetails.data && (
            <div className="container-fluid manual-payment">
              <div className="container">
                <div className="d-flex justify-content-between align-items-center py-3">
                  <h6 className="h8 mb-0">Order #{orderId}</h6>
                </div>

                <div className="row">
                  <div className="col-lg-8">
                    <div className="card mb-4">
                      <div className="card-body">
                        <div className="mb-3 d-flex justify-content-between">
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "10px",
                            }}
                          >
                            <span className="me-3">
                              {new Date().toISOString().split("T")[0]}
                            </span>
                            <span className="me-3">#{orderId}</span>
                            <span className="badge rounded-pill bg-info">
                              ₹{orderDetails.data.orderDetails["total"]} Payment{" "}
                              {orderDetails.data.isPayment
                                ? "Transferred"
                                : "Active"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="mb-3 d-flex justify-content-between my-data-cont">
                          <div>
                            <label class="form-label" htmlFor="customFile">
                              Screen-shot of Transition Recipt
                            </label>
                            <input
                              type="file"
                              class="form-control"
                              id="customFile"
                              accept="image/*"
                              onChange={handleImageChange}
                            />
                            <label class="form-label">Transition Id</label>
                            <input
                              type="text"
                              class="form-control"
                              value={transId}
                              onChange={(e) => {
                                setTransId(e.target.value);
                              }}
                            />
                            <div className="submit-btn">
                              <div
                                className="btn btn-primary"
                                style={{ marginTop: "10px" }}
                                onClick={handleSaveImage}
                              >
                                {" "}
                                Submit{" "}
                              </div>
                            </div>
                          </div>
                          <div className="img-preview">
                            <img src={imgFile} className="img-fluid" alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div class="card mb-4">
                      <div class="card-body">
                        <h3 class="h6">Note - </h3>
                        <p>
                          After paying of required amount you have to upload a
                          screenshot of payment recipt.
                        </p>
                      </div>
                    </div>
                    <div className="card mb-4">
                      <div className="card-body">
                        <h3 className="h6">Account Details </h3>
                        <div
                          className="img-container"
                          style={{
                            height: "340px",
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src={Qr}
                            alt="Qr"
                            style={{ height: "300px", width: "300px" }}
                          />
                        </div>
                        <hr />
                        <div>
                          <strong>Bank Name - </strong>
                          Canara Bank
                          <br />
                          <strong>Account Number - </strong>
                          120024050918
                          <br />
                          <strong>IFSC Code - </strong>
                          CNRB0017074
                          <br />
                          <strong>Account Holder Name - </strong>
                          THE CONNECT DOT
                          <br />
                          <strong>Mobile Number - </strong>
                          +916351251273
                          <br />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ManualPayment;
