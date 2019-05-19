import React from 'react';
import { IntlProvider } from 'react-intl';
import { storiesOf } from '@storybook/react';
import centered from '@kadira/react-storybook-decorator-centered';

import { ReduxProvider } from '../../../../../../providers';

import CheckinButton from '../CheckinButton.jsx';

import { passenger } from './fixtures';

storiesOf('booking/tickets/CheckinButton', module)
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
    .addDecorator(centered)
    .add('default', () => <CheckinButton passenger={passenger} />);
