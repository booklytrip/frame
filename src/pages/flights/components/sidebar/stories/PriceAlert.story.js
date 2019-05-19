import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@kadira/react-storybook-decorator-centered';

import PriceAlert from '../PriceAlert.jsx';

storiesOf('flights/PriceAlert', module)
    .addDecorator(story =>
        <div style={{ width: '250px' }}>
            {story()}
        </div>,
    )
    .addDecorator(centered)
    .add('default', () => <PriceAlert />);
