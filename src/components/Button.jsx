import React from 'react';

const Button = ({ id, onClick, disabled }) => {
  return(
    <div style={{position:'relative', textAlign: 'right'}} onClick={onClick}>
      <button id={id} type="button" className="btn btn-primary" disabled={disabled}>{id}</button>
    </div>
  )
}

export default Button
