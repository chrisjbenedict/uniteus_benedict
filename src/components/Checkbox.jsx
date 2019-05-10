import React from 'react';

const Checkbox = ({ placeholder, onClick }) => {
  return (
    <div className="input-group mb-3" style={{display: 'inline block', margin: 'left'}}>
      <div className="input-group-prepend">
        <div className="input-group-text">
          <p>
            <input onClick={onClick} type="checkbox" aria-label="Checkbox for following text input" style={{marginRight: '2vw'}}/>
             {placeholder}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Checkbox
