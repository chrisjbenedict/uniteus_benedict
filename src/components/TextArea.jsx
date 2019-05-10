import React from 'react';

const TextArea = ({ placeholder, onChange, id, style }) => {
  return (
    <div onChange={onChange} className="form-group" style={style}>
     <textarea id={id} className="form-control" rows="6" placeholder={placeholder}></textarea>
   </div>
  )
}

export default TextArea
