import React, { Component, createRef } from 'react'
import { SelectableGroup } from '../src'
import Counters from './Counters'
import List from './List'

class App extends Component {
  state = {
    disableFirstRow: false,
  }

  countersRef = createRef()

  handleSelecting = selectingItems => {
    this.countersRef.current.handleSelecting(selectingItems)
  }

  handleSelectionFinish = selectedItems => {
    this.countersRef.current.handleSelectionFinish(selectedItems)
  }

  handleSelectionClear() {
    console.log('Cancel selection') // eslint-disable-line no-console
  }

  toggleFirstRow = () => {
    this.setState({ disableFirstRow: !this.state.disableFirstRow })
  }

  toggleOrder = () => {
    this.setState({ reversed: !this.state.reversed })
  }

  render() {
    const { items } = this.props
    const { disableFirstRow, reversed } = this.state

    const itemsToRender = disableFirstRow ? items.slice(5) : items
    const orderedItems = reversed ? itemsToRender.slice().reverse() : itemsToRender

    return (
      <div>
        <Counters ref={this.countersRef} />
        <button onClick={this.toggleFirstRow}>Toggle first row</button>
        <button onClick={this.toggleOrder}>Toggle order</button>
        <div className="wrapper">
          <SelectableGroup
            contain
            selectablesContainer=".albums"
            scrollContainer=".wrapper"
            ref={ref => (window.selectableGroup = ref)}
            className="main"
            clickClassName="tick"
            enableDeselect
            tolerance={0}
            deselectOnEsc={false}
            allowClickWithoutSelected={false}
            duringSelection={this.handleSelecting}
            onSelectionClear={this.handleSelectionClear}
            onSelectionFinish={this.handleSelectionFinish}
            ignoreList={['.not-selectable']}
          >
            <List items={orderedItems} />
          </SelectableGroup>
        </div>
      </div>
    )
  }
}

export default App
