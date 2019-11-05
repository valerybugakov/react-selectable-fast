import React, { Component, MouseEvent } from 'react'
import { ReactComponentLike } from 'prop-types'

import {
  castTouchToMouseEvent,
  detectMouseButton,
  doObjectsCollide,
  getBoundsForNode,
  isNodeInRoot,
  noop,
  Maybe,
  TComputedBounds
} from './utils'
import { TSelectableItem } from './Selectable.types'
import SelectableGroupContext from './Context'
import Selectbox from './Selectbox'

type TSelectItemsOptions = {
  isFromClick?: boolean
}

type TMouseDownData = {
  selectboxY: number
  selectboxX: number
  target: HTMLElement | null
}

type TProcessItemOptions = TSelectItemsOptions & {
  item: TSelectableItem
  tolerance: number
  selectboxBounds: TComputedBounds
  enableDeselect: boolean
  mixedDeselect: boolean
}

export type TSelectableGroupProps = {
  globalMouse?: boolean
  ignoreList?: string[]
  disableSelectStartList?: string[]
  scrollSpeed?: number
  minimumSpeedFactor?: number
  allowClickWithoutSelected?: boolean
  className?: string
  clickClassName?: string
  selectboxClassName?: string
  style?: object
  selectionModeClass?: string
  onSelectionClear?: Function
  enableDeselect?: boolean
  mixedDeselect?: boolean
  deselectOnEsc?: boolean
  resetOnStart?: boolean
  disabled?: boolean
  delta?: number
  /**
   * Scroll container selector
   */
  scrollContainer?: string

  /**
   * Event that will fire rapidly during selection (while the selector is
   * being dragged). Passes an array of keys.
   */
  duringSelection?: Function

  /**
   * Event that will fire when items are selected. Passes an array of keys.
   */
  onSelectionFinish?: Function

  /**
   * The component that will represent the Selectable DOM node
   */
  component?: ReactComponentLike

  /**
   * Amount of forgiveness an item will offer to the selectbox before registering
   * a selection, i.e. if only 1px of the item is in the selection, it shouldn't be
   * included.
   */
  tolerance?: number

  /**
   * In some cases, it the bounding box may need fixed positioning, if your layout
   * is relying on fixed positioned elements, for instance.
   * @type boolean
   */
  fixedPosition?: boolean
}

class SelectableGroup extends Component<TSelectableGroupProps> {
  static defaultProps = {
    clickClassName: '',
    tolerance: 0,
    globalMouse: false,
    ignoreList: [],
    disableSelectStartList: [],
    scrollSpeed: 0.25,
    minimumSpeedFactor: 60,
    duringSelection: noop,
    onSelectionFinish: noop,
    onSelectionClear: noop,
    allowClickWithoutSelected: true,
    selectionModeClass: 'in-selection-mode',
    resetOnStart: false,
    disabled: false,
    deselectOnEsc: true,
    fixedPosition: false,
    delta: 1
  }

  state = { selectionMode: false }

  mouseDownStarted = false
  mouseMoveStarted = false
  mouseMoved = false
  mouseUpStarted = false
  selectionStarted = false
  deselectionStarted = false
  clickedItem?: TSelectableItem
  mouseDownData: TMouseDownData = {
    selectboxY: 0,
    selectboxX: 0,
    target: null
  }

  registry = new Set<TSelectableItem>()
  selectedItems = new Set<TSelectableItem>()
  selectingItems = new Set<TSelectableItem>()
  ignoreCheckCache = new Map<HTMLElement, Boolean>()
  disableCheckCache = new Map<HTMLElement, Boolean>()
  ignoreList = this.props.ignoreList!.concat(['.selectable-select-all', '.selectable-deselect-all'])
  disableSelectStartList = this.props.disableSelectStartList
  ignoreListNodes: HTMLElement[] = []
  disableSelectStartListNodes: HTMLElement[] = []

  selectbox: Maybe<Selectbox> = null
  selectableGroup: Maybe<HTMLElement> = null
  scrollContainer: Maybe<HTMLElement> = null

