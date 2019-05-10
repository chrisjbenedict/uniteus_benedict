import React from 'react'

const InputField = ({ placeholder, onChange, id, style, input }) => {
  return(
    <div onChange={onChange} className="input-group mb-3" style={style}>
      <input
        type="text"
        className="form-control"
        aria-label="Default"
        aria-describedby="inputGroup-sizing-default"
        placeholder={!input ? placeholder : input}
        id={id}
        required
      />
    </div>
  )
}

export default InputField
