import React from 'react';
import { IntlProvider } from 'react-intl';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import centered from '@kadira/react-storybook-decorator-centered';

import PayButton from '../PayButton.jsx';

storiesOf('booking/payment/PayButton', module)
    .addDecorator(story =>
        <IntlProvider locale="en">
            {story()}
        </IntlProvider>,
    )
    .addDecorator(centered)
    .add('default', () => <PayButton onClick={action('onClick')} />)
    .add('processing', () =>
        <PayButton onClick={action('onClick')} processing />,
    );
