import React from 'react';
import { inputTypes } from '../../../constants';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import DateInput from './DateInput';

const FormInput = (props) => {
    const { field, form, values, handleChange, touched, handleSelection, errors } = props;

    switch (field.inputType) {
        case inputTypes.TEXT:
            return <TextInput {...{ field, values, handleChange, touched, errors }} />;
        case inputTypes.SELECT:
            return <SelectInput {...{ field, form, handleSelection, errors }} />;
        case inputTypes.DATE:
            return <DateInput{...{ field, values, handleChange, touched, errors }} />;
        default:
            return null;
    }
}

export default FormInput;