import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-stars";
import { Link, useParams } from "react-router-dom";
import Alumni from "./Alumni";
import Students from "./Students";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import chart from "../assets/sizeChart.jpg";

const ProductDetails = () => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [name, setName] = useState("");

  const handleAddon = (valid) => {
    if (valid) {
      document.getElementById("enabled-name").style.display = "block";
    } else {
      document.getElementById("enabled-name").style.display = "none";
    }
  };
  const handleNo = (valid) => {
    if (valid) {
      document.getElementById("addon-check").value = false;
    }
  };
  const [size, setSize] = useState(36);
  const sizes = [
    {
      value: "36",
      label: "36",
    },
    {
      value: "38",
      label: "38",
    },
    {
      value: "40",
      label: "40",
    },
    {
      value: "42",
      label: "42",
    },
    {
      value: "44",
      label: "44",
    },
  ];
  const { cartItems, subTotal, shipping, tax, total } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();

  const { id } = useParams();
  var Items;
  if (id[0] == "2") {
    Items = Alumni;
  } else {
    Items = Students;
  }
  const ind = cartItems
    ? cartItems.findIndex((i) => i.product.id === Number(id))
    : -1;
  const [qty, setQty] = useState(
    ind === -1 ? 0 : cartItems[ind].product.quantity
  );

  const getProduct = (id) => {
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
    return Items[category][index - 1];
  };
  const saveAddon = (name, id) => {
    if (name === "") {
      return;
    }
    dispatch({
      type: "addAddon",
      payload: { id: id, name: name },
    });
    dispatch({ type: "calculatePrice" });
  };
  const saveSize = (currsize, id) => {
    if (currsize === "") {
      return;
    }
    dispatch({
      type: "addSize",
      payload: { id: id, size: currsize },
    });
    // dispatch({ type: "calculatePrice" });
  };
  const handlesetAddon = (value) => {
    setName(value);
    saveAddon(value, id);
  };
  const handlesetSize = (value) => {
    setSize(value);
    saveSize(value, id);
  };
  var product = getProduct(id);

  const increment = (id) => {
    // product["quantity"] = 1;
    dispatch({
      type: "addToCart",
      payload: { product: product, addon: name, size: size },
    });
    dispatch({ type: "calculatePrice" });
  };

  const decrement = (id) => {
    dispatch({ type: "decrement", payload: id });
    dispatch({ type: "calculatePrice" });
  };

  const [isZoomed, setZoomed] = useState(false);

  const toggleZoom = () => {
    setZoomed((prevZoomed) => !prevZoomed);
  };

  const imageStyle = {
    width: isZoomed ? "400px" : "100px", // Increase the width when zoomed
    height: isZoomed ? "400px" : "100px", // Increase the height when zoomed
    cursor: "pointer",
    maxWidth: "90%",
    maxHeight: "90%",
    transition: "width 0.3s, height 0.3s", // Add smooth transition for a zoom effect
  };

  return (
    <section className="py-5" style={{ backgroundColor: "#edd" }}>
      <div className="container">
        <div className="row gx-5">
          <div className="col-lg-6">
            <Carousel
              autoPlay
              infiniteLoop
              interval={5000}
              showStatus={false}
              showThumbs={true}
              showArrows={true}
            >
              {product?.images.map((image, index) => (
                <div key={index} style={{ height: "400px" }}>
                  <img className="img-fluid" src={image} />
                </div>
              ))}
            </Carousel>
            {/* <div style={{ height: "400px", width:"400px"}}>

                            <img src={dummyImg} style={{
                                height: "inherit",
                                width: "inherit",
                            }} alt="" />
                            </div> */}
          </div>
          <main className="col-lg-6">
            <div className="ps-lg-3">
              <h4 className="title text-dark">{product?.name}</h4>
              <div className="d-flex flex-row my-3 align-items-center">
                {/* <div className=" text-warning mb-1 me-2">
                  <ReactStars
                    count={5}
                    value={product?.ratings}
                    size={30}
                    color2={"#ffd700"}
                    edit={false}
                    half={true}
                  />
                </div>
                <span className="text-muted me-3">
                  ({product?.numOfReviews} Reviews)
                </span> */}
                {product?.stock > 0 ? (
                  <span className="text-success ms-2">In stock</span>
                ) : (
                  <span className="text-danger ms-2">Out of stock</span>
                )}
              </div>

              <div className="mb-3">
                <span className="h5">₹{product?.price}</span>
                <span className="text-muted">/per Item</span>
              </div>

              <p>{product?.description}</p>

              <hr />

              <div className="row mb-4">
                <div className="col-md-4 col-12 mb-3">
                  <label className="mb-2 d-block">Quantity</label>
                  <div className="input-group mb-3" style={{ width: "170px" }}>
                    <button
                      className="btn btn-outline-danger border border-secondary px-3"
                      type="button"
                      id="button-addon1"
                      data-mdb-ripple-color="dark"
                      disabled={qty === 0 ? true : false}
                      onClick={() => {
                        setQty(qty - 1);
                        decrement(id);
                      }}
                    >
                      <i className="bi bi-dash"></i>
                    </button>
                    <input
                      type="text"
                      className="form-control text-center border border-secondary"
                      placeholder="14"
                      aria-label="Example text with button addon"
                      aria-describedby="button-addon1"
                      value={qty}
                      readOnly
                    />
                    <button
                      className="btn btn-outline-success border border-secondary px-3"
                      type="button"
                      id="button-addon2"
                      data-mdb-ripple-color="dark"
                      onClick={() => {
                        setQty(qty + 1);
                        increment(id);
                      }}
                    >
                      <i className="bi bi-plus"></i>
                    </button>
                  </div>
                </div>

                <div className="input-group mb-3" style={{ width: "100%" }}>
                  {/* Size Chart Logo */}
                  <img
                    src={chart}
                    alt="Size Chart"
                    style={imageStyle}
                    onClick={toggleZoom}
                  />
                </div>

                <div className="size-container">
                  <TextField
                    id="standard-select-currency"
                    select
                    label="Select"
                    defaultValue="36"
                    variant="standard"
                    style={{
                      margin: "auto",
                      width: "150px",
                      fontSize: "25px",
                    }}
                    helperText="Please select your size"
                    onChange={(e) => {
                      handlesetSize(e.target.value);
                    }}
                  >
                    {sizes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div className="addon-container">
                  Do you want your name on the merch?
                  <div
                    className="check-box"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "10px",
                    }}
                  >
                    <div className="yes">
                      <Checkbox
                        {...label}
                        id="addon-check"
                        onChange={(e) => {
                          handleAddon(e.target.checked);
                        }}
                      />{" "}
                      Yes
                    </div>
                  </div>
                  <TextField
                    id="enabled-name"
                    label="Enter Name (Cost is 50₹)"
                    variant="standard"
                    onChange={(e) => {
                      handlesetAddon(e.target.value);
                    }}
                  />
                </div>
              </div>

              <button
                href="#!"
                className="btn btn-warning shadow-0"
                disabled={product?.stock === 0}
              >
                Add to cart
              </button>
              {qty > 0 && (
                <Link
                  to={"/cart"}
                  className="btn btn-outline-warning ms-4 icon-hover"
                >
                  <i className="bi bi-heart me-2 small"></i>
                  <span>Go to Cart</span>
                </Link>
              )}
              {/*<a
                                    href="#"
                                    className="btn btn-outline-warning ms-4 icon-hover"
                                >
                                    <i className="bi bi-heart me-2 small"></i>
                                    <span>Save</span>
                                </a> */}
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;

/*





*/
