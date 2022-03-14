import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Formik, Field } from 'formik';
import Modal from 'react-bootstrap/Modal';
import FormInput from './inputs/FormInput';

const ModalForm = (props) => {
    const {
        initialValues,
        handleFormSubmit,
        handleCancelClick,
        showModal,
        modalTitle,
        formFields,
        handleSelection
    } = props;

    return (
        <Modal show={showModal}
            onHide={handleCancelClick}
            centered
            backdrop="static"
            keyboard={false}
            contentClassName="p-4">
            <Modal.Header closeButton>
                <Modal.Title className="text-dark">{modalTitle}</Modal.Title>
            </Modal.Header>
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={{ ...initialValues }}
            >
                {({
                    handleSubmit,
                    handleChange,
                    values,
                    touched,
                    errors,
                    isSubmitting,
                }) => (
                    <Form onSubmit={handleSubmit}>
                        <Modal.Body>
                            <Form.Control.Feedback type="invalid" className="d-block">
                                {errors.form}
                            </Form.Control.Feedback>
                            {formFields.map(field =>
                                <Field key={field.name}
                                    name={field.name}>
                                    {({ form }) =>
                                        <Form.Group className="mb-4" key={field.name}>
                                            {<FormInput {...{ field, form, values, handleChange, touched, errors, handleSelection }} />}
                                            <Form.Control.Feedback type="invalid" className="d-block">
                                                {errors[field.name]}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    }
                                </Field>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCancelClick}>
                                Cancel
                            </Button>
                            <Button variant="primary" className="create-btn" type="submit" disabled={isSubmitting}>
                                Submit
                            </Button>
                        </Modal.Footer>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
}

export default ModalForm;