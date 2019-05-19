import React from 'react';
import { IntlProvider } from 'react-intl';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import centered from '@kadira/react-storybook-decorator-centered';

import { ReduxProvider } from '../../../../../../providers';
import { Container } from 'semantic-ui-react';
import PaymentMethod from '../PaymentMethod.jsx';

import { paymentMethods } from './fixtures';

storiesOf('booking/payment/PaymentMethod', module)
    .addDecorator(story =>
        <IntlProvider locale="en">
            {story()}
        </IntlProvider>,
    )
    .addDecorator(story =>
        <ReduxProvider>
            {story()}
        </ReduxProvider>,
    )
    .addDecorator(story =>
        <Container>
            {story()}
        </Container>,
    )
    .addDecorator(centered)
    .add('default', () =>
        <PaymentMethod
            paymentMethods={paymentMethods}
            setPaymentMethod={action('setPaymentMethod')}
        />,
    )
    .add('with selected item', () =>
        <PaymentMethod
            paymentMethods={paymentMethods}
            activePaymentMethod="lv_lpb"
            setPaymentMethod={action('setPaymentMethod')}
        />,
    )
    .add('without payment methods', () =>
        <PaymentMethod
            paymentMethods={[]}
            setPaymentMethod={action('setPaymentMethod')}
        />,
    );
