import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import { Formik, Field } from 'formik';
import Modal from 'react-bootstrap/Modal';
import { inputTypes } from '../../constants';

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

    const [inputType, setInputType] = useState('text');

    const getCustomStyles = (isValid) => {
        return {
            control: (styles, state) => ({
                ...styles,
                borderColor: isValid ? '#bbbcc6' : '#dc3545',
                '&:hover': {
                    borderColor: isValid ? '#bbbcc6' : '#dc3545'
                }
            })
        }
    }

    const getInputField = (field, form, values, handleChange, touched, errors) => {
        switch (field.inputType) {
            case inputTypes.TEXT:
                return <Form.Control
                    type="text"
                    name={field.name}
                    value={values[field.name] ?? ''}
                    placeholder={field.displayName}
                    onChange={handleChange}
                    isInvalid={touched[field.name] && !!errors[field.name]}
                />;
            case inputTypes.SELECT:
                return <Select
                    name={field.name}
                    options={field.options}
                    placeholder={field.displayName}
                    styles={getCustomStyles(!errors[field.name])}
                    defaultValue={field.initialValue}
                    closeMenuOnSelect={true}
                    isClearable={true}
                    noOptionsMessage={() => field.noOptionsMessage ?? 'No options'}
                    onChange={(e) => {
                        form.setFieldValue(field.name, e ? e.value : 0, false);
                        if (handleSelection !== undefined) {
                            handleSelection(e ? e.value : 0, field.name);
                        };
                    }} />;
            case inputTypes.DATE:
                return <Form.Control
                    type={inputType}
                    onFocus={() => setInputType('date')}
                    onBlur={() => setInputType('text')}
                    format="MM/dd/yyyy"
                    name={field.name}
                    value={values[field.name] ?? ''}
                    placeholder={field.displayName}
                    onChange={handleChange}
                    isInvalid={touched[field.name] && !!errors[field.name]}
                />;
            default:
                return null;
        }
    }

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
                                            {getInputField(field, form, values, handleChange, touched, errors)}
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