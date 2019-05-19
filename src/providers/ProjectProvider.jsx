import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose, branch, renderComponent } from 'recompose';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Message, Loader } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import { indexOf } from 'lodash';

import { saveProject } from '../actions/project';
import { updateLocale } from '../actions/intl';

const ErrorMessage = styled(Message)`
    margin: 1em auto !important;
    max-width: 500px;
`;

const GET_PROJECT_QUERY = gql`
    query getProjectSettings($id: ID!) {
        project(id: $id) {
            id
            name
            url
            theme
            localization {
                defaultLanguage
                languages
            }
        }
    }
`;

const withData = graphql(GET_PROJECT_QUERY, {
    options: () => ({
        variables: {
            // The project ID is first part of the hostname (e.g. 5931ed02190d4fb38a8b9459.booklytrip.com)
            id: window.location.hostname.split('.')[0],
        },
    }),
    props: ({ data: { loading, error, project }, ownProps }) => ({
        loading,
        error,
        project,
    }),
});

const withErrorMessage = branch(
    props => props.error,
    renderComponent(() =>
        <ErrorMessage error>
            <Message.Header>Error</Message.Header>
            <Message.Content>Requested project is not found</Message.Content>
        </ErrorMessage>,
    ),
);

const withSpinner = branch(
    props => props.loading,
    renderComponent(() =>
        <Loader size="large" active>
            Please wait...
        </Loader>,
    ),
);

const ProjectProvider = ({
    loading,
    project,
    intl,
    saveProject,
    updateLocale,
    children,
}) => {
    if (!loading && project) {
        // Save project in redux store
        saveProject(project);

        // Use default language if locale is undefined OR defined language
        // is not in list of available for this project
        if (
            !intl.get('locale') ||
            indexOf(project.localization.languages, intl.get('locale')) === -1
        ) {
            updateLocale(project.localization.defaultLanguage);
        }
    }

    return children;
};

export default compose(
    injectIntl, // Without that react-intl doesn't re-render components
    connect(({ intl }) => ({ intl }), { saveProject, updateLocale }),
    withData,
    withSpinner,
    withErrorMessage,
)(ProjectProvider);
