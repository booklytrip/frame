/**
 * The message shown while search results are loading from the server
 * 
 * @flow
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import {
    Segment,
    Header as BaseHeader,
    Grid,
    Loader,
    Icon,
} from 'semantic-ui-react';

const RootSegment = styled(Segment)`
    margin-top: 6em !important;
    padding: 3em !important;
    max-width: 800px;
    margin-left: auto !important;
    margin-right: auto !important;
`;

const Spinner = styled(Loader)`
    top: 0 !important;
    background: #fff;
    &::after {
        border-color: ${({ theme }) => theme.flights.preloading.spinner}
            transparent transparent !important;
    }
`;

const Header = styled(BaseHeader)`
    margin-top: 0.2em !important;
    margin-bottom: 1.5em !important;
    color: ${({ theme }) => theme.flights.preloading.header} !important;
`;

const ItemIcon = styled(Icon)`
    position: absolute;
    color: ${({ theme }) => theme.flights.preloading.icon} !important;
`;

const ItemText = styled.div`
    padding-left: 95px;
    color: #636262;
    font-size: 16px;
    line-height: 24px;
`;

const Column = styled(Grid.Column)`min-height: 70px;`;

const Preloading = () => (
    <RootSegment>
        <Spinner size="large" active />
        <Header as="h1" textAlign="center">
            <FormattedMessage
                id="flights.Preloading.header"
                defaultMessage="Searching for flights results"
            />
        </Header>
        <Grid columns={2} padded>
            <Grid.Row>
                <Column>
                    <ItemIcon name="time" size="huge" />
                    <ItemText>
                        <FormattedMessage
                            id="flights.Preloading.item1"
                            defaultMessage="24/7 service"
                        />
                    </ItemText>
                </Column>
                <Column>
                    <ItemIcon name="users" size="huge" />
                    <ItemText>
                        <FormattedMessage
                            id="flights.Preloading.item2"
                            defaultMessage="Support by team of professionals"
                        />
                    </ItemText>
                </Column>
            </Grid.Row>
            <Grid.Row>
                <Column>
                    <ItemIcon name="lock" size="huge" />
                    <ItemText>
                        <FormattedMessage
                            id="flights.Preloading.item3"
                            defaultMessage="Secure payments over protected gateway"
                        />
                    </ItemText>
                </Column>
                <Column>
                    <ItemIcon name="dollar" size="huge" />
                    <ItemText>
                        <FormattedMessage
                            id="flights.Preloading.item4"
                            defaultMessage="Multiple payment methods. Pay with credit card, bank
                    transfer or even with cash!"
                        />
                    </ItemText>
                </Column>
            </Grid.Row>
        </Grid>
    </RootSegment>
);

export default Preloading;
