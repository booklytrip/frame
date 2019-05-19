import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import centered from '@kadira/react-storybook-decorator-centered';
import { map, omit } from 'lodash';

import { Container } from 'semantic-ui-react';
import { PriceMatrix } from '../PriceMatrix.jsx';

import { priceMatrix as priceMatrixFixtures } from './fixtures';

// Define dates range
const COLUMNS = [
    '2016-08-01',
    '2016-08-02',
    '2016-08-03',
    '2016-08-04',
    '2016-08-05',
];
const ROWS = [
    '2016-08-06',
    '2016-08-07',
    '2016-08-08',
    '2016-08-09',
    '2016-08-10',
];

storiesOf('core/PriceMatrix', module)
    .addDecorator(story =>
        <Container>
            {story()}
        </Container>,
    )
    .addDecorator(centered)
    .add('loading', () =>
        <PriceMatrix
            onClick={() => {}}
            rows={ROWS}
            columns={COLUMNS}
            columnLabel="Return"
            rowLabel="Departure"
            loading
        />,
    )
    .add('without labels', () =>
        <PriceMatrix
            onClick={action('onClick')}
            prices={priceMatrixFixtures}
            rows={ROWS}
            columns={COLUMNS}
        />,
    )
    .add('with data', () =>
        <PriceMatrix
            onClick={action('onClick')}
            prices={priceMatrixFixtures}
            rows={ROWS}
            columns={COLUMNS}
            columnLabel="Return"
            rowLabel="Departure"
        />,
    )
    .add('with value prefix', () =>
        <PriceMatrix
            onClick={action('onClick')}
            prices={priceMatrixFixtures}
            rows={ROWS}
            columns={COLUMNS}
            columnLabel="Return"
            rowLabel="Departure"
            valuePrefix="&euro;"
        />,
    )
    .add('with selected current date', () =>
        <PriceMatrix
            onClick={action('onClick')}
            prices={priceMatrixFixtures}
            current={{
                column: '2016-08-02',
                row: '2016-08-07',
            }}
            rows={ROWS}
            columns={COLUMNS}
            columnLabel="Return"
            rowLabel="Departure"
        />,
    )
    .add('loading with single row', () =>
        <PriceMatrix
            onClick={() => {}}
            columns={COLUMNS}
            columnLabel="Departure"
            loading
        />,
    )
    .add('with single rows', () =>
        <PriceMatrix
            onClick={action('onClick')}
            prices={map(priceMatrixFixtures, item => omit(item, ['row']))}
            current={{
                column: '2016-08-02',
            }}
            columns={COLUMNS}
            columnLabel="Departure"
        />,
    );
