import React from 'react';
import { IntlProvider } from 'react-intl';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import centered from '@kadira/react-storybook-decorator-centered';

import { ReduxProvider } from '../../../../../../providers';
import { reduxForm } from 'redux-form';

import { Container } from 'semantic-ui-react';
import CheckinFormOriginal from '../CheckinForm';
import validate from '../../../../containers/service/tickets/validate';

import { passenger } from './fixtures';

const CheckinForm = ({ ...props }) => {
    const FormComponent = reduxForm({
        form: 'checkin',
        validate,
    })(CheckinFormOriginal);

    return <FormComponent {...props} />;
};

storiesOf('booking/tickets/CheckinForm', module)
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
    .add('default', () =>
        <CheckinForm
            onSubmit={() => {
                action('onSubmit');
                // Return promise and wait for 3 seconds before resolving
                // to simulate delay while submitting to server.
                return new Promise((reject, resolve) => {
                    setTimeout(resolve, 3000);
                });
            }}
            onHide={action('onHide')}
            passenger={passenger}
        />,
    );
