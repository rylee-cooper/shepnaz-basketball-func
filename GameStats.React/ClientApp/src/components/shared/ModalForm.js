import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import { Formik, Field } from 'formik';
import Modal from 'react-bootstrap/Modal';
import { inputTypes } from '../../constants';

class ModalForm extends Component {

    getCustomStyles = (isValid) => {
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

    render() {
        const {
            initialValues,
            handleFormSubmit,
            handleCancelClick,
            handleSelection,
            showModal,
            modalTitle,
            formFields
        } = this.props;

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
                                    !field.isHidden && <Field key={field.name}
                                        name={field.name}>
                                        {({ form }) =>
                                            <Form.Group className="mb-4" key={field.name}>
                                                {field.inputType === inputTypes.TEXT
                                                    ? <Form.Control
                                                        type="text"
                                                        name={field.name}
                                                        value={values[field.name]}
                                                        placeholder={field.displayName}
                                                        onChange={handleChange}
                                                        isInvalid={touched[field.name] && !!errors[field.name]}
                                                    />
                                                    : field.inputType === inputTypes.SELECT
                                                        ? <Select
                                                            name={field.name}
                                                            options={field.options}
                                                            placeholder={field.displayName}
                                                            styles={this.getCustomStyles(!errors[field.name])}
                                                            defaultValue={field.initialValue}
                                                            closeMenuOnSelect={true}
                                                            isClearable={true}
                                                            onChange={(e) => {
                                                                form.setFieldValue(field.name, e ? e.value : 0, false);
                                                                if (handleSelection !== undefined) {
                                                                    handleSelection(e.value, field.name)
                                                                };
                                                            }} />
                                                        : null}
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
}

export default ModalForm;