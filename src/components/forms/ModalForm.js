import React from "react";
import useSWR from "swr";
import { useParams, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import gpib from "../../apis/gpib";
import Modal from "../Modal";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";
/**
 * Designed to reuse forms for adding or editing a resource.
 * If the component is provided an 'id' param through react-router, assumes the form is to edit the resource with that id.
 * Otherwise, the form assumes it is adding a new resource.
 * See props below for details on required and optional props.
 */
const ModalForm = ({
  // Required props
  resource, // name of resource. E.g. "user" or "transfer"
  onDismiss, // (location) => void Used to close modal
  form: Form, // Form Component
  // Optional props
  parseSubmitValues, // parse form values before submitting
  parseInitialValues, // parse values fetched from server before injecting into form
  editMethod = "put", // Can be any http method.
  addMethod = "post",
  getUrl, // (id) => url.  Defaults to "/$RESOURCE/$ID" for edit and "/$RESOURCE" for add
  getFetchUrl, // (id) => url. Defaults to the return value of getUrl
  getHeading, // (id, data) => heading text. Defaults to "Edit $RESOURCE: $ID" or "Add"
  getSubmitText, // (id) => text for submit button. Defaults to "Save" or "Add $RESOURCE"
  onSuccess, // (id, formValues, responseBody, formActions) => void. Runs after successfully submitting form
  onError, // (error, formActions) => void. Runs if error caught from form submission
  modalProps = {}, // Optional. Props applied to Modal component
  ...props // Optional. Props applied to Form Component
}) => {
  const id = useParams().id;
  const location = useLocation();
  const isEditForm = !!id;
  const url = getUrl ? getUrl(id) : id ? `/${resource}/${id}` : `/${resource}`;
  const fetchUrl = getFetchUrl ? getFetchUrl(id) : url;
  const { data, error, isValidating } = useSWR(id && fetchUrl, {
    revalidateOnFocus: false
  });

  const initialValues =
    parseInitialValues && data ? parseInitialValues(data) : data;

  const isLoading = id && isValidating;
  const heading = getHeading
    ? getHeading(id, data)
    : isEditForm
    ? `Edit ${resource}: ${id}`
    : `Add ${resource}`;

  const submitText = getSubmitText
    ? getSubmitText(id)
    : isEditForm
    ? "Save"
    : `Add ${resource}`;

  const method = isEditForm ? editMethod : addMethod;

  const onSubmit = async (v, formActions, modalActions) => {
    try {
      const values = parseSubmitValues ? parseSubmitValues(v, id) : v;
      const { data } = await gpib.secure[method](url, values);
      await onSuccess(id, values, data, formActions);
      modalActions.onDismiss();
    } catch (e) {
      console.log(e);
      await onError(e, formActions);
    }
  };

  const wrapOnDismiss = () => onDismiss(location);

  return (
    <Modal isOpen onDismiss={wrapOnDismiss} heading={heading} {...modalProps}>
      {({ onDismiss, wrapCallback }) => (
        <>
          <Loader loading={isLoading} diameter="2rem" />
          <ErrorMessage error={error} />
          {!error ? (
            <Form
              onDismiss={wrapOnDismiss}
              onSubmit={wrapCallback(onSubmit)}
              initialValues={initialValues}
              submitText={submitText}
              isEditForm={isEditForm}
              {...props}
            />
          ) : (
            <Button
              block
              variant="secondary"
              children="Cancel"
              onClick={onDismiss}
            />
          )}
        </>
      )}
    </Modal>
  );
};

export default ModalForm;
