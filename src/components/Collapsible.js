import React from "react";
import "./Collapsible.scss";

const Collapsible = ({ isOpen, children }) => (
  <div className={`collapsible${isOpen ? " open" : ""}`}>{children}</div>
);

export default Collapsible;
