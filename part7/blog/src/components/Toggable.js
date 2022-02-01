import React, { useState, useImperativeHandle, forwardRef } from 'react'

var Toggable = (props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return(
    <div id="toggable">
      {/*visible === false ? <button onClick={toggleVisibility}>{props.buttonLabel}</button> : show()*/}
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

Toggable = forwardRef(Toggable)

export default Toggable