import React from 'react'

import { getBoundsForNode, TComputedBounds, TGetBoundsForNodeArgs } from './utils'
import { TSelectableItemState, TSelectableItemProps } from './Selectable.types'
import { SelectableGroupContext } from './SelectableGroup.context'

type TAddedProps = Partial<Pick<TSelectableItemProps, 'isSelected'>>

export const createSelectable = <T extends any>(
  WrappedComponent: React.ComponentType<TSelectableItemProps & T>
): React.ComponentType<T & TAddedProps> =>
  class SelectableItem extends React.Component<T & TAddedProps, TSelectableItemState> {
    static contextType = SelectableGroupContext

    declare context: React.ContextType<typeof SelectableGroupContext>

    static defaultProps = {
      isSelected: false
    } as Partial<T & TAddedProps>

    state = {
      isSelected: this.props.isSelected == true,
      isSelecting: false,
    }

    node: HTMLElement | null = null

    bounds: TComputedBounds[] | null = null

    deselected = false

    registerSelectable = (containerScroll?: TGetBoundsForNodeArgs) => {
      console.log( "registerSelectable", containerScroll );
    }

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
