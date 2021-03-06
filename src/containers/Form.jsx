import React from 'react';
import Header from '../components/Header';
import Dropdown from '../components/Dropdown';
import InputField from '../components/InputField';
import TextArea from '../components/TextArea';
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';
import Message from '../components/Message';
import FormErrors from '../components/FormErrors'

const HOST = 'http://localhost:49567'

export default class Form extends React.Component {

  state = {
    serviceTypes: [],
    successfulRequests: [],
    hidden: false,
    message: '',
    request: {
      firstName: '',
      lastName: '',
      emailAddress: '',
      serviceSelected: '',
      description: '',
      termsAccepted: false,
    },
    formErrors: {
      firstName: '',
      lastName: '',
      email: '',
      description: '',
      service: '',
      terms: false
    },
    firstNameRequired: false,
    lastNameRequired: false,
    emailRequired: false,
    serviceRequired: false,
    firstNameValid: false,
    lastNameValid: false,
    emailValid: false,
    descriptionValid: false,
    serviceValid: false,
    termsValid: false,
    formValid: false
  }

  // update state with service objects from docker api
  componentDidMount() {
    fetch(`${HOST}/api/service-types`)
    .then( resp => resp.json())
    .then( resp => { this.setState({ serviceTypes: resp.data }) })
  }

  // update First Name, Last Name, Email Address state from input field and validate
  handleInputChange = (e) => {
    const name = e.target.id
    const value = e.target.value
    e.preventDefault()
    this.setState({ request: {...this.state.request, [name]: value }},
      () => this.validateField(name, value)
    )
  }

  // update serviceSelected from dropdown menu and validate
  handleServiceSelect = (e) => {
    e.persist()
    this.setState({ request: {...this.state.request, serviceSelected: e.target.value }},
      () => this.validateField('serviceSelected', e.target.value)
    )
  }

  // toggle agreement of terms and validate
  handleTermsClick = () => {
    this.setState({ request: {...this.state.request, termsAccepted: !this.state.request.termsAccepted }},
      () => this.validateField('termsAccepted', this.state.request.termsAccepted)
    )
  }

