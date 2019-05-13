import React from 'react'

const InputField = ({ placeholder, onChange, id, style, input, hidden }) => {
  return(
    <div onChange={onChange} className="input-group mb-3" style={style}>
      <input
        type="text"
        className="form-control"
        aria-label="Default"
        aria-describedby="inputGroup-sizing-default"
        placeholder={!input ? placeholder : input}
        id={id}
      />
      <p hidden={hidden} style={{textAlign: 'right', color: 'red'}}>required</p>
    </div>
  )
}

export default InputField
