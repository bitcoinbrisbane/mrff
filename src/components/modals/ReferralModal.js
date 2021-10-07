import React from "react";
import Modal from "../Modal";
import gpib from "../../apis/gpib";
import ReferralForm from "../forms/ReferralForm/ReferralForm";
import { useParams } from "react-router-dom";
import { mutate } from "swr";

const parseSubmitValues = v => ({
  id: v.id,
  userID: v.userID,
  coin: v.coin,
  created: v.created,
  expires: v.expires,
  fixedAmount: Number(v.fixedAmount),
  percentageAmount: Number(v.percentageAmount),
  enabled: JSON.parse(v.enabled),
  friendUserID: v.friendUserID
});
const ReferralModal = ({ isOpen, onDismiss, initialValues }) => {
  const { id } = useParams();

  const editReferral = async (values, actions, modalActions) => {
    try {
      await gpib.secure.put(
        `/Referral/${values.id}`,
        parseSubmitValues(values)
      );
      mutate(id && `/user/${id}/referral`);
      onDismiss();
    } catch (error) {
      actions.setErrors({ hidden: error });
      actions.setSubmitting(false);
    }
  };
  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss} heading="Referral" small>
      <ReferralForm initialValues={initialValues} onSubmit={editReferral} />
    </Modal>
  );
};

export default ReferralModal;
