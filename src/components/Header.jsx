import React from 'react';

const Header = (props) => {
  return (
    <div style={{textAlign: 'left', width: '60vw', margin: 'auto'}}>
    <div className='page-header'>
        <h3>{props.content}</h3>
    </div>
    </div>
  )
}

export default Header
