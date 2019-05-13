import React from 'react';

const Dropdown = ({ options, onSelect, placeholder, style, hidden }) => {
  return (
    <div>
    <select style={style} onChange={onSelect}>
      <option defaultValue>{placeholder}</option>
      {options.map(option => {
        return (
          <option key={option.id} value={option.id} >
            {option.display_name}
          </option>
        )
      })}
    </select>
    <p hidden={hidden} style={{textAlign: 'right', color: 'red'}}>required</p>
    </div>
  )
}

export default Dropdown
