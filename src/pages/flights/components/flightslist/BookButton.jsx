/**
 * @flow
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { darken } from 'polished';

import { Button as BaseButton } from 'semantic-ui-react';

const Button = styled(BaseButton)`
    margin-top: 1em !important;
    margin-right: 0px !important;
    width: 100%;
    text-transform: uppercase !important;
    background: ${({ theme }) =>
        theme.flights.bookButton.background} !important;
    color: ${({ theme }) => theme.flights.bookButton.color} !important;

    &:hover {
        background: ${({ theme }) =>
            darken(0.2, theme.flights.bookButton.background)} !important;
    }
`;

const BookButton = ({ onClick }: { onClick: Function }) =>
    <Button
        onClick={onClick}
        icon="add to cart"
        labelPosition="left"
        content={
            <FormattedMessage
                id="flights.flightslist.BookButton"
                defaultMessage="Book"
            />
        }
    />;

export default BookButton;
