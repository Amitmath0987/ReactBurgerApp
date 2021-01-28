// enzyme allows to render only standalone element which you want independent of the other react application i.e (unit test)
import React from 'react';

import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';
import Logout from '../../../containers/Auth/Logout/Logout';

configure({adapter: new Adapter()});

describe('<NavigationItems />',() => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    })
    // it allows us to write one individual test
    it('should render two <NavigationItems /> elements if not authenticated',()=> {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three <NavigationItems /> elements if  authenticated',()=> {
        wrapper.setProps({isAuthenticate: true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
    it('should render Logout <NavigationItems /> elements if  authenticated',()=> {
        wrapper.setProps({isAuthenticate: true})
        expect(wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)).toEqual(true)
    });
});
