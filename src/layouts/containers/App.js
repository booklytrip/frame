/**
 * @flow
 */

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { injectIntl } from 'react-intl';
import * as themes from '../../themes';
import App from '../components/App';

const mapStateToProps = ({ project }) => ({
    theme: themes[project.theme] || themes['default'],
});

export default compose(injectIntl, connect(mapStateToProps))(App);
