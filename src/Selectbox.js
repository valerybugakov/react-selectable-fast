import React, { Component } from 'react'
import { bool, string } from 'prop-types'

class Selectbox extends Component {
  static propTypes = {
    fixedPosition: bool,
    className: string,
    disabled: bool,
  }

  static defaultProps = {
    className: 'selectable-selectbox',
  }

  state = {
    top: 0,
    left: 0,
    boxWidth: 0,
    boxHeight: 0,
    isBoxSelecting: false,
  }

  getRef = () => this.selectbox

  getSelectboxRef = c => this.selectbox = c

  render() {
    const boxStyle = {
      left: this.state.boxLeft,
      top: this.state.boxTop,
      width: this.state.boxWidth,
      height: this.state.boxHeight,
      zIndex: 9000,
      position: this.props.fixedPosition ? 'fixed' : 'absolute',
      cursor: 'default',
    }

    const disabled = this.props.disabled

    if (disabled) {
      return null
    }
    return (

      <div>
        {
          this.state.isBoxSelecting &&
          <div
            ref={this.getSelectboxRef}
            style={boxStyle}
            className={this.props.className}
          />
        }
      </div>
    )
  }
}

export default Selectbox
