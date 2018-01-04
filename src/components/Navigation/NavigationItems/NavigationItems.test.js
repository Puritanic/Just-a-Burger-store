import { shallow, configure } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  it('should render two NavigationItems without crashing', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render two NavigationItems if not auth', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it('should render three NavigationItems if auth', () => {
    wrapper.setProps({ authenticated: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it('should render Logout NavItem if auth', () => {
    wrapper.setProps({ authenticated: true });
    expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
  });
});
