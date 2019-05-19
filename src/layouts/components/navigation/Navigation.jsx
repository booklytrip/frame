/**
 * @flow
 */

import React from 'react';
import styled from 'styled-components';

import { Menu as BaseMenu } from 'semantic-ui-react';
import Language from '../../containers/navigation/Language';

type NavigationProps = {
    inverted: boolean,
};

const Menu = styled(BaseMenu)`
    padding-top: 0.5em;
`;

const Navigation = ({ inverted }: NavigationProps) =>
    <Menu secondary inverted={inverted}>
        <BaseMenu.Menu position="right">
            <BaseMenu.Item>
                <Language />
            </BaseMenu.Item>
        </BaseMenu.Menu>
    </Menu>;

export default Navigation;
