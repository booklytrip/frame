/**
 * Filter flight results by stops duration.
 *
 * @flow
 */

import React from 'react';
import { injectIntl, defineMessages } from 'react-intl';
import styled from 'styled-components';
import { TimeRangeSlider } from '../../../../../components';
import FiltersGroup from './FiltersGroup';

import type { Intl } from '../../../../../types';

type StopsDurationFilterProps = {
    minDuration: number,
    maxDuration: number,
    value: Array<number>,
    onChange: Function,
    intl: Intl,
};

const Slider = styled(TimeRangeSlider)`
    margin-top: 1em;
    margin-bottom: 1em;

    & .noUi-connect {
        background: ${({ theme }) => theme.flights.filters} !important;
    }
`;

const intlMessages = defineMessages({
    title: {
        id: 'filters.sidebar.StopsDurationFilter.title',
        defaultMessage: 'Stops duration',
    },
});

const StopsDurationFilter = injectIntl(
    ({
        minDuration,
        maxDuration,
        value,
        onChange,
        intl,
    }: StopsDurationFilterProps) =>
        <FiltersGroup title={intl.formatMessage(intlMessages.title)}>
            <Slider
                min={minDuration}
                max={maxDuration}
                value={value}
                step={300}
                onChange={onChange}
            />
        </FiltersGroup>,
);

export default StopsDurationFilter;
