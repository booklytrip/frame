/**
 * The component represents a dropdown menu that allow user
 * to select language of the interface.
 *
 * @flow
 */

import React from 'react';
import styled from 'styled-components';
import { compose, branch, renderNothing } from 'recompose';
import { Dropdown as BaseDropdown, Icon } from 'semantic-ui-react';

import type { Locale } from '../../../types';

type LanguageProps = {
    locale: Locale,
    options: Array<Object>,
    onChange: Function,
};

const Dropdown = styled(BaseDropdown)`
    color: ${({ theme }) => theme.layout.language.color} !important;
`;

const Language = ({ locale, options, onChange }: LanguageProps) => {
    return (
        <Dropdown
            trigger={
                <span>
                    <Icon name="world" />
                    {locale.language}
                </span>
            }
            value={locale.locale}
            options={options}
            onChange={(e, { value }) => {
                onChange(value);
            }}
        />
    );
};

// Do not render the component if there is less then 2 options
export default compose(
    branch(props => props.options.length < 2, renderNothing),
)(Language);
