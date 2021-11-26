import React from 'react'

import { createSelectable, TSelectableItemProps } from '../../src'
import { Label } from './Label'

type TAlbumProps = {
  player: string
  year: number
}

const DISABLED_CARD_YEARS = [10, 22, 27, 54, 82, 105, 150]

export const Card = createSelectable<TAlbumProps>((props: TSelectableItemProps & TAlbumProps) => {
  const { selectableRef, isSelected, isSelecting, player, year } = props

  const classNames = [
    'item',
    DISABLED_CARD_YEARS.includes(year) && 'not-selectable',
    isSelecting && 'selecting',
    isSelected && 'selected',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div ref={selectableRef} className={classNames}>
      <div className="tick">+</div>
      <h2>{player}</h2>
      <small>{year}</small>
      <Label isSelected={isSelected} isSelecting={isSelecting} />
    </div>
  )
})
