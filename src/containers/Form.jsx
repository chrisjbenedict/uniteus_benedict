import React from 'react';
import Header from '../components/Header';
import Dropdown from '../components/Dropdown';
import InputField from '../components/InputField';
import TextArea from '../components/TextArea';
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';

export default class Form extends React.Component {

  state = {
    serviceTypes: [],
    selected: false,
    firstName: 'First Name',
    lastName: 'Last Name',
    emailAddress: 'Email Address',
    serviceSelected: null,
    description: 'Description',
    termsAccepted: false
  }

  // update state with service objects from docker api
  componentDidMount() {
    fetch('http://localhost:49567/api/service-types')
    .then( resp => resp.json())
    .then( resp => {
      this.setState({ serviceTypes: resp.data })
    })
  }

  // update First Name, Last Name, Email Address state from input field
  handleInputChange = (e) => {
    e.preventDefault()
    this.setState({ [e.target.id]: e.target.value})
  }

  // update serviceSelected from dropdown menu
  handleServiceSelect = (e) => {
    e.preventDefault()
    this.setState({ serviceSelected: e.target.value })
  }

  // toggle agreement of terms
  handleTermsClick = () => {
    this.setState({ termsAccepted: !this.state.termsAccepted })
  }

  handleFormSubmit = () => {
    console.log('submit')
  }

  render() {
    const terms = 'I hereby accept the terms of service for THE NETWORK and Privacy Policy.'
    const style = { width: '60vw', margin: 'auto', marginBottom: '3vh' }

    return (
      <div className='container' style={{display: 'table', width: '60vw'}}>
        <Header content="New Assistance Request"/>
        <InputField placeholder={this.state.firstName} id='firstName' onChange={this.handleInputChange} style={style}/>
        <InputField placeholder={this.state.lastName} id='lastName' onChange={this.handleInputChange} style={style}/>
        <InputField placeholder={this.state.emailAddress} id='emailAddress' onChange={this.handleInputChange} style={style}/>
        <TextArea placeholder={this.state.description} id='description' onChange={this.handleInputChange} style={style}/>
        <Dropdown
          placeholder='Select Service Type'
          options={this.state.serviceTypes}
          selected={this.state.selected}
          onSelect={this.handleServiceSelect}
          style={style}
        />
        <Checkbox placeholder={terms} onClick={this.handleTermsClick}/>
        <Button label='Get Assitance' onClick={this.handleFormSubmit} style={style}/>
      </div>
    )
  }
}
