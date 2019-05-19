import React from 'react';
import { IntlProvider } from 'react-intl';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import centered from '@kadira/react-storybook-decorator-centered';

import { ApolloProvider } from '../../../../providers';
import { reduxForm } from 'redux-form';

import { Container } from 'semantic-ui-react';
import SearchFormOriginal from '../SearchForm.jsx';

const initialValues = {
    wayType: 'ONE_WAY',
    adults: 1,
    children: 0,
    infants: 0,
};

// Wrap SearchFormOriginal component to reduxForm
const SearchForm = ({ ...props }) => {
    const FormComponent = reduxForm({
        form: 'search',
        initialValues,
    })(SearchFormOriginal);

    return <FormComponent {...props} />;
};

storiesOf('search/SearchForm', module)
    .addDecorator(story =>
        <IntlProvider locale="en">
            {story()}
        </IntlProvider>,
    )
    .addDecorator(story =>
        <ApolloProvider>
            {story()}
        </ApolloProvider>,
    )
    .addDecorator(story =>
        <Container>
            {story()}
        </Container>,
    )
    .addDecorator(centered)
    .add('default', () =>
        <SearchForm
            formValues={initialValues}
            onSubmit={action('onSubmit')}
            submitting={false}
        />,
    );
