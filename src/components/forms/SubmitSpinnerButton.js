import React from "react";
import Loader from "../Loader";
import { Button } from "react-bootstrap";

const SubmitButtonSpinner = ({
  submitText,
  isSubmitting = false,
  children,
  className,
  ...props
}) => {
  let classes = "relative d-flex justify-content-center";
  if (className) classes += ` ${className}`;
  return (
    <Button
      className={classes}
      variant="primary"
      block
      type="submit"
      disabled={isSubmitting}
      {...props}
    >
      <Loader
        loading={isSubmitting}
        noBackground
        noStretch
        light
        diameter="1.4rem"
      />
      <span className="mx-2">{submitText || children}</span>
    </Button>
  );
};

export default SubmitButtonSpinner;
