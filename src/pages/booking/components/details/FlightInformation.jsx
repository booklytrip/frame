import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
// import { map, every, chain, has } from 'lodash';

import {
    // Icon,
    Segment,
    // List,
    Header,
} from 'semantic-ui-react';

import BaseFlightDetails from '../../../flights/components/flightslist/FlightDetails.jsx';

import type {
    Flight,
    // Bag
} from '../../../../types';

const HeaderSegment = styled(Segment)`
    padding-top: 25px;
    padding-bottom: 15px;
    border-top-color: ${({ theme }) => theme.segment.borderTopColor} !important;
`;

// const Subheader = styled(Header)`
//     font-weight: 400;
// `;

// const InfoIcon = styled(Icon)`
//     display: inline-block;
// `;

// const FreeItem = styled(List.Item)`
//     color: #7fba00;
// `;

const FlightDetails = styled(BaseFlightDetails)`
    padding-left: 1em !important;
    padding-right: 1em !important;
    padding-bottom: 1em !important;

    & .flight-segments-list:first-child .header {
        margin-top: -8px !important;
    }

    & .flight-segments-list .header {
        border-radius: 0px !important;
        margin: -1em !important;
        border-left: 0px !important;
        border-right: 0px !important;
    }

    & .flight-details .ui.divider {
        border: 0px !important;
    }
`;

// /**
//  * Information about flight hand baggage
//  *
//  * @param {Object} baggage - List of hand bags
//  */
// const HandBaggage = ({ baggage }: { baggage: Array<Bag> }) =>
//     <div>
//         {map(baggage, (bag, idx) =>
//             <FreeItem key={idx}>
//                 <InfoIcon name="travel" />
//                 <FormattedMessage
//                     id="booking.details.FlightInformation.HandBaggage.label"
//                     defaultMessage="Hand baggage:"
//                 />{' '}
//                 {bag.price.amount === 0
//                     ? <FormattedMessage
//                           id="booking.details.HandBaggage.included"
//                           defaultMessage="INCLUDED"
//                       />
//                     : <FormattedMessage
//                           id="booking.details.HandBaggage.chargeable"
//                           defaultMessage="CHARGEABLE"
//                       />}
//                 {', '}
//                 <FormattedMessage
//                     id="booking.details.HandBaggage.limitations"
//                     defaultMessage={`{weight}kg {dimension}cm per person`}
//                     values={{
//                         weight: bag.weight,
//                         dimension: bag.dimension,
//                     }}
//                 />
//             </FreeItem>,
//         )}
//     </div>;

// const CheckedBaggage = ({ baggage }: { baggage: Array<Bag> }) =>
//     <List.Item>
//         <InfoIcon name="suitcase" />
//         Checked baggage:{' '}
//         {every(baggage, { 'price.amount': 0 })
//             ? <span>INCLUDED</span>
//             : <span>CHARGEABLE</span>}
//         {', '}
//         {chain(baggage).map(bag => bag.weight).join('/').value()}kg
//     </List.Item>;

const FlightInformation = ({ flight }: { flight: Flight }) => (
    <div className="flight-information">
        <HeaderSegment attached="top">
            <Header>
                <FormattedMessage
                    id="booking.details.FlightInformation.header"
                    defaultMessage="Detailed flight information"
                />
            </Header>
        </HeaderSegment>

        <FlightDetails className="ui bottom attached segment" flight={flight} />

        {/* <Segment attached="bottom" secondary>
            <Subheader>
                <FormattedMessage
                    id="booking.details.FlightInformation.subHeader"
                    defaultMessage="Additional flight information"
                />
            </Subheader>
            <List>
                {has(details, 'forward.baggage.cabin') &&
                    <HandBaggage baggage={details.forward.baggage.cabin} />}

                {has(details, 'forward.baggage.checked') &&
                    <CheckedBaggage
                        baggage={details.forward.baggage.checked}
                    />}

                <FreeItem>
                    <Icon name="ticket" />
                    <List.Content>
                        <FormattedMessage
                            id="booking.details.FlightInformation.checkin"
                            defaultMessage="Check-in for flights both ways we will do for you, for FREE"
                        />
                    </List.Content>
                </FreeItem>
                 <div className="item">
                    <Icon name="checkmark box" />
                    <div className="content">
                        <FormattedMessage
                            id="booking.details.FlightInformation.ticketCharge"
                            defaultMessage="Ticket change: 140 EUR*"
                        />
                    </div>
                </div> 
            </List>
             <p>
                <FormattedMessage
                    id="booking.details.FlightInformation.note"
                    defaultMessage={ '* - Exchange fee applies for one person per flight. If the'
                    + ' new ticket is more expensive than the original ticket, then'
                    + ' you will have to pay the price difference between the two'
                    + ' tickets.' }
                />
            </p> 
        </Segment> */}
    </div>
);

export default FlightInformation;