  maxScrollTop: number = 0
  maxScrollLeft: number = 0
  scrollBounds: Maybe<DOMRect | ClientRect> = null

  componentDidMount() {
    if (this.props.scrollContainer) {
      this.scrollContainer = document.querySelector(this.props.scrollContainer)
    } else {
      this.scrollContainer = this.selectableGroup
    }

    this.selectableGroup!.addEventListener('mousedown', this.mouseDown)
    this.selectableGroup!.addEventListener('touchstart', this.mouseDown)

    if (this.props.deselectOnEsc) {
      document.addEventListener('keydown', this.keyListener)
      document.addEventListener('keyup', this.keyListener)
    }
  }

  componentWillUnmount() {
    this.selectableGroup!.removeEventListener('mousedown', this.mouseDown)
    this.selectableGroup!.removeEventListener('touchstart', this.mouseDown)

    if (this.props.deselectOnEsc) {
      document.removeEventListener('keydown', this.keyListener)
      document.removeEventListener('keyup', this.keyListener)
    }

    this.removeTempEventListeners()
  }

  removeTempEventListeners() {
    document.removeEventListener('mousemove', this.updateSelectBox)
    document.removeEventListener('touchmove', this.updateSelectBox)
    document.removeEventListener('mouseup', this.mouseUp)
    document.removeEventListener('touchend', this.mouseUp)
  }

  updateRootBounds() {
    this.scrollBounds = this.scrollContainer!.getBoundingClientRect()
    this.maxScrollTop = this.scrollContainer!.scrollHeight - this.scrollContainer!.clientHeight
    this.maxScrollLeft = this.scrollContainer!.scrollWidth - this.scrollContainer!.clientWidth
  }

  updateRegistry = () => {
    const containerScroll = {
      scrollTop: this.scrollContainer!.scrollTop,
      scrollLeft: this.scrollContainer!.scrollLeft
    }

    for (const selectableItem of this.registry.values()) {
      selectableItem.registerSelectable(containerScroll)
    }
  }

  registerSelectable = (selectableItem: TSelectableItem) => {
    this.registry.add(selectableItem)
    if (selectableItem.state.isSelected) {
      this.selectedItems.add(selectableItem)
    }
  }

  unregisterSelectable = (selectableItem: TSelectableItem) => {
    this.registry.delete(selectableItem)
    this.selectedItems.delete(selectableItem)
    this.selectingItems.delete(selectableItem)

    this.props.onSelectionFinish!([...this.selectedItems])
  }

  toggleSelectionMode() {
    const {
      selectedItems,
      state: { selectionMode }
    } = this

    if (selectedItems.size && !selectionMode) {
      this.setState({ selectionMode: true })
    }
    if (!selectedItems.size && selectionMode) {
      this.setState({ selectionMode: false })
    }
  }

  private updateContainerScroll = (evt: MouseEvent<HTMLElement>) => {
    const { scrollTop, scrollLeft } = this.scrollContainer!

    this.checkScrollTop(evt.clientY, scrollTop)
    this.checkScrollBottom(evt.clientY, scrollTop)
    this.checkScrollLeft(evt.clientX, scrollLeft)
    this.checkScrollRight(evt.clientX, scrollLeft)
  }

  getScrollStep = (offset: number) => {
    const { minimumSpeedFactor, scrollSpeed } = this.props

    return Math.max(offset, minimumSpeedFactor!) * scrollSpeed!
  }

  checkScrollTop = (clientY: number, currentTop: number) => {
    const offset = this.scrollBounds!.top - clientY

    if (offset > 0 || clientY < 0) {
      this.scrollContainer!.scrollTop = currentTop - this.getScrollStep(offset)
    }
  }

  checkScrollBottom = (clientY: number, currentTop: number) => {
    const offset = clientY - this.scrollBounds!.bottom

    if (offset > 0 || clientY > window.innerHeight) {
      const newTop = currentTop + this.getScrollStep(offset)
      this.scrollContainer!.scrollTop = Math.min(newTop, this.maxScrollTop)
    }
  }

