import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import centered from '@kadira/react-storybook-decorator-centered';

import { Container } from 'semantic-ui-react';
import TimeRangeSlider from '../TimeRangeSlider.jsx';

storiesOf('core/TimeRangeSlider', module)
    .addDecorator(story =>
        <Container>
            {story()}
        </Container>,
    )
    .addDecorator(centered)
    .add('default', () =>
        <TimeRangeSlider
            min={2400}
            max={20400}
            onChange={action('onChange')}
        />,
    )
    .add('with value', () =>
        <TimeRangeSlider
            min={2400}
            max={20400}
            value={[3600, 18000]}
            onChange={action('onChange')}
        />,
    );
