import { isISO8601 } from "validator";

const validate = values => {
  const errors = {};
  const requiredMsg = "This field is required";
  if (!values.userID) errors.userID = requiredMsg;
  if (!values.amount && String(values.amount) !== "0")
    errors.amount = requiredMsg;
  if (!values.depositID && String(values.depositID) !== "0")
    errors.depositID = requiredMsg;
  if (!isISO8601(values.created))
    errors.created = "Invalid Format (use ISO 8601 format)";
  if (!values.created) errors.created = requiredMsg;
  if (!values.rate && String(values.rate) !== "0") errors.rate = requiredMsg;
  if (!values.address) errors.address = requiredMsg;
  if (!values.type) errors.type = requiredMsg;
  if (!values.coin) errors.coin = requiredMsg;
  return errors;
};

export default validate;
