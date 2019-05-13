import React from 'react';

const TextArea = ({ placeholder, onChange, id, style, description }) => {
  return (
    <div onChange={onChange} className="form-group" style={style}>
     <textarea id={id} className="form-control" rows="8" placeholder={!description ? placeholder : description}></textarea>
   </div>
  )
}

export default TextArea
