/**
 * The component represents time slider with two labels showing
 * current min and max values.
 *
 * @flow
 */

import React from 'react';
import styled from 'styled-components';
import { withState, withProps, compose } from 'recompose';

import { Divider } from 'semantic-ui-react';
import { Slider } from 'uikit';

import { humanizeDuration } from '../lib/date';

type TimeRangeSliderProps = {
    // Additional class name
    className?: string,
    // Define custom styling of the component
    style?: Object,
    // The initial value (e.g. [2400, 20400])
    value?: Array<number>,
    // The interval value updated by slider itself and used to show corrent
    // values between start of sliding and till user will release slider
    currentValue: Array<number>,
    // Min range of slider
    min: number,
    // Max range of slider
    max: number,
    // Step to slide with
    step?: number,
    // Callback events
    onChange: Function,
    onUpdate: Function,
    onSlide: Function,
};

const LeftTime = styled.span`
    float: left;
    font-size: 12px;
`;

const RightTime = styled.span`
    float: right;
    font-size: 12px;
`;

const TimeSlider = styled(Slider)`
    margin-top: 10px;
    margin-left: 9px;
    margin-right: 9px;
`;

const TimeRangeSlider = ({
    className,
    style,
    value,
    currentValue,
    min,
    max,
    step,
    onChange,
    onSlide,
}: TimeRangeSliderProps) => (
    <div className={className} style={style}>
        <div>
            <LeftTime>
                {humanizeDuration(currentValue[0], { magnitudes: ['h', 'm'] })}
            </LeftTime>
            <RightTime>
                {humanizeDuration(currentValue[1], { magnitudes: ['h', 'm'] })}
            </RightTime>
        </div>
        <Divider hidden clearing fitted />
        <TimeSlider
            range={{ min, max }}
            start={value}
            step={step}
            onChange={value => {
                onChange(value);
            }}
            onSlide={value => {
                onSlide(value);
            }}
        />
    </div>
);

// Update state with current value while user sliding and until releasing.
// Required to correctly present values in the left and right labels.
const state = withState('currentValue', 'onSlide', props => props.value);

// If value is not defined use min and max as value
const props = withProps(props => ({
    value: props.value || [props.min, props.max],
}));

export default compose(props, state)(TimeRangeSlider);
