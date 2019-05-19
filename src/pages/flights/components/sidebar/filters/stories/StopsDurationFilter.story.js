import React from 'react';
import { IntlProvider } from 'react-intl';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import centered from '@kadira/react-storybook-decorator-centered';

import StopsDurationFilter from '../StopsDurationFilter.jsx';

storiesOf('flights/sidebar/filters/StopsDurationFilter', module)
    .addDecorator(story =>
        <IntlProvider locale="en">
            {story()}
        </IntlProvider>,
    )
    .addDecorator(story =>
        <div style={{ width: '250px' }}>
            {story()}
        </div>,
    )
    .addDecorator(centered)
    .add('default', () =>
        <StopsDurationFilter
            minDuration={0}
            maxDuration={86400}
            step={300}
            onChange={action('onChange')}
        />,
    );
