// const details = {
//   amount: 0.01351768,
//   tx: "259311389d2fa6f01898b80c06a458aed7576d18b9b80500af45fb4591187079",
//   created: "2020-05-21T08:21:50.29498",
//   rate: 14832.42,
//   address: "1BVGfLE9ChLpjJ1rhCRHGAmNoHkJT78jhd",
//   type: "Wages",
//   coin: "BTC",
//   depositID: 8200,
//   id: 9103,
//   userID: "72a83798-a40f-4d39-97d9-1839ea77f360"
// };

import React from "react";
import { Formik, Form } from "formik";
import Loader from "../../Loader";
import Input from "../form-inputs/Input";
import ErrorMessage from "../../ErrorMessage";
import validate from "./validate";

const TransferForm = ({
  initialValues: _inititalValues,
  onSubmit,
  submitText = "Submit"
}) => {
  // Define default values and override with any passed in from props

  const initialValues = {
    userID: "",
    amount: "0",
    depositID: "",
    tx: "",
    created: "",
    rate: "",
    address: "",
    type: "",
    coin: "",
    ..._inititalValues
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
      enableReinitialize
    >
      {({ isSubmitting, errors }) => (
        <Form>
          <Input label="User ID" name="userID" />
          <Input label="Amount" name="amount" />
          <Input label="Deposit ID" name="depositID" />
          <Input label="TX" name="tx" />
          <Input label="Created" name="created" />
          <Input label="Rate" name="rate" />
          <Input label="Address" name="address" />
          <Input label="Type" name="type" />
          <Input label="Coin" name="coin" />
          <ErrorMessage error={errors.hidden} />
          <button
            className="btn btn-primary btn-block relative d-flex justify-content-center"
            type="submit"
            disabled={isSubmitting}
          >
            <Loader
              loading={isSubmitting}
              noBackground
              noStretch
              light
              diameter="1.4rem"
            />
            <span className="mx-2">{submitText}</span>
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default TransferForm;
