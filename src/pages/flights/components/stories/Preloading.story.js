import React from 'react';
import { storiesOf } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import centered from '@kadira/react-storybook-decorator-centered';

import { Container } from 'semantic-ui-react';
import Preloading from '../Preloading.jsx';

storiesOf('flights/Preloading', module)
    .addDecorator(story => <Container>{story()}</Container>)
    .addDecorator(story => <IntlProvider locale="en">{story()}</IntlProvider>)
    .addDecorator(centered)
    .add('default', () => <Preloading />);
