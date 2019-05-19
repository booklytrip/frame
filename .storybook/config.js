import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import theme from '../src/themes/ryanair';

// Import semantic UI stylesheets
import 'semantic-ui-css/semantic.min.css';

addDecorator(story =>
    <ThemeProvider theme={theme}>
        {story()}
    </ThemeProvider>,
);

// Get all stories that are in stories sub-folder
const req = require.context('../src', true, /\.story\.js$/);

function loadStories() {
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
