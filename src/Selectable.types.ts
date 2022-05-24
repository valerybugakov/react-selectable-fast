import { Maybe, TComputedBounds, TGetBoundsForNodeArgs } from './utils'

type TSelectableContext = {
  register(selectableItem: TSelectableItem): void
  unregister(selectableItem: TSelectableItem): void
  selectAll(): void
  clearSelection(): void
  getScrolledContainer(): Maybe<HTMLElement>
}

type TSelectableGroupContext = {
  selectable: TSelectableContext
}

type TSelectableItemState = {
  isSelected: boolean
  isSelecting: boolean
}

type TSelectableItem = {
  updateBounds(containerScroll?: TGetBoundsForNodeArgs): void
  registerSelectable(containerScroll?: TGetBoundsForNodeArgs): void
  setState(state: any): void
  state: TSelectableItemState
  deselected: boolean
  node: Maybe<HTMLElement>
  bounds: Maybe<TComputedBounds[]>
}

type TSelectableItemProps = TSelectableItemState & {
  selectableRef(node: HTMLElement | null): void
}

export { TSelectableGroupContext, TSelectableItemState, TSelectableItem, TSelectableItemProps }