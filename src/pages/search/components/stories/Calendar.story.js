import React from 'react';
import { IntlProvider } from 'react-intl';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import centered from '@kadira/react-storybook-decorator-centered';

import Calendar from '../Calendar';

storiesOf('search/Calendar', module)
    .addDecorator(centered)
    .addDecorator(story =>
        <IntlProvider locale="en">
            {story()}
        </IntlProvider>,
    )
    .add('default', () => {
        return <Calendar placeholder="Select" />;
    })
    .add('clearable', () => {
        return (
            <Calendar
                placeholder="Select"
                onClear={action('onClear')}
                onChange={action('onChange')}
                value="2017-04-11"
                clearable
            />
        );
    });
