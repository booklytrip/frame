import React from 'react';
import { IntlProvider } from 'react-intl';
import { omit, merge } from 'lodash';
import { storiesOf } from '@storybook/react';
import centered from '@kadira/react-storybook-decorator-centered';

import { ReduxProvider } from '../../../../../providers';
import { reduxForm } from 'redux-form';

import { Container } from 'semantic-ui-react';
import PassengerInformationOriginal from '../PassengerInformation';
import validate from '../../../containers/details/validate';

import { flight } from './fixtures';

// Wrap PassengerInformation component to reduxForm
const PassengerInformation = ({ ...props }) => {
    const FormComponent = reduxForm({
        form: 'order',
        validate,
    })(PassengerInformationOriginal);

    return <FormComponent {...props} />;
};

storiesOf('booking/details/PassengerInformation', module)
    .addDecorator(story =>
        <IntlProvider locale="en">
            {story()}
        </IntlProvider>,
    )
    .addDecorator(story =>
        <ReduxProvider>
            {story()}
        </ReduxProvider>,
    )
    .addDecorator(story =>
        <Container>
            {story()}
        </Container>,
    )
    .addDecorator(centered)
    .add('passenger', () => {
        const _flight = {
            ...flight,
            forwardSector: omit(flight.forwardSector, 'baggage'),
            comebackSector: omit(flight.comebackSector, 'baggage'),
        };

        return (
            <div className="ui one column grid">
                <div className="column">
                    <PassengerInformation
                        flight={_flight}
                        type="adult"
                        index={1}
                    />
                </div>
                <div className="column">
                    <PassengerInformation
                        flight={_flight}
                        type="child"
                        index={2}
                    />
                </div>
                <div className="column">
                    <PassengerInformation
                        flight={_flight}
                        type="infant"
                        index={3}
                    />
                </div>
            </div>
        );
    })
    .add('with min age message', () =>
        <PassengerInformation
            flight={merge({}, flight, {
                forwardSector: { carrier: { minAge: 16 } },
            })}
            type="adult"
            index={1}
        />,
    )
    .add('with baggage', () =>
        <PassengerInformation flight={flight} type="adult" index={1} />,
    )
    .add('with outbound baggage', () =>
        <PassengerInformation
            flight={{
                ...flight,
                comebackSector: omit(flight.comebackSector, 'baggage'),
            }}
            type="adult"
            index={1}
        />,
    )
    .add('with inbound baggage', () =>
        <PassengerInformation
            flight={{
                ...flight,
                forwardSector: omit(flight.forwardSector, 'baggage'),
            }}
            type="adult"
            index={1}
        />,
    );
