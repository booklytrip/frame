import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import centered from '@kadira/react-storybook-decorator-centered';

import Airport from '../Airport.jsx';

import { airports as airportsList } from './fixtures.js';

storiesOf('search/Airport', module)
    .addDecorator(centered)
    .add('default', () => <Airport placeholder="Departure place" />)
    .add('loading', () => <Airport placeholder="Departure place" loading />)
    .add('with results', () =>
        <Airport
            placeholder="Departure place"
            results={airportsList}
            onResultSelect={action('onResultSelect')}
        />,
    )
    .add('with grouped results', () =>
        <Airport
            placeholder="Departure place"
            results={airportsList.map((airport, idx) => ({
                ...airport,
                shift: idx > 0,
            }))}
            onResultSelect={action('onResultSelect')}
        />,
    )
    .add('with swap icon', () =>
        <Airport placeholder="Departure place" onSwap={action('onSwap')} />,
    );
