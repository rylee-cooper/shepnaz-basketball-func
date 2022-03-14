import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const DateInput = (props) => {
    const { field, values, handleChange, touched, errors } = props;

    const [inputType, setInputType] = useState('text');

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
}

export default DateInput;