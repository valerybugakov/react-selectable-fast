import React, { Component } from 'react'
import { node, elementType } from 'prop-types'

import SelectableGroupContext from './Context'

class SelectAllButton extends Component {
  static contextType = SelectableGroupContext

  static propTypes = {
    children: node,
    component: elementType,
  }

  static defaultProps = {
    component: 'div',
  }

  componentDidMount() {
    this.root.addEventListener('mousedown', e => e.stopPropagation())
  }

  getRootRef = c => (this.root = c)

  render() {
    const { children, className, ...rest } = this.props

    return (
      <this.props.component
        ref={this.getRootRef}
        className={`selectable-select-all ${className}`}
        onClick={this.context.selectable.selectAll}
        {...rest}
      >
        {children}
      </this.props.component>
    )
  }
}

export default SelectAllButton
