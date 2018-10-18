import React from 'react';
import { shallow } from 'enzyme';

import SynonimsService from '../../services/synonims.service';

import Search from '../../screens/search';

jest.mock('../../services/synonims.service');

describe('Search Component', () => {

    it('should render without throwing an error', () => {
        expect(shallow(<Search />).find('#search-form').length).toBe(1)
    })

    describe('search word input control', () => {

        it('should respond to change event and change the state of the Search Component', () => {
            const wrapper = shallow(<Search />);
            wrapper.find('#search-input').simulate('change', { target: { name: 'word', value: 'someWord' } });
            expect(wrapper.state('word')).toEqual('someWord');
        })

    })
    describe('Search dictionary button', () => {
        it('should respond to click event and call SynonimsService getSynonims method', async () => {
            SynonimsService.getSynonims.mockImplementationOnce(() =>
                Promise.resolve({
                    synonims: ['firstSynonim', 'secondSynonim']
                })
            );

            const wrapper = shallow(<Search />);
            wrapper.setState({
                word: 'newWord',
                synonims: null
            })

            await wrapper.find('#search-form').simulate('submit', { preventDefault() { } })
            expect(wrapper.state('word')).toEqual('newWord');
            expect(wrapper.state('synonims')).toEqual(['firstSynonim', 'secondSynonim']);
            expect(SynonimsService.getSynonims).toHaveBeenCalledTimes(1);
            expect(SynonimsService.getSynonims).toHaveBeenCalledWith('newWord');
        })
    })
})