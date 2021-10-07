import React from "react";
import { mutate } from "swr";
import TransferForm from "./TransferForm";
import { history } from "../../Router";
import ModalForm from "../ModalForm";

const parseSubmitValues = v => {
  const parsed = {
    ...v,
    amount: Number(v.amount),
    depositID: Number(v.depositID),
    rate: Number(v.rate)
  };
  return parsed;
};

const TransferModalForm = () => {
  const onSuccess = async (id, v, data) => {
    const add = ts => [...ts, { ...v, ...data }];
    const replace = ts => ts.map(t => (t.id !== id ? t : data));
    mutate("/transfer", id ? replace : add);
  };

  const onError = (e, formActions) => {
    formActions.setErrors({ hidden: e.message });
    formActions.setSubmitting(false);
  };

  const onDismiss = () => {
    history.push("/transfers");
  };

  return (
    <ModalForm
      parseSubmitValues={parseSubmitValues}
      resource="transfer"
      onSuccess={onSuccess}
      onError={onError}
      onDismiss={onDismiss}
      form={TransferForm}
    />
  );
};

export default TransferModalForm;
