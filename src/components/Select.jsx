/**
 * Basic select from semantic-ui-react package but tuned to work
 * with redux-form
 * 
 *  @flow
 */

import React from 'react';
import { Select as BaseSelect } from 'semantic-ui-react';

type SelectProps = {
    onChange: Function,
    // If set as true will return the value key from provided object
    simpleValue: boolean,
};

const Select = ({ onChange, simpleValue, ...props }: SelectProps) => (
    <BaseSelect
        {...props}
        onChange={(e, data) => onChange(simpleValue ? data.value : data)}
    />
);

export default Select;
