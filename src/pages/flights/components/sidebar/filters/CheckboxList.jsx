/**
 * Wrapper around CheckboxList component from UIKit that
 * remove left and right margin to better fit in UI.
 *
 * @flow
 */

import styled from 'styled-components';

import { CheckboxList as BaseCheckboxList } from 'uikit';

const CheckboxList = styled(BaseCheckboxList)`
    margin: 0px -0.5em !important;
    & .ui.checked.checkbox {
        ::after {
            color: ${({ theme }) => theme.flights.filters} !important;
        }
    }
`;

export default CheckboxList;
