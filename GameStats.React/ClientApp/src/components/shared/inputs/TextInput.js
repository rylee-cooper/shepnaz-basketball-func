import React from 'react';
import { Form } from 'react-bootstrap';

const TextInput = (props) => {
    const { field, values, handleChange, touched, errors } = props;
    return <Form.Control
        type="text"
        name={field.name}
        value={values[field.name] ?? ''}
        placeholder={field.displayName}
        onChange={handleChange}
        isInvalid={touched[field.name] && !!errors[field.name]}
    />;
}

export default TextInput;