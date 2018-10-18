import React from 'react';
import { shallow } from 'enzyme';

import SynonimsService from '../../services/synonims.service';

import Add from '../../screens/add';

jest.mock('../../services/synonims.service');

describe('Add Component', () => {

    it('should render without throwing an error', () => {
        expect(shallow(<Add />).find('#add-form').length).toBe(1)
    })

    describe('Add word input control', () => {

        it('should respond to change event and change the state of the Add Component', () => {
            const wrapper = shallow(<Add />);
            wrapper.find('#add-input').simulate('change', { target: { name: 'word', value: 'someWord' } });
            expect(wrapper.state('word')).toEqual('someWord');
        })
    })
    describe('Add new synonim input control', () => {

        it('should respond to change event and change the state of the Add Component', () => {
            const wrapper = shallow(<Add />);
            wrapper.find('#add-synonim-input').simulate('change', { target: { name: 'newSynonim', value: 'someWord' } });
            expect(wrapper.state('newSynonim')).toEqual('someWord');
        })
    })

    describe('Add new synonim button', () => {

        it('should respond to click event and change the state of the Add Component', () => {
            const wrapper = shallow(<Add />);
            wrapper.setState({ newSynonim: 'newWord', synonims: [] })
            wrapper.find('#add-synonim-button').simulate('click', { preventDefault() { } });
            expect(wrapper.state('newSynonim')).toEqual('');
            expect(wrapper.state('synonims')).toEqual(['newWord']);
        })

        it('should respond to click event and discover if duplicate synonim is entered', () => {
            const wrapper = shallow(<Add />);
            wrapper.setState({ newSynonim: 'word', synonims: ['word'] })
            wrapper.find('#add-synonim-button').simulate('click', { preventDefault() { } });
            expect(wrapper.state('newSynonim')).toEqual('word');
            expect(wrapper.state('duplicate')).toEqual(true);
            expect(wrapper.state('synonims')).toEqual(['word']);
        })
    })

    describe('Add new word button', () => {
        it('should respond to click event and call SynonimsService addWord method', async () => {
            SynonimsService.addWord.mockImplementationOnce(() =>
                Promise.resolve({
                    message: "Word is added in dictionary"
                })
            );

            const wrapper = shallow(<Add />);
            wrapper.setState({
                word: 'newWord',
                synonims: ['firstSynonim', 'secondSynonim'],
                newSynonim: '',
                duplicate: false
            })

            await wrapper.find('#add-form').simulate('submit', { preventDefault() { } })
            expect(wrapper.state('word')).toEqual('');
            expect(wrapper.state('synonims')).toEqual([]);
            expect(SynonimsService.addWord).toHaveBeenCalledTimes(1);
            expect(SynonimsService.addWord).toHaveBeenCalledWith('newWord', ['firstSynonim', 'secondSynonim']);
        })
    })

})