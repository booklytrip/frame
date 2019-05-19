/**
 * @flow
 */

import React from 'react';
import { compose, withProps, branch, renderNothing } from 'recompose';
import { FormattedMessage, FormattedDate } from 'react-intl';
import { format as formatDate, differenceInDays } from 'date-fns';
import styled from 'styled-components';

import { Popup, Label } from 'semantic-ui-react';

type ArrivalDaysProps = {
    departureTime: string,
    arrivalTime: string,
    days: number,
};

const DaysLabel = styled(Label)`
    float: right;
    cursor: help;
`;

const ArrivalDays = ({
    departureTime,
    arrivalTime,
    days,
}: ArrivalDaysProps) => (
    <Popup
        as="span"
        trigger={
            <DaysLabel size="mini" basic>
                {days > 0 ? '+' : '-'}
                {days}
            </DaysLabel>
        }
        position="top center"
        size="small"
        wide
        inverted
    >
        <Popup.Content>
            <FormattedMessage
                id="flights.flightslist.ArrivalDays.1"
                defaultMessage={`Arrival {days, plural,
                            =-1 {on previous day}
                            one {on the next day}
                            other {{days} days later}
                        }`}
                values={{ days }}
            />
            {' - '}
            <FormattedDate
                value={arrivalTime}
                month="long"
                day="numeric"
                weekday="long"
            />
        </Popup.Content>
    </Popup>
);

// Calculate number of days that the flight takes
const props = withProps(ownProps => ({
    days: differenceInDays(
        formatDate(ownProps.arrivalTime, 'YYYY-MM-DD'),
        formatDate(ownProps.departureTime, 'YYYY-MM-DD'),
    ),
}));

// Do not render component if departure and arrival happens in range of one day
const withNothing = branch(ownProps => ownProps.days === 0, renderNothing);

export default compose(props, withNothing)(ArrivalDays);
