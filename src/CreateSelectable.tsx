import React, { Component, ComponentType } from 'react'

import { getBoundsForNode, TComputedBounds, TGetBoundsForNodeArgs } from './utils'
import { TSelectableItemState, TSelectableItemProps } from './Selectable.types'
import { SelectableGroupContext } from './SelectableGroup.context'

type TAddedProps = Partial<Pick<TSelectableItemProps, 'isSelected'>>

export const createSelectable = <T extends any>(
  WrappedComponent: ComponentType<TSelectableItemProps & T>
): ComponentType<T & TAddedProps> =>
  class SelectableItem extends Component<T & TAddedProps, TSelectableItemState> {
    static contextType = SelectableGroupContext

    static defaultProps = {
      isSelected: false,
    }

    state = {
      isSelected: this.props.isSelected,
      isSelecting: false,
    }

    node: HTMLElement | null = null

    bounds: TComputedBounds[] | null = null

    componentDidMount() {
      this.updateBounds()
      this.context.selectable.register(this)
    }

    componentWillUnmount() {
      this.context.selectable.unregister(this)
    }

    updateBounds = (containerScroll?: TGetBoundsForNodeArgs) => {
      this.bounds = getBoundsForNode(this.node!, containerScroll)
    }

    getSelectableRef = (ref: HTMLElement | null) => {
      this.node = ref
    }

    render() {
      return (
        <WrappedComponent {...this.props} {...this.state} selectableRef={this.getSelectableRef} />
      )
    }
  }
