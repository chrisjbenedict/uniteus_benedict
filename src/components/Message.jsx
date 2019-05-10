import React from 'react';
import Button from './Button'

const Message = ({ hidden, message, handleReturn }) => {

  return (
    <div className={"alert alert-" + message.type} role="alert" hidden={hidden}>
      <h4 className="alert-heading">{message.code === 201 ? "Success" : "Error"} {+ message.code + "!" }</h4>
      <p>{message.message}</p>
      <hr/>
      <Button label="Back" onClick={handleReturn}/>
    </div>
  )
}

export default Message
