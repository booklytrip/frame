/**
 * @flow
 */

import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import { FormattedMessage } from 'react-intl';
import { Button as BaseButton, Icon as BaseIcon } from 'semantic-ui-react';

type SearchButtonProps = {
    loading: boolean,
    onClick: Function,
};

const Button = styled(BaseButton)`
    &.ui.button {
        background: ${({ theme }) => theme.search.searchButton.background};
        color: ${({ theme }) => theme.search.searchButton.color};
        padding-left: 50px !important;
        padding-right: 50px !important;

        &:hover {
            color: ${({ theme }) => theme.search.searchButton.color};
            background: ${({ theme }) =>
                darken(0.2, theme.search.searchButton.background)};
        }
    }
`;

const Icon = styled(BaseIcon)`
    &.icon {
        position: relative;
        top: 2px;
        font-size: 1.2em;
        margin-left: 10px;
        transform: rotate(45deg);
    }
`;

const SearchButton = ({ loading, onClick }: SearchButtonProps) =>
    <Button
        type="submit"
        size="massive"
        loading={loading}
        disabled={loading}
        onClick={onClick}
        icon
    >
        <FormattedMessage
            id="search.searchButton"
            defaultMessage="Search flights"
        />
        <Icon name="plane" />
    </Button>;

export default SearchButton;
