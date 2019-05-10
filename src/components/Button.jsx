import React from 'react';

const Button = ({ label, onClick, disabled }) => {
  return(
    <div style={{position:'relative', textAlign: 'right'}} onClick={onClick}>
      <button type="button" className="btn btn-primary" disabled={disabled}>{label}</button>
    </div>
  )
}

export default Button