  // handles POST request to API
  handleFormSubmit = (e) => {
    e.preventDefault()
    // if the request is unique
    if (!this.state.successfulRequests.includes(this.state.request)) {
      fetch(`${HOST}/api/assistance-requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          assistance_request: {
            contact: {
              first_name: this.state.request.firstName,
              last_name: this.state.request.lastName,
              email: this.state.request.emailAddress
            },
            service_type: this.state.request.serviceSelected,
            description: this.state.request.description
          }
        })
      })
      .then( response => response.json())
      .then( response => {
          // if a response is successful, add it to the successfulRequests array
          if (response.message === "Your assistance request has been successfully submitted.") {
            this.setState({
              successfulRequests: [...this.state.successfulRequests, this.state.request]
            }, () => console.log('successful', this.state.successfulRequests))
          }
          // if the request is not successful, update error message
          this.setState({
            message: response,
            hidden: !this.state.hidden,
          })
        })
      } else {
        // if the request is not unique
        const response = { message: "You have already made this request. Please make a new request." }
        this.setState({
          message: response,
          hidden: !this.state.hidden
        })
      }
  }

  // takes in a field name and it's value
  validateField = (fieldName, value) => {
    let fieldValidationErrors = this.state.formErrors;
    let firstNameValid = this.state.firstNameValid;
    let lastNameValid = this.state.lastNameValid;
    let emailValid = this.state.emailValid;
    let descriptionValid = this.state.descriptionValid;
    let serviceValid = this.state.serviceValid;
    let termsValid = this.state.termsValid;

    let firstNameRequired = this.state.firstNameRequired;
    let lastNameRequired = this.state.lastNameRequired;
    let emailRequired = this.state.emailRequired
    let serviceRequired = this.state.serviceRequired

    // for each case, check validity requirements. If invalid (false), show message
    // option to show message or 'required'
    switch(fieldName) {
      case 'firstName':
        firstNameValid = value.length > 0;
        fieldValidationErrors.firstName = firstNameValid ? firstNameRequired = false : firstNameRequired = true;
        // fieldValidationErrors.firstName = firstNameValid ? '' : 'Please enter your first name.';
        break;
      case 'lastName':
        lastNameValid = value.length > 0
        fieldValidationErrors.lastName = lastNameValid ? lastNameRequired = false : lastNameRequired = true;
        // fieldValidationErrors.lastName = lastNameValid ? '' : 'Please enter your last name.';
        break;
      case 'emailAddress':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? emailRequired = false : emailRequired = true;
        // fieldValidationErrors.email = emailValid ? '' : 'Please enter a valid email address.';
        break;
      case 'description':
        descriptionValid = value.length > 0
        fieldValidationErrors.description = descriptionValid ? '' : 'Please provide a description of your request.'
        break;
      case 'serviceSelected':
        serviceValid = value !== 'Select Service Type';
        fieldValidationErrors.service = serviceValid ? serviceRequired = false : serviceRequired = true;
        // fieldValidationErrors.service = serviceValid ? '' : 'Please select a service type.';
        break;
      case 'termsAccepted':
        termsValid = value === true
        fieldValidationErrors.terms = termsValid ? '' : 'Please accept the terms of service.';
        break;
      default:
        break;
    }
    // update "valid" states and validate.
    this.setState({
      formErrors: fieldValidationErrors,
      firstNameValid,
      lastNameValid,
      emailValid,
      descriptionValid,
      serviceValid,
      termsValid,
      firstNameRequired,
      lastNameRequired,
      emailRequired,
      serviceRequired
    }, this.validateForm)
  }
  //  formValid = true if every field is true (valid)
  validateForm = () => {
    this.setState({
      formValid: this.state.firstNameValid &&
      this.state.lastNameValid &&
      this.state.emailValid &&
      this.state.descriptionValid &&
      this.state.serviceValid &&
      this.state.termsValid
    })
  }


  // handling button click on error message
  handleBackButton = () => {
    this.setState({ hidden: !this.state.hidden })
  }

  render() {
    const terms = 'I hereby accept the terms of service for THE NETWORK and Privacy Policy.'
    const style = { width: '60vw', margin: 'auto', marginBottom: '3vh' }

    return (
      <div className='container' style={{display: 'table', width: '60vw'}} >
        <div hidden={this.state.hidden}>
          <Header
            content="New Assistance Request"
          />
          <FormErrors
            formErrors={this.state.formErrors}
          />
          <InputField
            placeholder='First Name'
            id='firstName'
            input={this.state.firstName}
            onChange={this.handleInputChange}
            style={style}
            hidden={!this.state.firstNameRequired}
          />
          <InputField
            placeholder='Last Name'
            id='lastName'
            input={this.state.lastName}
            onChange={this.handleInputChange}
            style={style}
            hidden={!this.state.lastNameRequired}
          />
          <InputField
            placeholder='Email Address'
            id='emailAddress'
            input={this.state.emailAddress}
            onChange={this.handleInputChange}
            style={style}
            hidden={!this.state.emailRequired}
          />
          <Dropdown
            placeholder='Select Service Type'
            options={this.state.serviceTypes}
            selected={this.state.selected}
            onSelect={this.handleServiceSelect}
            style={style}
            hidden={!this.state.serviceRequired}
          />
          <TextArea
            placeholder='Description'
            id='description'
            description={this.state.description}
            onChange={this.handleInputChange}
            style={style}
          />
          <Checkbox
            placeholder={terms}
            onClick={this.handleTermsClick}
          />
          <Button
            id='Get Assistance'
            onClick={this.handleFormSubmit}
            disabled={!this.state.formValid}
          />
        </div>
        <div style={{marginTop: '10vh'}}>
          <Message
            hidden={!this.state.hidden}
            message={this.state.message}
            handleReturn={this.handleBackButton}
          />
        </div>
      </div>
    )
  }
}
