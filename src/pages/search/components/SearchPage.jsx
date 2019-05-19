import React from 'react';
import styled from 'styled-components';

import { Container, Grid as BaseGrid } from 'semantic-ui-react';
import { Navigation } from '../../../layouts';
import SearchForm from '../containers/SearchForm';

const Background = styled.div`
    height: 100%;
    background: ${({ theme }) => theme.search.background};
`;

const ContentContainer = styled(Container)`
    height: calc(100% - 61px);
    padding-left: 1em;
    padding-right: 1em;
`;

const Grid = styled(BaseGrid)`height: 100%;`;

const SearchPage = () => (
    <Background>
        <ContentContainer fluid>
            <Navigation inverted />
            <Grid>
                <BaseGrid.Column verticalAlign="middle">
                    <SearchForm />
                </BaseGrid.Column>
            </Grid>
        </ContentContainer>
    </Background>
);

export default SearchPage;
