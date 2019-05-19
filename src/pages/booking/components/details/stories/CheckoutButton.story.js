import React from 'react';
import { IntlProvider } from 'react-intl';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import centered from '@kadira/react-storybook-decorator-centered';

import CheckoutButton from '../CheckoutButton.jsx';

storiesOf('booking/details/CheckoutButton', module)
    .addDecorator(story =>
        <IntlProvider locale="en">
            {story()}
        </IntlProvider>,
    )
    .addDecorator(centered)
    .add('default', () => <CheckoutButton onClick={action('onClick')} />)
    .add('processing', () =>
        <CheckoutButton onClick={action('onClick')} processing />,
    );
