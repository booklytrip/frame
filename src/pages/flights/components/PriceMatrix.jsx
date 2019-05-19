/**
 * @flow
 */

import React from 'react';
import classNames from 'classnames';
import { injectIntl, defineMessages } from 'react-intl';

import PriceMatrixBase from '../containers/PriceMatrix';

import type { SearchFlightQuery, Intl } from '../../../types';

type LabelProps = {
    label: string,
    arrow: string,
};

type PriceMatrixProps = {
    query: SearchFlightQuery,
    intl: Intl,
};

const intlMessages = defineMessages({
    departure: {
        id: 'flights.PriceMatrix.departure',
        defaultMessage: 'Departure',
    },
    return: {
        id: 'flights.PriceMatrix.return',
        defaultMessage: 'Return',
    },
});

const styles = {
    icon: {
        color: 'rgba(0, 0, 0, 0.4)',
        paddingLeft: '5px',
    },
};

/**
 * Represents label with arrow icon for single axis of price matrix
 *
 * @param {String} label - An axis label
 * @param {String} arrow - Direction of arrow icon (e.g. right, bottom)
 */
const Label = ({ label, arrow }: LabelProps) => (
    <span>
        { label }
        <i
            className={ classNames('small arrow right icon', arrow) }
            style={ styles.icon }
        />
    </span>
);

/**
 * A wrapper for base price matrix component. Populates component with data.
 *
 * @param {Object} query - Search query request
 */
const PriceMatrix = injectIntl(({ query, intl }: PriceMatrixProps) => (
    <PriceMatrixBase
        { ...query }
        current={ {
            column: query.departureDate,
            row: query.wayType === 'ROUND_TRIP' ? query.returnDate : undefined,
        } }
        rowLabel={ <Label label={ intl.formatMessage(intlMessages.departure) } arrow="down" /> }
        columnLabel={ query.wayType === 'ROUND_TRIP'
            ? <Label label={ intl.formatMessage(intlMessages.return) } arrow="right" />
            : <Label label={ intl.formatMessage(intlMessages.departure) } arrow="right" />
        }
        valuePrefix="&euro;"
    />
));

export default PriceMatrix;
