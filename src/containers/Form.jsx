import React from 'react';
import Header from '../components/Header'
import Dropdown from '../components/Dropdown'
import InputField from '../components/InputField'

export default class Form extends React.Component {

  state = {
    serviceTypes: [],
    selected: false,
    firstName: 'First Name',
    lastName: 'Last Name',
    emailAddress: 'Email Address',
    serviceSelected: null
  }

  // update state with service objects from docker api
  componentDidMount() {
    fetch('http://localhost:49567/api/service-types')
    .then( resp => resp.json())
    .then( resp => {
      this.setState({ serviceTypes: resp.data })
    })
  }

  handleInputChange = (e) => {
    e.preventDefault()
    this.setState({ [e.target.id]: e.target.value})
  }

  // update serviceSelected from dropdown menu
  handleServiceSelect = (e) => {
    e.preventDefault()
    this.setState({ serviceSelected: e.target.value})
  }

  render() {
    return (
      <div className='container' style={{display: 'table'}}>
        <Header content="New Assistance Request"/>
        <InputField text={this.state.firstName} id='firstName' onChange={this.handleInputChange} />
        <InputField text={this.state.lastName} id='lastName' onChange={this.handleInputChange} />
        <InputField text={this.state.emailAddress} id='emailAddress' onChange={this.handleInputChange} />
        <Dropdown
          placeholder='Select Service Type'
          options={this.state.serviceTypes}
          selected={this.state.selected}
          onSelect={this.handleServiceSelect}
        />
      </div>
    )
  }
}
