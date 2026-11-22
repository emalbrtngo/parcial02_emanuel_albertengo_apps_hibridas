import React from "react";

export default function ErrorWithIcon({ message }) {
  return (
    <div
      className="alert alert-danger d-inline-flex align-items-center gap-2 py-2 px-3 small border-0 shadow-sm"
      role="alert"
    >
      <i className="bi bi-exclamation-triangle-fill"></i>
      <span>{message}</span>
    </div>
  );
}
