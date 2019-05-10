import React from 'react';
import Header from '../components/Header';
import Dropdown from '../components/Dropdown';
import InputField from '../components/InputField';
import TextArea from '../components/TextArea';
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';
import Message from '../components/Message'

const HOST = 'http://localhost:49567'
const responses = [
  {code: 201, message: "Your assistance request has been successfully submitted.", type: 'success'},
  {code: 401, message: "Sorry, you are not authorized to make this request.", type: 'info'},
  {code: 500, message: "Oh no! Something completely unexpected happened!", type: 'warning'},
  {code: 503, message: "We're down!!!!!! Come back later.....(please)", type: 'danger'}
]

export default class Form extends React.Component {

  state = {
    serviceTypes: [],
    firstName: '',
    lastName: '',
    emailAddress: '',
    serviceSelected: null,
    description: '',
    termsAccepted: false,
    hidden: false,
    message: '',
  }

  // update state with service objects from docker api
  componentDidMount() {
    fetch(`${HOST}/api/service-types`)
    .then( resp => resp.json())
    .then( resp => { this.setState({ serviceTypes: resp.data }) })
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

  handleFormSubmit = (e) => {
    e.preventDefault()
    fetch(`${HOST}/api/assistance-requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "assistance_request": {
          "contact": {
            "first_name": this.state.firstName,
            "last_name": this.state.lastName,
            "email": this.state.emailAddress
          },
          "service_type": this.state.serviceSelected,
          "description": this.state.description
        }
      })
    })
    .then( resp => resp.json())
    .then( resp => {
      const message = responses[Math.floor(Math.random() * responses.length)]
      this.setState({
        message,
        hidden: !this.state.hidden
      })
    })
  }

  // handling button click on error message
  handleReturn = () => {
    this.setState({ hidden: !this.state.hidden })
  }

  render() {
    const terms = 'I hereby accept the terms of service for THE NETWORK and Privacy Policy.'
    const style = { width: '60vw', margin: 'auto', marginBottom: '3vh' }

    return (
      <div className='container' style={{display: 'table', width: '60vw'}} >
        <div hidden={this.state.hidden}>
          <Header content="New Assistance Request"/>
          <InputField placeholder='First Name' id='firstName' input={this.state.firstName} onChange={this.handleInputChange} style={style}/>
          <InputField placeholder='Last Name' id='lastName' input={this.state.lastName} onChange={this.handleInputChange} style={style}/>
          <InputField placeholder='Email Address' id='emailAddress' input={this.state.emailAddress} onChange={this.handleInputChange} style={style}/>
          <TextArea placeholder='Description' id='description' description={this.state.description} onChange={this.handleInputChange} style={style}/>
          <Dropdown
            placeholder='Select Service Type'
            options={this.state.serviceTypes}
            selected={this.state.selected}
            onSelect={this.handleServiceSelect}
            style={style}
          />
          <Checkbox placeholder={terms} onClick={this.handleTermsClick}/>
          <Button label='Get Assitance' onClick={this.handleFormSubmit}/>
        </div>
        <div style={{marginTop: '10vh'}}>
          <Message hidden={!this.state.hidden} message={this.state.message} handleReturn={this.handleReturn}/>
        </div>
      </div>
    )
  }
}
