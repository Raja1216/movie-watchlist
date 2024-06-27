import React from "react";
import "./Button.scss";

const Button = ({ bg, title, icon, method, methodValue = null }) => {
  switch (bg) {
    case "gulab":
      bg = "var(--color-gulab)";
      break;
    case "begni":
      bg = "var(--color-begni)";
      break;
    case "info":
      bg = "var(--color-info)";
      break;
    case "kamla":
      bg = "var(--color-kamla)";
      break;
    default:
      break;
  }
  return (
    <button style={{ background: bg }} className="main_btn" onClick={() => method(methodValue)}>
      <span>{title}</span> <i className={icon}></i>
    </button>
  );
};

export default Button;
