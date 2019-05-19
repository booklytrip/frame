import React from 'react';
import { IntlProvider } from 'react-intl';
import { storiesOf } from '@storybook/react';
import centered from '@kadira/react-storybook-decorator-centered';

import { Container } from 'semantic-ui-react';
import BookingSteps from '../BookingSteps.jsx';

storiesOf('booking/BookingSteps', module)
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
    .add('with first active', () => <BookingSteps active={1} />)
    .add('with second active', () => <BookingSteps active={2} />)
    .add('with third active', () => <BookingSteps active={3} />);
