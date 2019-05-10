import React from 'react'

const InputField = ({ text, onChange, id }) => {
  return(
    <div onChange={onChange} className="input-group mb-3" style={{width: '90vw', margin: '3vh'}}>
      <input
        type="text"
        className="form-control"
        aria-label="Default"
        aria-describedby="inputGroup-sizing-default"
        placeholder={text}
        id={id}
      />
    </div>
  )
}

export default InputField