  checkScrollLeft = (clientX: number, currentLeft: number) => {
    const offset = this.scrollBounds!.left - clientX

    if (offset > 0 || clientX < 0) {
      const newLeft = currentLeft - this.getScrollStep(offset)
      this.scrollContainer!.scrollLeft = newLeft
    }
  }

  checkScrollRight = (clientX: number, currentLeft: number) => {
    const offset = clientX - this.scrollBounds!.right

    if (offset > 0 || clientX > window.innerWidth) {
      const newLeft = currentLeft + this.getScrollStep(offset)
      this.scrollContainer!.scrollLeft = Math.min(newLeft, this.maxScrollLeft)
    }
  }

  updateSelectBox = (event: Event) => {
    const evt = castTouchToMouseEvent(event)
    this.updateContainerScroll(evt as MouseEvent<HTMLElement>)

    if (this.mouseMoveStarted) {
      return
    }
    this.mouseMoveStarted = true
    this.mouseMoved = true

    const { mouseDownData } = this
    const { clientX, clientY } = evt
    const { scrollLeft, scrollTop } = this.scrollContainer!

    const pointY = clientY - this.scrollBounds!.top + scrollTop
    const selectboxY = Math.min(pointY, mouseDownData.selectboxY)

    const pointX = clientX - this.scrollBounds!.left + scrollLeft
    const selectboxX = Math.min(pointX, mouseDownData.selectboxX)

    this.selectbox!.setState(
      {
        x: selectboxX,
        y: selectboxY,
        isSelecting: true,
        width: Math.abs(pointX - mouseDownData.selectboxX),
        height: Math.abs(pointY - mouseDownData.selectboxY)
      },
      () => {
        this.updateSelecting()
        this.props.duringSelection!([...this.selectingItems])
        this.mouseMoveStarted = false
      }
    )
  }

  updateSelecting = () => {
    const selectboxNode = this.selectbox!.getRef()
    if (!selectboxNode) {
      return
    }

    const selectboxBounds = getBoundsForNode(selectboxNode)

    this.selectItems({
      ...selectboxBounds,
      offsetWidth: selectboxBounds.offsetWidth || 1,
      offsetHeight: selectboxBounds.offsetHeight || 1
    })
  }

  selectItems = (selectboxBounds: TComputedBounds, options: TSelectItemsOptions = {}) => {
    const { tolerance, enableDeselect, mixedDeselect } = this.props

    selectboxBounds.top += this.scrollContainer!.scrollTop
    selectboxBounds.left += this.scrollContainer!.scrollLeft

    for (const item of this.registry.values()) {
      this.processItem({
        item,
        selectboxBounds,
        tolerance: tolerance!,
        mixedDeselect: mixedDeselect!,
        enableDeselect: enableDeselect!,
        isFromClick: options && options.isFromClick
      })
    }
  }

  processItem(options: TProcessItemOptions) {
    const { item, tolerance, selectboxBounds, enableDeselect, mixedDeselect, isFromClick } = options

    if (this.isInIgnoreList(item.node)) {
      return null
    }

    const isCollided = doObjectsCollide(selectboxBounds, item.bounds!, tolerance, this.props.delta)
    const { isSelecting, isSelected } = item.state

    if (isFromClick && isCollided) {
      if (isSelected) {
        this.selectedItems.delete(item)
      } else {
        this.selectedItems.add(item)
      }

      item.setState({ isSelected: !isSelected })

      return (this.clickedItem = item)
    }

    if (!isFromClick && isCollided) {
      if (isSelected && enableDeselect && (!this.selectionStarted || mixedDeselect)) {
        item.setState({ isSelected: false })
        item.deselected = true

        this.deselectionStarted = true

        return this.selectedItems.delete(item)
      }

      const canSelect = mixedDeselect ? !item.deselected : !this.deselectionStarted

      if (!isSelecting && !isSelected && canSelect) {
        item.setState({ isSelecting: true })

        this.selectionStarted = true
        this.selectingItems.add(item)

        return { updateSelecting: true }
      }
    }

    if (!isFromClick && !isCollided && isSelecting) {
      if (this.selectingItems.has(item)) {
        item.setState({ isSelecting: false })

        this.selectingItems.delete(item)

        return { updateSelecting: true }
      }
    }

    return null
  }

