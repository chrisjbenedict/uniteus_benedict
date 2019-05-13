import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Form from './containers/Form';
import Header from './components/Header';
import Dropdown from './components/Dropdown';
import TextArea from './components/TextArea';
import FormErrors from './components/FormErrors';
import Checkbox from './components/Checkbox';
import Button from './components/Button';
import { configure, shallow, mount } from 'enzyme';
import 'jest-enzyme';
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
    const wrapper = shallow(<Form />);
    expect(wrapper).toHaveLength(1);
  })
  it('hasState', () => {
    const wrapper = mount(<Form />);
    expect(wrapper).toHaveState('serviceTypes')
  })
  it('has 3 input fields', () => {
    const wrapper = mount(<Form />);
    expect(wrapper).toContainMatchingElements(3, 'InputField');
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

describe('<TextArea />', () => {
  it('receives props', () => {
    const wrapper = mount(<Form />);
    expect(wrapper.find(TextArea)).toHaveProp('onChange')
  })
})

describe('<Dropdown />', () => {
  it('receives props', () => {
    const wrapper = mount(<Form />);
    expect(wrapper.find(Dropdown)).toHaveProp('options')
    expect(wrapper.find(Dropdown)).toHaveProp('selected')
    expect(wrapper.find(Dropdown)).toHaveProp('onSelect')
  })
})

describe('<FormErrors />', () => {
  it('receives props', () => {
    const wrapper = mount(<Form />);
    expect(wrapper.find(FormErrors)).toHaveProp('formErrors')
  })
})

describe('<Checkbox />', () => {
  it('is not checked', () => {
    const wrapper = mount(<Form />);
    expect(wrapper.find('#terms')).not.toBeChecked();
  })
})
