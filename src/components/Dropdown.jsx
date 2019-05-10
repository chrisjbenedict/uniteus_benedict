import React from 'react';

const Dropdown = ({ options, onSelect, placeholder, style }) => {
  return (
    <select style={style} onChange={onSelect}>
      <option defaultValue>{placeholder}</option>
      {options.map(option => {
        return (
          <option
            key={option.id}
            value={option.id}
          >
            {option.display_name}
          </option>
        )
      })}
    </select>
  )
}

export default Dropdown
