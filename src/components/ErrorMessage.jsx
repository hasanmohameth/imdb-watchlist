import React from "react";
import "../index.css";

export default function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>In fetch we have error try again⛔️</span> {message}
    </p>
  );
}
