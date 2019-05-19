import styled from 'styled-components';
import { Message } from 'semantic-ui-react';

const WarnMessage = styled(Message)`
    margin: 0 4px 0 4px;
    padding-top: 0.2rem !important;
    padding-bottom: 0.5rem !important;
    box-shadow: none !important;
    background: transparent !important;
`;

export default WarnMessage;
