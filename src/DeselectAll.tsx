import React, { Component, FunctionComponent, ReactNode } from 'react'

import { SelectableGroupContext } from './SelectableGroup.context'

type TDeselectAllProps = {
  children: ReactNode
  component?: string | FunctionComponent
  className?: string
  [key: string]: any
}

export class DeselectAll extends Component<TDeselectAllProps> {
  static contextType = SelectableGroupContext

  root: HTMLDivElement | null = null

  componentDidMount() {
    this.root!.addEventListener('mousedown', (evt: Event) => evt.stopPropagation())
  }

  getRootRef = (ref: HTMLDivElement | null) => {
    this.root = ref
  }

  render() {
    const { component = 'div', children, className, ...rest } = this.props
    const ButtonComponent = component as FunctionComponent<any>

    return (
      <ButtonComponent
        ref={this.getRootRef}
        className={`selectable-select-all ${className}`}
        onClick={this.context.selectable.clearSelection}
        {...rest}
      >
        {children}
      </ButtonComponent>
    )
  }
}
