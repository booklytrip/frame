/**
 * Component represents set of links to printable tickets
 *
 * @flow
 */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { Icon } from 'semantic-ui-react';

import type { Booking } from '../../../../../types';

type TicketsLinksProps = {
    booking: Booking,
};

const Link = styled.a`
    color: #0085ca;
    border-bottom: 1px dashed #bfe0f2;
`;

const TicketsLinks = ({ booking }: TicketsLinksProps) =>
    <span>
        <Icon name="blue print" />
        <Link href={`/ticket/${booking.id}`} target="_blank">
            <FormattedMessage
                id="booking.service.tickets.TicketsLinks.print"
                defaultMessage="Print travel document"
            />
        </Link>
    </span>;

export default TicketsLinks;
