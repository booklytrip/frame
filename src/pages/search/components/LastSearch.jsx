/**
 * The component renders list of latest search queries
 * as list of clickable tags that redirect user to search results.
 *
 * @flow
 */

import React from 'react';
import { compose, branch, renderNothing } from 'recompose';
import styled from 'styled-components';
import { isEmpty, map } from 'lodash';

import { Segment } from 'semantic-ui-react';
import LastSearchItem from '../containers/LastSearchItem';

import type { SearchFlightQuery } from '../../../types';

type LastSearchProps = {
    itemStyle?: Object,
    queries: Array<SearchFlightQuery>,
};

const RootSegment = styled(Segment)`
    padding: 0 !important;
`;

const LastSearch = ({ itemStyle, queries }: LastSearchProps) =>
    <RootSegment basic vertical>
        {map(queries, (query, idx: number) =>
            <LastSearchItem key={idx} query={query} />,
        )}
    </RootSegment>;

export default compose(branch(props => isEmpty(props.queries), renderNothing))(
    LastSearch,
);
