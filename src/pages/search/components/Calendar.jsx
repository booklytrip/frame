/**
 * @flow
 */

import React from 'react';
import styled from 'styled-components';
import { compose, withHandlers } from 'recompose';
import { filter, isNil } from 'lodash';

import { Icon } from 'semantic-ui-react';
import { Calendar as BasicCalendarBase } from 'uikit';

type CalendarProps = {
    fromDate: ?string | Object,
    toDate: ?string | Object,
    clearable?: boolean,
    selectedDays: Array<Date>,
    onClear?: Function,
};

const BasicCalendar = styled(BasicCalendarBase)`
    input {
        height: 56px !important;
        padding: 0px 18px;
    }
`;

const CalendarIcon = styled(Icon)`
    color: #2185d0;
    opacity: 1 !important;
    font-size: 1.2em !important;
`;

const ClearIcon = styled(Icon)`
    color: #2185d0;
    opacity: 1 !important;
    font-size: 1.2em !important;
    cursor: pointer;
`;

/**
 * Return true if provided date should be disabled
 * 
 * @param {String} date     - The date to verify 
 * @param {String} fromDate - All dates before this should be disabled 
 * @param {String} toDate   - All dates after this should be disabled
 */
// const disabledDays = (date, fromDate, toDate) => {
//     if (
//         fromDate &&
//         startOfDay(fromDate).getTime() > startOfDay(date).getTime()
//     ) {
//         return true;
//     }

//     if (toDate && startOfDay(toDate).getTime() < startOfDay(date).getTime()) {
//         return true;
//     }

//     return false;
// };

const Calendar = ({
    clearable,
    onClear,
    fromDate,
    toDate,
    selectedDays,
    month,
    ...props
}: CalendarProps) => (
    <BasicCalendar
        {...props}
        type="date"
        firstDayOfWeek={1}
        icon={
            clearable && props.value ? (
                <ClearIcon name="remove" onClick={onClear} link />
            ) : (
                <CalendarIcon name="calendar" />
            )
        }
        iconPosition="right"
        minDate={fromDate}
        maxDate={toDate}
        dayPickerProps={{
            month,
            numberOfMonths: 2,
            fixedWeeks: true,
            // disabledDays: date => disabledDays(date, fromDate, toDate),
            selectedDays: filter(selectedDays, day => !isNil(day)).map(
                date => new Date(date),
            ),
        }}
    />
);

export default compose(
    withHandlers({
        onClear: ownProps => () => {
            ownProps.onChange(null);
        },
    }),
)(Calendar);
