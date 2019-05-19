/**
 * @flow
 */

import React from 'react';
import { injectIntl, defineMessages } from 'react-intl';
import styled from 'styled-components';

import { Grid, Label } from 'semantic-ui-react';

import type { Intl } from '../../../types';

type BookingStepsProps = {
    active: number,
    intl: Intl,
};

type StepProps = {
    text: string,
    badge: number,
    active?: boolean,
};

const intlMessages = defineMessages({
    step1: {
        id: 'booking.BookingSteps.step1',
        defaultMessage: 'Passenger information',
    },
    step2: {
        id: 'booking.BookingSteps.step2',
        defaultMessage: 'Choose your payment',
    },
    step3: {
        id: 'booking.BookingSteps.step3',
        defaultMessage: 'Booking confirmation',
    },
});

const HorizontalLine = styled.div`
    content: '';
    height: 2px;
    width: 60%;
    border-bottom: 1px solid #d4d4d4;
    position: absolute;
    display: block;
    margin-top: -2px;
    right: 13px;
    top: 50%;
    z-index: 1;
`;

const Badge = styled(Label)`
    &.ui.label {
        width: 35px;
        height: 35px;
        padding: 10px;
        font-size: 14px;
        font-weight: 600;
        line-height: 14px;
        text-align: center;
        vertical-align: middle;
        margin-right: 10px;
        border-radius: 500rem;
        color: ${({ theme }) => theme.booking.stepsBadge.color} !important;
        border-color: ${({ theme }) =>
            theme.booking.stepsBadge.borderColor} !important;
    }
`;

const StepText = styled.span`
    background-color: #ffffff;
    z-index: 2;
    padding-left: 5px;
    padding-right: 10px;
    position: relative;
    font-size: 16px;
    font-weight: bold;
    ${props =>
        props.active && `color: ${props.theme.booking.activeStepText.color};`};
`;

const Step = ({ text, badge, active }: StepProps) =>
    <Grid.Column>
        <HorizontalLine />
        <Badge basic>
            {badge}
        </Badge>
        <StepText active={active}>
            {text}
        </StepText>
    </Grid.Column>;

Step.defaultProps = {
    active: false,
};

const BookingSteps = injectIntl(({ active, intl }: BookingStepsProps) =>
    <Grid columns={3}>
        <Step
            text={intl.formatMessage(intlMessages.step1)}
            badge={1}
            active={active === 1}
        />
        <Step
            text={intl.formatMessage(intlMessages.step2)}
            badge={2}
            active={active === 2}
        />
        <Step
            text={intl.formatMessage(intlMessages.step3)}
            badge={3}
            active={active === 3}
        />
    </Grid>,
);

BookingSteps.defaultProps = {
    active: 1,
};

export default BookingSteps;
