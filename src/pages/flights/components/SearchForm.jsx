/**
 * @flow
 */

import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { Button, Form, Grid, Icon } from 'semantic-ui-react';

import LastSearch from '../../search/containers/LastSearch';
import SearchFormFields from '../../search/containers/SearchFormFields';

type SearchFormProps = {
    change: Function,
    handleSubmit: Function,
};

const FormGroup = styled(Form.Group)`
    margin: 0 !important;
`;

const FormField = styled(Form.Field)`
    padding-left: 1px !important;
    padding-right: 1px !important;
`;

const LastSearchColumn = styled(Grid.Column)`
    padding-top: 0 !important;
    margin-left: 1px !important;
    margin-right: 1px !important;
`;

const SubmitButton = styled(Button)`
    width: 100%;
    height: 100%;
    background: ${({ theme }) =>
        theme.search.searchButton.background} !important;
    color: ${({ theme }) => theme.search.searchButton.color} !important;
`;

const SearchForm = ({ change, handleSubmit }: SearchFormProps) =>
    <Grid columns={1}>
        <Grid.Column>
            <Form className="search-form" onSubmit={handleSubmit}>
                <FormGroup>
                    <FormField width={14}>
                        <SearchFormFields change={change} />
                    </FormField>
                    <FormField width={2}>
                        <SubmitButton
                            onClick={handleSubmit}
                            floated="right"
                            labelPosition="left"
                            icon
                        >
                            <Icon name="search" />
                            <FormattedMessage
                                id="flights.SearchForm.submitButton"
                                defaultMessage="Search"
                            />
                        </SubmitButton>
                    </FormField>
                </FormGroup>
            </Form>
        </Grid.Column>
        <LastSearchColumn>
            <LastSearch />
        </LastSearchColumn>
    </Grid>;

export default SearchForm;
