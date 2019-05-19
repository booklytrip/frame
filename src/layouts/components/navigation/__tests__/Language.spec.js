import React from 'react';
import { mountWithIntl, createWithIntl } from '../../../../lib/jest/intl';
import { find } from 'lodash';
import Language from '../Language';

const languages = [
    {
        language: 'en',
        text: 'English',
        flag: 'us',
    },
    {
        language: 'lv',
        text: 'Latvian',
        flag: 'lv',
    },
    {
        language: 'ru',
        text: 'Russian',
        flag: 'ru',
    },
];

describe('Language', () => {
    it('renders without crashing', () => {
        mountWithIntl(
            <Language
                locale={find(languages, { language: 'en' })}
                options={languages}
            />,
        );
    });

    it('should trigger onChange event when language is selected', () => {
        const spy = jest.fn();
        const component = mountWithIntl(
            <Language
                locale={find(languages, { language: 'en' })}
                options={languages}
                onChange={spy}
            />,
        );

        component.find('.item').first().simulate('click');
        expect(spy).toBeCalled();
    });

    describe('Snapshots', () => {
        it('should select russian language', () => {
            const rendered = createWithIntl(
                <Language
                    locale={find(languages, { language: 'ru' })}
                    options={languages}
                />,
            );
            expect(rendered).toMatchSnapshot();
        });
    });
});
