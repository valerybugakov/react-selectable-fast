import React, { Component } from 'react'

export class Counters extends Component {
  state = {
    selectedItems: [],
    selectingItems: [],
  }

  handleSelecting = selectingItems => {
    if (selectingItems.length !== this.state.selectingItems.length) {
      this.setState({ selectingItems })
    }
  }

  handleSelectionFinish = selectedItems => {
    this.setState({
      selectedItems,
      selectingItems: [],
    })

    console.log(`Finished selection ${selectedItems.length}`)
  }

  render() {
    const { selectedItems, selectingItems } = this.state

    return (
      <p>
        Selecting: <span className="counter">{selectingItems.length}</span>
        <br />
        Selected: <span className="counter">{selectedItems.length}</span>
        <br />
      </p>
    )
  }
}
