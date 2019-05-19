/**
 * @flow
 */

import React from 'react';
import { compose, withState, withHandlers } from 'recompose';
import { Field } from 'redux-form';
import { injectIntl, defineMessages, FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { Dropdown, Input } from 'semantic-ui-react';
import { Counter, FormComponent } from 'uikit';

import type { Intl } from '../../../types.js';

type PassengersProps = {
    values: {
        adults: number,
        children: number,
        infants: number,
    },
    open: boolean,
    onShow: Function,
    onHide: Function,
    intl: Intl,
};

const styles = {
    counter: {
        width: 'auto',
    },
    counterInput: {
        padding: 0,
        minWidth: '30px',
    },
    withoutSeat: {
        display: 'block',
        color: 'rgba(0,0,0,.4)',
        fontSize: '.9rem',
        marginTop: '2px',
    },
};

const fields = {
    counter: FormComponent(Counter),
};

const intlMessages = {
    infants: defineMessages({
        maxMessage: {
            id: 'search.Passengers.infants.maxMessage',
            defaultMessage: "You can't travel with more infants than adults",
        },
    }),
    passengers: defineMessages({
        title: {
            id: 'search.Passengers.title',
            defaultMessage:
                '{value} {value, plural, one {passenger} other {passengers}}',
        },
    }),
};

const PassengersDropdown = styled(Dropdown)`
    & > .menu {
        min-width: 241px !important;
    }
`;

const DropdownInput = styled(Input)`
    height: 56px;
    line-height: 34px;
`;

const DropdownItem = styled(Dropdown.Item)`
    background: #FFFFFF !important;
    cursor: default;
    display: flex !important;
    justify-content: space-between !important;
`;

const ItemText = styled.span`
    font-size: .9rem;
    line-height: 30px;
`;

/**
 * Calculate total number of passengers
 */
const calcPassengers = ({ adults, children, infants }) => {
    return (
        parseInt(adults, 10) + parseInt(children, 10) + parseInt(infants, 10)
    );
};

const Passengers = injectIntl(
    ({ values, open, onShow, onHide, intl }: PassengersProps) =>
        <PassengersDropdown
            trigger={
                <DropdownInput
                    value={intl.formatMessage(intlMessages.passengers.title, {
                        value: calcPassengers(values),
                    })}
                    icon="caret down"
                    readOnly
                />
            }
            open={open}
            onBlur={() => {
                onHide();
            }}
            onFocus={() => {
                onShow();
            }}
            pointing="top right"
            icon={null}
            fluid
        >
            <Dropdown.Menu>
                <DropdownItem>
                    <ItemText>
                        <FormattedMessage
                            id="search.Passengers.adults"
                            defaultMessage="Adults"
                        />{' '}
                        (12+)
                    </ItemText>
                    <Field
                        component={fields.counter}
                        style={styles.counter}
                        inputStyle={styles.counterInput}
                        name="adults"
                        size="mini"
                        min={1}
                    />
                </DropdownItem>
                <DropdownItem>
                    <ItemText>
                        <FormattedMessage
                            id="search.Passengers.children"
                            defaultMessage="Children"
                        />{' '}
                        (2-11)
                    </ItemText>
                    <Field
                        component={fields.counter}
                        style={styles.counter}
                        inputStyle={styles.counterInput}
                        name="children"
                        size="mini"
                        min={0}
                        max={10}
                    />
                </DropdownItem>
                <DropdownItem>
                    <ItemText>
                        <FormattedMessage
                            id="search.Passengers.infants"
                            defaultMessage="Infants"
                        />{' '}
                        (0-2)
                    </ItemText>
                    <Field
                        component={fields.counter}
                        style={styles.counter}
                        inputStyle={styles.counterInput}
                        name="infants"
                        size="mini"
                        min={0}
                        max={values.adults}
                        maxMessage={intl.formatMessage(
                            intlMessages.infants.maxMessage,
                        )}
                    />
                </DropdownItem>
            </Dropdown.Menu>
        </PassengersDropdown>,
);

const state = withState('open', 'setOpen', false);
const handlers = withHandlers({
    onShow: ownProps => () => {
        ownProps.setOpen(true);
    },
    onHide: ownProps => () => {
        ownProps.setOpen(false);
    },
});

export default compose(state, handlers)(Passengers);
