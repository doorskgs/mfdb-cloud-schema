import React, { Fragment, useState } from 'react'

function clipboard_copy(str) {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

/**
 * An readonly input box that copies its value
 * @param {value to copy} param0 
 * @returns React Component
 */
export function CopyBox({ value }) {
  const [showElement, setShowElement] = useState(false);

  const copy_and_flash = () => {
    clipboard_copy(value);

    // flash copied message
    setShowElement(true);
    setTimeout(function() {
      setShowElement(false);
    }, 1200);
  };

  return <Fragment>
    <input type="text" className='form-control pointer form-control-sm position-relative' readOnly value={value} onFocus={copy_and_flash} />
    { showElement && (
      <span className="position-fixed translate-middle flash-badge badge badge-sm rounded-pill bg-danger">copied!</span>
    ) }
  </Fragment>
}


/**
 * An button that copies its value
 * @param {value to copy} param0 
 * @returns React Component
 */
 export function CopyBtn({ value }) {
  const [showElement, setShowElement] = useState(false);

  const copy_and_flash = () => {
    clipboard_copy(value);

    // flash copied message
    setShowElement(true);
    setTimeout(function() {
      setShowElement(false);
    }, 1200);
  };

  return <Fragment>
    <button className='btn btn-white pointer' onClick={copy_and_flash} >
      <i className='ra ra-copy-regular'></i>
    </button>
    { showElement && (
      <span className="position-fixed translate-middle flash-badge badge badge-sm rounded-pill bg-danger">copied!</span>
    ) }
  </Fragment>
}
