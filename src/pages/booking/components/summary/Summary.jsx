/**
 * @flow
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { leftSeats } from '../../../../lib/flight';

import { Header, Segment, Label } from 'semantic-ui-react';

import SummarySectors from './SummarySectors';
import SummaryPricing from './SummaryPricing';
import SummaryPassengers from './SummaryPassengers.jsx';
import { Price } from '../../../../components';

import type { Flight, Passenger } from '../../../../types';

type SummaryProps = {
    flight: Flight,
    passengers: ?Array<Passenger>,
    prices: ?Object,
};

const HeaderSegment = styled(Segment)`
    padding-top: 25px;
    padding-bottom: 15px;
    border-top-color: ${({ theme }) => theme.segment.borderTopColor} !important;
`;

const TotalPrice = styled(Price)`
    color: #f2711c !important;
`;

const Summary = ({ flight, passengers, prices }: SummaryProps) =>
    <div>
        <HeaderSegment attached="top">
            <Header>
                <FormattedMessage
                    id="booking.summary.Summary.header"
                    defaultMessage="Summary"
                />
            </Header>
        </HeaderSegment>

        <SummarySectors flight={flight} />

        {passengers && <SummaryPassengers passengers={passengers} />}

        <SummaryPricing prices={prices} />

        <Segment textAlign="right" attached="bottom" secondary>
            <p>
                <strong>
                    <FormattedMessage
                        id="booking.summary.Summary.total"
                        defaultMessage="Total"
                    />
                </strong>
            </p>
            <p>
                <TotalPrice fontSize="2em" price={prices.total} />
            </p>

            {leftSeats(flight) < 10 &&
                <Label color="orange">
                    <FormattedMessage
                        id="booking.summary.Summary.leftSeats"
                        defaultMessage={`Only {seats} {seats, plural,
                            one {seat}
                            other {seats}
                        } left for this price!`}
                        values={{ seats: leftSeats(flight) }}
                    />
                </Label>}
        </Segment>
    </div>;

export default Summary;
