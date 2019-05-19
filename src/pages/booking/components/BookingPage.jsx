import React from 'react';
import { Route } from 'react-router';

import styled from 'styled-components';
import { Container } from 'semantic-ui-react';

import { Navigation } from '../../../layouts';
import BookingDetails from '../containers/details/Details';
import BookingService from '../containers/service/Service';

const RootContainer = styled(Container)`
    padding-left: 1em;
    padding-right: 1em;
    margin-bottom: 25px;
`;

const BookingPage = () =>
    <RootContainer fluid>
        <Navigation />
        <Route
            path="/booking/details/:cachedID/:priceKey"
            component={BookingDetails}
        />
        <Route path="/booking/service/:bookingId" component={BookingService} />
    </RootContainer>;

export default BookingPage;
