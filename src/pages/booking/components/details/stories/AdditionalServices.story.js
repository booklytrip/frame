import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@kadira/react-storybook-decorator-centered';

import { Container } from 'semantic-ui-react';
import AdditionalServices from '../AdditionalServices.jsx';

storiesOf('booking/details/AdditionalServices')
    .addDecorator(story =>
        <Container>
            {story()}
        </Container>,
    )
    .addDecorator(centered)
    .add('default', () => <AdditionalServices />);
