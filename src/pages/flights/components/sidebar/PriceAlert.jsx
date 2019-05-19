import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { Button as BaseButton, Icon } from 'semantic-ui-react';

const Button = styled(BaseButton)`
    text-transform: uppercase !important;
`;

const PriceAlert = () => (
    <Button size="large" color="yellow" fluid>
        <Icon name="bell" />
        <FormattedMessage
            id="flights.flightslist.sidebar.PriceAlert"
            defaultMessage="Price alert"
        />
    </Button>
);

export default PriceAlert;
