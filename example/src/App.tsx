import React, { createRef, Component } from 'react'

import { TAlbumItem } from './sample-data'
import { SelectableGroup } from '../../src'
import { Counters } from './Counters'
import { List } from './List'

type TAppProps = {
  items: TAlbumItem[]
}

type TAppState = {
  disableFirstRow: boolean
  reversed: boolean
  showSelectableGroup: boolean
}

class App extends Component<TAppProps, TAppState> {
  state = {
    disableFirstRow: false,
    reversed: false,
    showSelectableGroup: true,
  }

  countersRef = createRef<Counters>()

  getSelectableGroupRef = (ref: SelectableGroup | null) => {
    ;(window as any).selectableGroup = ref
  }

  toggleFirstRow = () => {
    this.setState(state => ({ disableFirstRow: !state.disableFirstRow }))
  }

  toggleOrder = () => {
    this.setState(state => ({ reversed: !state.reversed }))
  }

  toggleSelectableGroup = () => {
    this.setState(state => ({
      showSelectableGroup: !state.showSelectableGroup,
    }))
  }

  handleSelecting = (selectingItems: TAlbumItem) => {
    this.countersRef.current.handleSelecting(selectingItems)
  }

  handleSelectionFinish = selectedItems => {
    console.log('Handle selection finish', selectedItems.length)
    this.countersRef.current.handleSelectionFinish(selectedItems)
  }

  handleSelectedItemUnmount = (_unmountedItem, selectedItems) => {
    console.log('hadneleSelectedItemUnmount')
    this.countersRef.current.handleSelectionFinish(selectedItems)
  }

  handleSelectionClear() {
    console.log('Cancel selection')
  }

  render() {
    const { items } = this.props
    const { disableFirstRow, reversed, showSelectableGroup } = this.state

    const itemsToRender = disableFirstRow ? items.slice(5) : items
    const orderedItems = reversed ? itemsToRender.slice().reverse() : itemsToRender

    return (
      <div>
        <Counters ref={this.countersRef} />
        <button className="btn" type="button" onClick={this.toggleFirstRow}>
          Toggle first row
        </button>
        <button className="btn" type="button" onClick={this.toggleOrder}>
          Toggle order
        </button>
        <button className="btn" type="button" onClick={this.toggleSelectableGroup}>
          Toggle group
        </button>
        {showSelectableGroup && (
          <SelectableGroup
            ref={this.getSelectableGroupRef}
            className="main"
            clickClassName="tick"
            enableDeselect={true}
            tolerance={0}
            deselectOnEsc={true}
            allowClickWithoutSelected={false}
            duringSelection={this.handleSelecting}
            onSelectionClear={this.handleSelectionClear}
            onSelectionFinish={this.handleSelectionFinish}
            onSelectedItemUnmount={this.handleSelectedItemUnmount}
            ignoreList={['.not-selectable']}
          >
            <List items={orderedItems} />
          </SelectableGroup>
        )}
      </div>
    )
  }
}

export default App
