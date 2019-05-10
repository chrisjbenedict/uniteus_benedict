import React from 'react';

const Header = (props) => {
  return (
    <div className='page-header'>
      <h3>{props.content}</h3>
    </div>
  )
}

export default Header
