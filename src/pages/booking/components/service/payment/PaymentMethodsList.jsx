/**
 * @flow
 */

import React from 'react';
import styled from 'styled-components';
import { map } from 'lodash';

import { Icon, Image, Card, Flag as BaseFlag } from 'semantic-ui-react';

import thumbor from '../../../../../lib/thumbor';
import config from '../../../../../config';

import type { PaymentMethod } from '../../../../../types';

type PaymentMethodsListProps = {
    paymentMethods: Array<PaymentMethod>,
    onClick: Function,
    active: ?PaymentMethod,
};

type PaymentMethodsListItemProps = {
    id: string,
    name: string,
    logo: string,
    country: string,
    active?: boolean,
    onClick: Function,
};

const buildImageUrl = (path: string) =>
    thumbor()
        .setServerUrl(config.thumborServer)
        .fitIn(125, 60)
        .filter('fill(white)')
        .setImagePath(path)
        .buildUrl();

const ItemsList = styled(Card.Group)`
    margin: -.875em -.5em;
`;

const Item = styled(Card)`
    padding: 10px !important;
    border-radius: 0 !important;

    ${props =>
        !props.active &&
        `
        &:hover {
            cursor: pointer;
            > .check.icon {
                display: block !important;
                color: #CCC;
            }
        }
    `}
`;

const ItemLogo = styled(Image)`
    background: transparent !important;
`;

const CheckIcon = styled(Icon)`
    position: absolute;
    right: -5px;
    top: 1px;
    color: ${({ theme }) => theme.booking.service.payment.checkinIcon};
    ${props => !props.visible && 'display: none !important'}
`;

const Flag = styled(BaseFlag)`
    position: absolute;
    top: 1px;
    left: 1px;
    z-index: 1;
`;

/**
 * A single item of payment method
 *
 * @param {String}   id      - An unique identifier of the payment method
 * @param {String}   name    - A name of payment method
 * @param {String}   logo    - A link to payment method image (logo)
 * @param {Bool}     active  - Set as true if item is selected
 * @param {Function} onClick - A function to tigger on payment method click
 */
const PaymentMethodsListItem = ({
    id,
    name,
    logo,
    country,
    onClick,
    active,
}: PaymentMethodsListItemProps) =>
    <Item
        as="div"
        onClick={e => {
            e.preventDefault();
            onClick(id);
        }}
        active={active}
    >
        <ItemLogo src={buildImageUrl(logo)} alt={name} />
        {country !== 'global' && <Flag name={country} />}
        <CheckIcon name="large check circle outline" visible={active} />
    </Item>;

/**
 * Represents a list of payment methods
 *
 * @param {Array}    paymentMethods - A list of payment methods
 * @param {String}   active         - A name of active item
 * @param {Function} onClick        - A function to tigger on payment method click
 */
const PaymentMethodsList = ({
    paymentMethods,
    onClick,
    active,
}: PaymentMethodsListProps) =>
    <ItemsList itemsPerRow={4}>
        {map(paymentMethods, ({ id, name, logo, country }) =>
            <PaymentMethodsListItem
                key={id}
                id={id}
                name={name}
                logo={logo}
                country={country}
                active={id === active}
                onClick={onClick}
            />,
        )}
    </ItemsList>;

export { PaymentMethodsList, PaymentMethodsListItem };
