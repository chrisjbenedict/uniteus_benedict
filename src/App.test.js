import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Form from './containers/Form'
import Header from './components/Header'
import Dropdown from './components/Dropdown'
import { configure, shallow, mount, render } from 'enzyme';
import 'jest-enzyme'
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('<App />', () => {
  it('renders 1 <App /> component', () => {
    const component = shallow(<App name="app"/>);
    expect(component).toHaveLength(1);
  })
  it('has correct props', () => {
    const component = shallow(<App name='app'/>);
    expect(component.instance().props.name).toBe('app');
  })
})

describe('<Form />', () => {
  it('renders 1 <Form /> component', () => {
    const component = shallow(<Form />);
    expect(component).toHaveLength(1);
  })
  it('hasState', () => {
    const wrapper = mount(<Form />);
    expect(wrapper).toHaveState('serviceTypes')
  })
})

describe('<Header />', () => {
  it('renders 1 <Header /> component', () => {
    const component = shallow(<Header />);
    expect(component).toHaveLength(1);
  })
  it('has correct props', () => {
    const wrapper = mount(<Form />);
    expect(wrapper.find(Header)).toHaveProp('content')
  })
})

describe('<Dropdown />', () => {
  it('receives props', () => {
    const wrapper = mount(<Form />);
    console.log(wrapper)
    expect(wrapper.find(Dropdown)).toHaveProp('options')
  })
})
