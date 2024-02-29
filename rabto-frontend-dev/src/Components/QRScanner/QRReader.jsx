import React, { useState } from "react";
import QrReader from "react-qr-reader";

const QrCodeReader = () => {
  const [result, setResult] = useState("");

  const handleScan = (data) => {
    // console.log("data",data);
    if (data) {
      setResult(data);
    }
  };

  const handleError = (err) => {
    // console.log(err);
  };

  return (
    <div>
      <QrReader
        onScan={handleScan}
        onError={handleError}
        style={{width: "100%" }}
      />
      
    </div>
  );
};

export default QrCodeReader;