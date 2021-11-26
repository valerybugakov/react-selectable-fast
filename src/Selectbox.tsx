import React, { useState, useEffect, CSSProperties } from 'react'

export type TSetSelectboxState = React.Dispatch<React.SetStateAction<TSelectboxState>>

export type TSelectboxProps = {
  fixedPosition: boolean
  className: string
  getSetState(setState: TSetSelectboxState): void
}

export type TSelectboxState = {
  y: number
  x: number
  width: number
  height: number
}

const initialState: TSelectboxState = {
  y: 0,
  x: 0,
  width: 0,
  height: 0,
}

export function Selectbox(props: TSelectboxProps) {
  const { fixedPosition, getSetState, className } = props
  const [state, setState] = useState(initialState)

  useEffect(() => {
    getSetState(setState)
  }, [])

  const boxStyle: CSSProperties = {
    left: state.x,
    top: state.y,
    width: state.width,
    height: state.height,
    zIndex: 9000,
    position: fixedPosition ? 'fixed' : 'absolute',
    cursor: 'default',
    willChange: 'transform',
    transform: 'translateZ(0)',
  }

  return <div className={className} style={boxStyle} />
}

Selectbox.defaultProps = {
  className: 'selectable-selectbox',
}
