/**
 * @flow
 */

import React from 'react';
import { FormattedMessage, FormattedDate } from 'react-intl';
import styled from 'styled-components';
import { Header as BaseHeader } from 'semantic-ui-react';

import type { Flight } from '../../../../types';

type DetailsHeaderProps = {
    flight: Flight,
};

const Header = styled(BaseHeader)`
    font-weight: 400;
    color: ${({ theme }) => theme.booking.header} !important;
`;

const DetailsHeader = ({
    flight: {
        general: {
            wayType,
            departureDate,
            returnDate,
            price,
            passengers: { adults, children, infants },
        },
        forwardSector: { arrivalAirport: { country, city } },
    },
}: DetailsHeaderProps) =>
    <Header as="h2">
        <FormattedMessage
            id="booking.details.DetailsHeader.header"
            defaultMessage={`Flight booking to {city}, {country}`}
            values={{
                city: city.name,
                country: country.cca2,
            }}
        />
        <BaseHeader.Subheader>
            <FormattedDate
                value={departureDate}
                year="numeric"
                month="2-digit"
                day="2-digit"
            />
            {wayType === 'ROUND_TRIP' &&
                <span>
                    {' - '}
                    <FormattedDate
                        value={returnDate}
                        year="numeric"
                        month="2-digit"
                        day="2-digit"
                    />
                </span>}

            {', '}

            {adults > 0 &&
                <FormattedMessage
                    id="booking.details.DetailsHeader.subHeader.adults"
                    defaultMessage={`{adults} {adults, plural,
                        one {adult}
                        other {adults}
                    }`}
                    values={{ adults }}
                />}
            {children > 0 &&
                <FormattedMessage
                    id="booking.details.DetailsHeader.subHeader.children"
                    defaultMessage={`{children} {children, plural,
                        one {child}
                        other {children}
                    }`}
                    values={{ children }}
                />}
            {infants > 0 &&
                <FormattedMessage
                    id="booking.details.DetailsHeader.subHeader.infants"
                    defaultMessage={`{infants} {infants, plural,
                        one {infant}
                        other {infants}
                    }`}
                    values={{ infants }}
                />}
            {', '}

            <FormattedMessage
                id="booking.details.DetailsHeader.subHeader.price"
                defaultMessage={`flight price: € {amount}`}
                values={price}
            />
        </BaseHeader.Subheader>
    </Header>;

export default DetailsHeader;
