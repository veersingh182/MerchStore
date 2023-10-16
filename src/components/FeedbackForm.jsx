import React from "react";
import TextField from "@mui/material/TextField";
export default function FeedbackForm() {
  const BACKEND = process.env.REACT_APP_BACKEND;
  const formStyle = {
    height: "auto",
    padding: "20px",
    width: "100%",
    minWidth: "350px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    maxWidth: "800px",
    margin: "0 auto",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    border: "10px",
    marginBottom: "30px",
    marginTop: "30px",
  };
  const contStyle = {
    height: "auto",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  };
  const handleFormSubmit = async () => {
    const name = document.getElementById("Name").value;
    const email = document.getElementById("Email").value;
    const content = document.getElementById("Content").value;
    if (!email || !content || !name) {
      window.alert("Please enter all details");
      return;
    } else {
      const data = {
        name: name,
        email: email,
        content: content,
      };
      const response = await fetch(BACKEND + "send-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      window.alert(result.msg);
      if (result.isSuccess) {
        document.getElementById("Name").value = "";
        document.getElementById("Email").value = "";
        document.getElementById("Content").value = "";
      }
    }
  };
  return (
    <div className="feedback-form" style={formStyle}>
      <div
        className="title"
        style={{
          fontSize: "20px",
          fontWeight: "400",
          letterSpacing: "1px",
          textTransform: "uppercase",
        }}
      >
        Feedback Form
      </div>
      <div className="form-container" style={contStyle}>
        {/* <div className="name"> */}
        <TextField id="Name" label="Name*" variant="standard" fullWidth />
        {/* </div> */}
        {/* <div className="email"> */}
        <TextField id="Email" label="Email*" variant="standard" fullWidth />
        {/* </div> */}
        {/* <div className="content"> */}
        <TextField
          id="Content"
          label="Feedback here..."
          multiline
          rows={4}
          defaultValue=""
          fullWidth
        />
        {/* </div> */}
        <div className="submit-btn">
          <div className="btn btn-primary" onClick={handleFormSubmit}>
            Submit
          </div>
        </div>
      </div>
    </div>
  );
}
