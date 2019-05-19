import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@kadira/react-storybook-decorator-centered';
import { IntlProvider } from 'react-intl';
import { Container } from 'semantic-ui-react';

import TicketPage from '../TicketPage.jsx';

import { booking } from './fixtures';

storiesOf('ticket/TicketPage', module)
    .addDecorator(story =>
        <IntlProvider locale="en">
            {story()}
        </IntlProvider>,
    )
    .addDecorator(story =>
        <Container>
            {story()}
        </Container>,
    )
    .addDecorator(centered)
    .add('default', () => <TicketPage booking={booking} />);