  clearSelection = () => {
    for (const item of this.selectedItems.values()) {
      item.setState({ isSelected: false })
      this.selectedItems.delete(item)
    }

    this.setState({ selectionMode: false })
    this.props.onSelectionFinish!([...this.selectedItems])
    this.props.onSelectionClear!()
  }

  selectAll = () => {
    this.updateWhiteListNodes()
    this.updateDisableSelectStartListNodes()

    for (const item of this.registry.values()) {
      if (!this.isInIgnoreList(item.node) && !item.state.isSelected) {
        item.setState({ isSelected: true })
        this.selectedItems.add(item)
      }
    }

    this.setState({ selectionMode: true })
    this.props.onSelectionFinish!([...this.selectedItems])
  }

  isInIgnoreList(target: HTMLElement | null) {
    if (!target) {
      return
    }

    if (this.ignoreCheckCache.get(target) !== undefined) {
      return this.ignoreCheckCache.get(target)
    }

    const shouldBeIgnored = this.ignoreListNodes.some(
      ignoredNode => target === ignoredNode || ignoredNode.contains(target)
    )

    this.ignoreCheckCache.set(target, shouldBeIgnored)

    return shouldBeIgnored
  }

  isInDisableSelectStartList(target: HTMLElement | null) {
    if (!target) {
      return
    }

    if (this.disableCheckCache.get(target) !== undefined) {
      return this.disableCheckCache.get(target)
    }

    const shouldBeDisabled = this.disableSelectStartListNodes.some(
      disabledNode => target === disabledNode || disabledNode.contains(target)
    )

    this.disableCheckCache.set(target, shouldBeDisabled)

    return shouldBeDisabled
  }

  updateWhiteListNodes() {
    this.ignoreListNodes = Array.from(document.querySelectorAll(this.ignoreList.join(', ')))
  }

  updateDisableSelectStartListNodes() {
    if (this.disableSelectStartList!.length > 0) {
      this.disableSelectStartListNodes = Array.from(
        document.querySelectorAll(this.disableSelectStartList!.join(', '))
      )
    }
  }

  mouseDown = (e: Event) => {
    if (this.isInDisableSelectStartList(e.target as HTMLElement)) {
      this.mouseDownStarted = false

      return
    }

    const isNotLeftButtonClick = !e.type.includes('touch') && !detectMouseButton(e as any, 1)
    if (this.mouseDownStarted || this.props.disabled || isNotLeftButtonClick) {
      return
    }

    this.updateWhiteListNodes()
    this.updateDisableSelectStartListNodes()

    if (this.isInIgnoreList(e.target as HTMLElement)) {
      this.mouseDownStarted = false

      return
    }

    if (this.props.resetOnStart) {
      this.clearSelection()
    }
    this.mouseDownStarted = true
    this.mouseUpStarted = false
    const evt = castTouchToMouseEvent(e)

    if (!this.props.globalMouse && !isNodeInRoot(evt.target as any, this.selectableGroup!)) {
      const offsetData = getBoundsForNode(this.selectableGroup!)
      const collides = doObjectsCollide(
        {
          top: offsetData.top,
          left: offsetData.left,
          width: 0,
          height: 0,
          offsetHeight: offsetData.offsetHeight,
          offsetWidth: offsetData.offsetWidth
        },
        {
          top: evt.pageY,
          left: evt.pageX,
          width: 0,
          height: 0,
          offsetWidth: 0,
          offsetHeight: 0
        }
      )

      if (!collides) {
        return
      }
    }

    this.updateRootBounds()
    this.updateRegistry()

    this.mouseDownData = {
      target: evt.target as HTMLElement,
      selectboxY: evt.clientY - this.scrollBounds!.top + this.scrollContainer!.scrollTop,
      selectboxX: evt.clientX - this.scrollBounds!.left + this.scrollContainer!.scrollLeft
    }

    evt.preventDefault()

    document.addEventListener('mousemove', this.updateSelectBox)
    document.addEventListener('touchmove', this.updateSelectBox)
    document.addEventListener('mouseup', this.mouseUp)
    document.addEventListener('touchend', this.mouseUp)
  }

