import React from 'react';

const Dropdown = ({ options, selected, onSelect, placeholder }) => {
  return (
    <select style={{display: 'table-cell', width: '90vw'}} onChange={onSelect}>
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
