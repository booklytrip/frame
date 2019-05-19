import React from 'react';
import { IntlProvider } from 'react-intl';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import centered from '@kadira/react-storybook-decorator-centered';

import { Container } from 'semantic-ui-react';
import SearchButton from '../SearchButton';

storiesOf('search/SearchButton', module)
    .addDecorator(story =>
        <IntlProvider locale="en">
            {story()}
        </IntlProvider>,
    )
    .addDecorator(story =>
        <Container>
            {story()}
        </Container>,
    )
    .addDecorator(centered)
    .add('default', () => <SearchButton onClick={action('onClick')} />)
    .add('loading', () => <SearchButton onClick={action('onClick')} loading />);
