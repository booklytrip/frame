import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Airport from '../Airport';

import { airports } from '../stories/fixtures';

describe('Airport', () => {
    it('should render without crashing', () => {
        mount(<Airport />);
    });

    describe('Snapshots', () => {
        it('should render correctly', () => {
            const rendered = renderer.create(<Airport />).toJSON();
            expect(rendered).toMatchSnapshot();
        });

        it('should render results', () => {
            const rendered = renderer
                .create(<Airport results={airports} />)
                .toJSON();
            expect(rendered).toMatchSnapshot();
        });

        it('should render grouped results', () => {
            const grouped = airports.map((airport, idx) => ({
                ...airport,
                shift: idx > 0,
            }));

            const rendered = renderer
                .create(<Airport results={grouped} />)
                .toJSON();
            expect(rendered).toMatchSnapshot();
        });
    });
});
