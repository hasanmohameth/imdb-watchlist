import React from "react";
import "../index.css"; // فایل CSS جدا

export default function Loader() {
  return (
    <div className="loader-container">
      <div className="loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
