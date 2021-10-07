import React from "react";
import { v4 as uuid } from "uuid";
import "./FileUpload.scss";

const FileUpload = ({ onChange, className, children, disabled, ...props }) => {
  const id = uuid();
  let classes = "file-upload btn";
  // const onChange = e => setFile(e.target.files[0])
  if (className) classes += ` ${className}`;
  if (disabled) classes += ` disabled`;
  return (
    <div className={classes}>
      <label htmlFor={id} className={className} children={children} />
      <input type="file" id={id} onChange={onChange} />
    </div>
  );
};

export default FileUpload;
