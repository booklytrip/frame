/**
 * @flow
 */

import React from 'react';

import { Header, Segment } from 'semantic-ui-react';

type FiltersGroupProps = {
    title: string,
    children?: any,
};

const FiltersGroup = ({ title, children }: FiltersGroupProps) => (
    <Segment attached secondary>
        <Header as="h4">
            {title}
        </Header>
        {children}
    </Segment>
);

export default FiltersGroup;
