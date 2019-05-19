/**
 * @flow
 */

import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { Checkbox as BaseCheckbox, Popup, Icon } from 'semantic-ui-react';

type NightStopsFilterProps = {
    enabled: boolean,
    onChange: Function,
};

const InfoIcon = styled(Icon)`
    cursor: help;
    margin-left: 3px !important;
`;

const Checkbox = styled(BaseCheckbox)`
    & ::after {
        color: ${({ theme }) => theme.flights.filters} !important;
    }
`;

const CheckboxLabel = () =>
    <label>
        <FormattedMessage
            id="filters.sidebar.NightStopsFilter.label"
            defaultMessage="Night stops"
        />
        <Popup
            trigger={<InfoIcon name="grey info circle" color="grey" />}
            size="small"
            wide
            inverted
        >
            <Popup.Content>
                <FormattedMessage
                    id="filters.sidebar.NightStopsFilter.Popup.content"
                    defaultMessage="Stop that takes more then 10 hours and transition to the next day after arrival, and may require you to book a hotel."
                />
            </Popup.Content>
        </Popup>
    </label>;

const NightStopsFilter = ({ enabled, onChange }: NightStopsFilterProps) =>
    <Checkbox
        label={<CheckboxLabel />}
        checked={enabled}
        onChange={onChange}
    />;

export default NightStopsFilter;
