import React from 'react';
import Button from './Button'

const Message = ({ hidden, message, handleReturn }) => {

  return (
    <div className="alert alert-" role="alert" hidden={hidden}>
      <h4 className="alert-heading">{message.message === "Your assistance request has been successfully submitted." ? "Success!" : "Error!"}</h4>
      <p>{message.message}</p>
      <hr/>
      <Button id="Back" onClick={handleReturn}/>
    </div>
  )
}

export default Message
