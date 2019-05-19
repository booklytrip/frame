import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from 'styled-components';
import Root from './Root';

/* eslint no-unused-expressions: off */
injectGlobal`
    body {
        height: initial !important;
    }

    #root {
        height: 100%;
    }
`;

ReactDOM.render(<Root />, document.getElementById('root'));
