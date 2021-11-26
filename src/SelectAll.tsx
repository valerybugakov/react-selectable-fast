import React, { Component, ReactNode, FunctionComponent } from 'react'

import { SelectableGroupContext } from './SelectableGroup.context'

type TSelectAllProps = {
  children: ReactNode
  component?: string | FunctionComponent
  className?: string
  [key: string]: any
}

export class SelectAll extends Component<TSelectAllProps> {
  static contextType = SelectableGroupContext

  root: HTMLDivElement | null = null

  componentDidMount() {
    this.root!.addEventListener('mousedown', (evt: Event) => evt.stopPropagation())
  }

  getRootRef = (ref: HTMLDivElement | null) => {
    this.root = ref
  }

  render() {
    const { component = 'div', children, className = '', ...rest } = this.props
    const ButtonComponent = component as FunctionComponent<any>

    return (
      <ButtonComponent
        ref={this.getRootRef}
        className={`selectable-select-all ${className}`}
        onClick={this.context.selectable.selectAll}
        {...rest}
      >
        {children}
      </ButtonComponent>
    )
  }
}
