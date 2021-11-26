import React from 'react'

type TLabelProps = {
  isSelecting: boolean
  isSelected: boolean
}

export function Label(props: TLabelProps) {
  const { isSelecting, isSelected } = props

  return (
    <div className="card-label">
      Selecting: <span>{`${isSelecting}`}</span>
      <br />
      Selected: <span>{`${isSelected}`}</span>
    </div>
  )
}
