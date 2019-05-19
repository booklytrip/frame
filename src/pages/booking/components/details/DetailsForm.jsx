/**
 * @flow
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { range } from 'lodash';

import { Header as BaseHeader, Segment, Grid, Form } from 'semantic-ui-react';

import PassengerInformation from './PassengerInformation.jsx';
import ContactInformation from './ContactInformation.jsx';
// import AdditionalServices from './AdditionalServices.jsx';
import CheckoutButton from '../../containers/details/CheckoutButton.js';

import type { Flight, PassengerType } from '../../../../types';

type RenderPassengerInformationProps = {
    flight: Flight,
    count: Object,
    type: PassengerType,
};

type DetailsFormProps = {
    flight: Flight,
    handleSubmit: Function,
};

const Header = styled(BaseHeader)`
    font-weight: 400;
    color: ${({ theme }) => theme.booking.header} !important;
`;

/**
 * Render list of forms for specified passenger type
 *
 * @param {Ojbect} flight - Current flight object
 * @param {Number} count  - Number of forms
 * @param {String} type   - The type of passenger
 */
const RenderPassengerInformation = ({
    flight,
    count: originalCount,
    type,
}: RenderPassengerInformationProps) => {
    const count = parseInt(originalCount, 10);
    return (
        <div>
            {count > 0 &&
                range(1, count + 1).map(index =>
                    <Segment vertical basic key={index}>
                        <PassengerInformation
                            flight={flight}
                            type={type}
                            index={index}
                        />
                    </Segment>,
                )}
        </div>
    );
};

RenderPassengerInformation.defaultProps = {
    count: 0,
};

const DetailsForm = ({ flight, handleSubmit }: DetailsFormProps) =>
    <Form onSubmit={handleSubmit}>
        <Grid columns={1}>
            <Grid.Column>
                <Header as="h2">
                    <FormattedMessage
                        id="booking.details.DetailsForm.header"
                        defaultMessage="Passenger information"
                    />

                    <BaseHeader.Subheader>
                        <FormattedMessage
                            id="booking.details.DetailsForm.subHeader"
                            defaultMessage="Please enter passenger names in Latin characters, as it is stated in your ID card or passport"
                        />
                    </BaseHeader.Subheader>
                </Header>

                <RenderPassengerInformation
                    flight={flight}
                    count={flight.general.passengers.adults}
                    type="ADULT"
                />

                <RenderPassengerInformation
                    flight={flight}
                    count={flight.general.passengers.children}
                    type="CHILD"
                />

                <RenderPassengerInformation
                    flight={flight}
                    count={flight.general.passengers.infants}
                    type="INFANT"
                />
            </Grid.Column>

            <Grid.Column>
                <ContactInformation />
            </Grid.Column>

            {/* <div className="column">
                <Header type="h2" color="blue" style={ styles.header }>
                    Additional services
                    <SubHeader>
                        You will be able to order additional services after a flight order as well
                    </SubHeader>
                </Header>
            </div>

            <div className="column">
                <AdditionalServices />
            </div> */}

            <Grid.Column textAlign="right">
                <CheckoutButton flight={flight} />
            </Grid.Column>
        </Grid>
    </Form>;

export default DetailsForm;
