import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-stars";

import Items from "./Alumni";

export default function CategoryProduct({ category }) {
  const tShirts = Items[category];

  const productStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    height: "fit-content",
    width: "auto",
    padding: "20px",
    gap: "20px",
    flexWrap: "wrap",
    maxWidth: "1050px",
    margin: "0 auto",
  };
  return (
    <div>
      <div className="row-def">
        {category !== "Combos" && (
          <div className="product-cont" style={productStyle}>
            {tShirts?.map((product, i) => {
              return (
                <ProductCard
                  id={product.id}
                  key={product.id}
                  imgSrc={product.images[0]}
                  title={product.name}
                  // rating={product.ratings}
                  // noOfReview={product.numOfReviews}
                  price={product.price}
                />
              );
            })}
          </div>
        )}
        {category === "Combos" && (
          <div className="product-cont" style={productStyle}>
            {tShirts?.map((product, i) => {
              return (
                <ProductCardCombo
                  id={product.id}
                  key={product.id}
                  imgSrc={product.images[0]}
                  imgSrc2={product.images[1]}
                  title={product.name}
                  // rating={product.ratings}
                  // noOfReview={product.numOfReviews}
                  price={product.price}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

const ProductCard = ({ id, imgSrc, title, rating, noOfReview, price }) => {
  return (
    <div
      className="card my-3 mx-auto"
      style={{ width: "fit-content", padding: "20px" }}
    >
      <img src={imgSrc} className="card-img-top" alt="..." />
      <div className="card-body">
        <h6 className="card-title">
          <Link className="link-dark " to={`/product/${id}`}>
            {title}
          </Link>
        </h6>
        {/* <div className="d-flex align-items-center">
          <ReactStars
            count={5}
            value={Number(rating)}
            size={20}
            color2={"#ffd700"}
            edit={false}
            half={true}
          />
          <span className="ms-1 text-muted">({noOfReview} Reviews)</span>
        </div> */}
        <p className="card-text">₹{price}</p>

        <Link to={`/product/${id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  );
};

const ProductCardCombo = ({
  id,
  imgSrc,
  imgSrc2,
  title,
  rating,
  noOfReview,
  price,
}) => {
  return (
    <div
      className="card my-3 mx-auto"
      style={{ width: "fit-content", padding: "20px" }}
    >
      <div
        className="img-container"
        style={{ position: "relative", height: "200px", width: "200px" }}
      >
        <img
          src={imgSrc}
          className="card-img-top Combo"
          alt="..."
          style={{
            height: "100px",
            width: "100px ",
            backgroundSize: "100px 100px ",
            borderRadius: "100%",
            position: "absolute",
            top: "0",
            left: "0",
          }}
        />
        <img
          src={imgSrc2}
          className="card-img-bottom Combo"
          alt="..."
          style={{
            height: "100px",
            width: "100px ",
            backgroundSize: "100px 100px ",
            borderRadius: "100%",
            position: "absolute",
            bottom: "0",
            right: "0",
          }}
        />
      </div>
      <div className="card-body">
        <h6 className="card-title">
          <Link className="link-dark " to={`/product/${id}`}>
            {title}
          </Link>
        </h6>
        {/* <div className="d-flex align-items-center">
          <ReactStars
            count={5}
            value={Number(rating)}
            size={20}
            color2={"#ffd700"}
            edit={false}
            half={true}
          />
          <span className="ms-1 text-muted">({noOfReview} Reviews)</span>
        </div> */}
        <p className="card-text">₹{price}</p>

        <Link to={`/product/${id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  );
};
