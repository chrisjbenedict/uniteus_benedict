import React from 'react';

const Button = ({ label, onClick }) => {
  return(
    <div style={{position:'relative', textAlign: 'right'}} onClick={onClick}>
      <button type="button" className="btn btn-primary">{label}</button>
    </div>
  )
}

export default Button