  preventEvent(target: HTMLElement, type: string) {
    const preventHandler = (evt: Event) => {
      target.removeEventListener(type, preventHandler, true)
      evt.preventDefault()
      evt.stopPropagation()
    }
    target.addEventListener(type, preventHandler, true)
  }

  private mouseUp = (event: Event) => {
    if (this.mouseUpStarted) {
      return
    }

    this.mouseUpStarted = true
    this.mouseDownStarted = false
    this.removeTempEventListeners()

    if (!this.mouseDownData) {
      return
    }

    const evt: any = castTouchToMouseEvent(event)
    const { pageX, pageY } = evt

    if (!this.mouseMoved && isNodeInRoot(evt.target as HTMLElement, this.selectableGroup!)) {
      this.handleClick(evt, pageY, pageX)
    } else {
      for (const item of this.selectingItems.values()) {
        item.setState({ isSelected: true, isSelecting: false })
      }
      this.selectedItems = new Set([...this.selectedItems, ...this.selectingItems])
      this.selectingItems.clear()

      if (evt.which === 1 && this.mouseDownData.target === evt.target) {
        this.preventEvent(evt.target, 'click')
      }

      this.selectbox!.setState({
        isSelecting: false,
        width: 0,
        height: 0
      })
      this.props.onSelectionFinish!([...this.selectedItems])
    }

    this.toggleSelectionMode()
    this.cleanUp()
    this.mouseMoved = false
  }

  handleClick(evt: any, top: number, left: number) {
    const { clickClassName, allowClickWithoutSelected, onSelectionFinish } = this.props
    const classNames = (evt.target as HTMLElement).classList || []
    const isMouseUpOnClickElement = Array.from(classNames).indexOf(clickClassName!) > -1

    if (
      allowClickWithoutSelected ||
      this.selectedItems.size ||
      isMouseUpOnClickElement ||
      evt.ctrlKey
    ) {
      this.selectItems(
        {
          top,
          left,
          width: 0,
          height: 0,
          offsetWidth: 0,
          offsetHeight: 0
        },
        { isFromClick: true }
      )

      onSelectionFinish!([...this.selectedItems], this.clickedItem)

      if (evt.which === 1) {
        this.preventEvent(evt.target, 'click')
      }
      if (evt.which === 2 || evt.which === 3) {
        this.preventEvent(evt.target, 'contextmenu')
      }
    }
  }

  keyListener = (evt: KeyboardEvent) => {
    if (evt.keyCode === 27) {
      // escape
      this.clearSelection()
    }
  }

  cleanUp() {
    this.deselectionStarted = false
    this.selectionStarted = false

    if (this.props.mixedDeselect) {
      for (const item of this.registry.values()) {
        item.deselected = false
      }
    }
  }

  getGroupRef = (ref: HTMLElement | null) => {
    this.selectableGroup = ref
  }

  getSelectboxRef = (ref: Selectbox | null) => {
    this.selectbox = ref
  }

  defaultContainerStyle = {
    position: 'relative'
  }

  contextValue = {
    selectable: {
      register: this.registerSelectable,
      unregister: this.unregisterSelectable,
      selectAll: this.selectAll,
      clearSelection: this.clearSelection,
      getScrolledContainer: () => this.scrollContainer
    }
  }

  render() {
    const { selectionMode } = this.state
    const {
      component: GroupComponent = 'div',
      className,
      style,
      selectionModeClass,
      fixedPosition,
      selectboxClassName,
      children
    } = this.props

    return (
      <SelectableGroupContext.Provider value={this.contextValue}>
        <GroupComponent
          ref={this.getGroupRef}
          style={Object.assign({}, this.defaultContainerStyle, style)}
          className={`${className} ${selectionMode ? selectionModeClass : ''}`}
        >
          <Selectbox
            ref={this.getSelectboxRef}
            className={selectboxClassName}
            fixedPosition={fixedPosition!}
          />
          {children}
        </GroupComponent>
      </SelectableGroupContext.Provider>
    )
  }
}

export default SelectableGroup
