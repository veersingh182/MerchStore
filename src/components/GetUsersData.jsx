import React from "react";
import ExcelJS from "exceljs";
import TextField from "@mui/material/TextField";

function ExcelDownloadComponent() {
  const BACKEND = process.env.REACT_APP_BACKEND;
  const FRONTEND = process.env.REACT_APP_FRONTEND;
  const handleDownload = async (data) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");
    var sampleData = [
      [
        "Name",
        "Email",
        "Address",
        "Phone",
        "Id Proof",
        "Payment Proof",
        "Transaction Id",
        "Order Details",
      ],
    ];
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      var {
        Name,
        Email,
        Address,
        Pnumber,
        IDProof,
        PaymentProof,
        transactionId,
        OrderDetails,
      } = element;
      const user = [
        Name,
        Email,
        Address,
        Pnumber,
        FRONTEND + IDProof,
        FRONTEND + PaymentProof,
        transactionId,
        JSON.stringify(OrderDetails),
      ];
      sampleData.push(user);
    }
    sampleData.forEach((row) => {
      worksheet.addRow(row);
    });
    // worksheet.columns.forEach((column) => {
    //   column.width = 15;
    // });
    worksheet.columns.forEach((column) => {
      let maxLength = 0;
      column.eachCell({ includeEmpty: true }, (cell) => {
        const cellLength = cell.value ? cell.value.toString().length : 10; // Minimum width for empty cells
        if (cellLength > maxLength) {
          maxLength = cellLength;
        }
      });
      column.width = maxLength < 10 ? 10 : maxLength + 2; // Set a minimum width of 10
    });
    const excelBuffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "output.xlsx";
    a.click();
    URL.revokeObjectURL(url);
  };
  const contStyle = {
    height: "auto",
    width: "300px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    margin: "0 auto",
  };
  const handleDownloadButton = async () => {
    const password = document.getElementById("Passcode").value;
    if (!password) {
      window.alert("Enter passcode first!");
      return;
    } else {
      const data = {
        password: password,
      };
      const response = await fetch(BACKEND + "get-all-order-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (result.isSuccess) {
        document.getElementById("Passcode").value = "";
        handleDownload(result.data);
      } else {
        window.alert(result.msg);
      }
    }
  };
  return (
    <div style={contStyle}>
      <TextField id="Passcode" label="Passcode*" variant="standard" fullWidth />
      <button onClick={handleDownloadButton} className="btn btn-primary">
        Download Excel
      </button>
    </div>
  );
}

export default ExcelDownloadComponent;
