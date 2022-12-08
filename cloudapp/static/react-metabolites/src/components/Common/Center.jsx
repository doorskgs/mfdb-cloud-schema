import React from 'react'

export function Center(props) {
  return <div className="d-flex align-items-center justify-content-center vh-100">
    <div className='text-center'>
      {props.children}
    </div>
  </div>
}
