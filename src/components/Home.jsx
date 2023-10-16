import React from "react";
import ReactStars from "react-stars";
import { Link } from "react-router-dom";
import AlumniCategoryProduct from "./AlumniCategoryProduct";
import StudentsCategoryProduct from "./StudentCategoryProduct";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FeedbackForm from "./FeedbackForm";
import ExcelDownloadComponent from "./GetUsersData";
import { useState } from "react";
import logo from "../assets/logo.png";
import image from "../assets/16isolated_apparel.png";
// import image1 from "../assets/sdasdaswdaswdaswd.png";
import "./Home.css";

const Products = () => {
  const [page, setPage] = useState("alumni");
  const users = [
    {
      value: "alumni",
      label: "Alumni",
    },
    {
      value: "students",
      label: "Student",
    },
  ];
  return (
    <div className="mt-4">
      <div
        className="selector"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <TextField
          id="standard-select-currency"
          select
          label="Select"
          defaultValue="alumni"
          variant="standard"
          style={{
            margin: "auto",
            width: "300px",
            fontSize: "25px",
          }}
          onChange={(e) => {
            setPage(e.target.value);
          }}
        >
          {users.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>

      <div className="header overlay">
        <div className="header-content">
          <div className="content-container">
            <div className="info-section">
              <h2 className="upper main-title">
                <span>MERCHANDISE</span>
                <span> STORE</span>
              </h2>
              <h3 className="upper sub-title">GET THE NEW COMBO OFFER</h3>
              <p>
                Show Your College Pride: Grab Our Combo Offer on Trendy T-Shirts
                Unite,Celebrate and Remember Your Alma Mater!
              </p>
              <div class="btn-group">
                <a class="btn opacity" target="_blank" href="#">
                  Buy Now <i class="bi bi-bag"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="image-container">
          <img src={image} alt="Image Description" class="header-image" />
        </div>
      </div>

      <div className="middle-content">
        <div className="container1">
          <div className="explore-products">EXPLORE AWESOME PRODUCTS</div>
          <div className="recommended">RECOMMENDED FOR YOU</div>
        </div>
      </div>

      {page === "alumni" && (
        <>
          <h1>Tshirts</h1>
          <AlumniCategoryProduct category="Tshirts" />

          <div class="header campus-fashion-header">
            <div class="header-content2">
              <div class="container2">
                <div class="header-info">
                  <p>
                    Campus Fashion on a Budget: Elevate Your College Look with
                    our Offer on Stylish TShirts
                  </p>
                </div>
              </div>
            </div>
            {/* <img
              src={image1}
              class="header-photo"
            /> */}
          </div>

          <h1>Hoodies</h1>
          <AlumniCategoryProduct category="Hoodies" />
          <div class="header campus-fashion-header2">
            <div class="header-content2">
              <div class="container2">
                <div class="header2-info">
                  <p>"STUDENTS" Get 5% off on every order</p>
                </div>
              </div>
            </div>
            {/* <img src="path/to/your/photo.jpg" class="header-photo" /> */}
          </div>
          <h1>Caps</h1>
          <AlumniCategoryProduct category="Caps" />
          <h1>Combos</h1>
          <AlumniCategoryProduct category="Combos" />
          <div class="header campus-fashion-header3">
            <div class="header-content">
              <div class="container2">
                <div class="header3-info">
                  <p>
                    "EARLYBIRD" Get 10% off on every order, valid for first 50
                    orders
                  </p>
                </div>
              </div>
            </div>
            {/* <img src="path/to/your/photo.jpg" class="header-photo" /> */}
          </div>
        </>
      )}
      {page === "students" && (
        <>
          <h1>Tshirts</h1>
          <StudentsCategoryProduct category="Tshirts" />
          <div class="header campus-fashion-header">
            <div class="header-content2">
              <div class="container2">
                <div class="header-info">
                  <p>
                    Campus Fashion on a Budget: Elevate Your College Look with
                    our Offer on Stylish T-Shirts
                  </p>
                </div>
              </div>
            </div>
            {/* <img src="path/to/your/photo.jpg" class="header-photo" /> */}
          </div>

          {/* <h1>Hoodies</h1>
          <StudentsCategoryProduct category="Hoodies" /> */}
          <h1>Caps</h1>
          <StudentsCategoryProduct category="Caps" />
          <div class="header campus-fashion-header2">
            <div class="header-content2">
              <div class="container2">
                <div class="header2-info">
                  <p>"STUDENTS" Get 5% off on every order</p>
                </div>
              </div>
            </div>
            {/* <img src="path/to/your/photo.jpg" class="header-photo" /> */}
          </div>

          <h1>Combos</h1>
          <StudentsCategoryProduct category="Combos" />
          <div class="header campus-fashion-header3">
            <div class="header-content">
              <div class="container2">
                <div class="header3-info">
                  <p>
                    "EARLYBIRD" Get 10% off on every order, valid for first 50
                    orders
                  </p>
                </div>
              </div>
            </div>
            {/* <img src="path/to/your/photo.jpg" class="header-photo" /> */}
          </div>
        </>
      )}
      <FeedbackForm />
      <footer class="footer">
        <div class="left-column">
          <img
            class="footer-logo"
            src={logo}
            alt="logo"
            style={{
              height: "70px",
              width: "70px",
              marginInline: "10px",
              borderRadius: "10px",
            }}
          />
          <p>
            The Connect Dot Corp. is a dedicated company that focuses <br />
            on supporting students during their transition from college <br />
            to the corporate world.
          </p>
        </div>
        <div
          class="right-column"
          style={{
            maxWidth: "350px",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <div class="footer-column">
            <h6>Products</h6>
            <ul>
              <li>Trending</li>
              <li>My Account</li>
              <li>Vendors</li>
              <li>Brands</li>
              <li>Storefront</li>
            </ul>
          </div>
          <div class="footer-column">
            <h6>Legals</h6>
            <ul>
              <li>License</li>
              <li>Refund Policy</li>
              <li>About Us</li>
              <li>Contacts</li>
            </ul>
          </div>
          <div class="footer-column">
            <h6>Contacts</h6>
            <p>
              Feel free to get in touch with us via phone or send us a message
            </p>
            <p>+91 93542 73850</p>
            <a class="email-link" href="mailto:support@connectdot.com">
              support@connectdot.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Products;
