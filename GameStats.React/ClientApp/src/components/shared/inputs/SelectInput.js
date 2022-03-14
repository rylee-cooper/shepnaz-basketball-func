import React from 'react';
import Select from 'react-select';

const SelectInput = (props) => {
    const { field, form, handleSelection, errors } = props;

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
}

export default SelectInput;