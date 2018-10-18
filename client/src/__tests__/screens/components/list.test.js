import React from 'react';
import { shallow } from 'enzyme';
import {ListGroupItem} from 'react-bootstrap'

import {List} from '../../../screens/components/list';

describe('List component', () => {

  it('should render list of items correctly', () => {
    const items = ['one', 'two', 'three'];
    const wrapper = shallow(<List items={items}/>);
    expect(wrapper.find('.list-items')).toBeDefined();
    expect(wrapper.find('.list-item')).toHaveLength(items.length);
  });

  it('should render list item correctly', () => {
    const items = ['one', 'two'];
    const wrapper = shallow(<List items={items} />);
    expect(wrapper.contains(<ListGroupItem key='one' className="list-item">one</ListGroupItem >)).toBeTruthy();
  });

  it('should not render list of items if items prop is empty and search props is ture',()=>{
    const wrapper = shallow(<List items={[]} search={true} />);
    expect(wrapper.find('.list-item')).toHaveLength(0);
    expect(wrapper.find('.empty-items-p')).toBeDefined();
  })
});