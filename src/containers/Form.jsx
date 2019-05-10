import React from 'react';

export default class Form extends React.Component {

  state = {
    serviceTypes: []
  }

  componentDidMount() {
    fetch('http://localhost:49567/api/service-types')
    .then( resp => resp.json())
    .then( resp => {
      this.setState({ serviceTypes: resp }, () => console.log('service types:', this.state.serviceTypes))
    })
  }

  render() {
    return (
      <div>
        I'm da form
      </div>
    )
  }
}
