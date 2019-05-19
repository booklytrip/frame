import React from 'react';
import { mountWithIntl, createWithIntl } from '../../../../../lib/jest/intl';
import BookButton from '../BookButton';

describe('BookButton', () => {
    it('renders without crashing', () => {
        mountWithIntl(<BookButton />);
    });

    it('should call onClick event if clicked', () => {
        const spy = jest.fn();
        const bookButton = mountWithIntl(
            <BookButton onClick={ spy } />
        );
        bookButton.simulate('click');

        expect(spy).toBeCalled();
    });

    describe('Snapshots', () => {
        it('renders flight booking button', () => {
            const rendered = createWithIntl(<BookButton />);
            expect(rendered.toJSON()).toMatchSnapshot();
        });
    });
});
