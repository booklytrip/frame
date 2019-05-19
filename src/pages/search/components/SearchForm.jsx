/**
 * @flow
 */

import React from 'react';
import styled from 'styled-components';

import { Form, Grid } from 'semantic-ui-react';
import SearchButton from './SearchButton';
import { LastSearch, SearchFormFields } from '../containers';

type SearchFormProps = {
    handleSubmit: Function,
    change: Function,
    submitting: boolean,
};

const LastSearchColumn = styled(Grid.Column)`
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    margin-left: 1px !important;
    margin-right: 1px !important;
`;

/**
 * Represents inline flights search form
 */
const SearchForm = ({ handleSubmit, change, submitting }: SearchFormProps) =>
    <Form className="search-form" onSubmit={handleSubmit}>
        <Grid columns={1}>
            <Grid.Column>
                <SearchFormFields change={change} />
            </Grid.Column>
            <LastSearchColumn>
                <LastSearch />
            </LastSearchColumn>
            <Grid.Column textAlign="center">
                <SearchButton loading={submitting} onClick={handleSubmit} />
            </Grid.Column>
        </Grid>
    </Form>;

export default SearchForm;
