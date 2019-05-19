import React from 'react';
import { IntlProvider } from 'react-intl';
import { storiesOf } from '@storybook/react';
import centered from '@kadira/react-storybook-decorator-centered';

import { ReduxProvider } from '../../../../../providers';
import { reduxForm } from 'redux-form';

import { Container } from 'semantic-ui-react';
import ContactInformationOriginal from '../ContactInformation.jsx';
import validate from '../../../containers/details/validate';

import { flight } from './fixtures';

// Wrap ContactInformation component to reduxForm
const ContactInformation = ({ ...props }) => {
    const FormComponent = reduxForm({
        form: 'order',
        validate,
    })(ContactInformationOriginal);

    return <FormComponent {...props} />;
};

storiesOf('booking/details/ContactInformation')
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
    .add('default', () => <ContactInformation flight={flight} />);
