import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import IFrameBridge from '../../components/IFrameBridge';

import { Container } from 'semantic-ui-react';
import { SearchPage, FlightsPage, BookingPage, TicketPage } from '../../pages';

// Import semantic UI stylesheets
import 'semantic-ui-css/semantic.min.css';

const RootContainer = styled(Container)`
    &.container {
        height: 100% !important;
    }
`;

const App = ({ theme }) =>
    <BrowserRouter>
        <IFrameBridge>
            <ThemeProvider theme={theme}>
                <RootContainer fluid>
                    <Route path="/" component={SearchPage} exact />
                    <Route
                        path="/flights/:departureAirport/:arrivalAirport/:departureDate/:returnDate?/:adults/:children/:infants"
                        component={FlightsPage}
                    />
                    <Route path="/booking" component={BookingPage} />
                    <Route path="/ticket/:bookingId" component={TicketPage} />
                </RootContainer>
            </ThemeProvider>
        </IFrameBridge>
    </BrowserRouter>;

export default App;
