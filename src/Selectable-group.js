import 'babel-polyfill'
import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'
import isNodeInRoot from './nodeInRoot'
import getBoundsForNode from './getBoundsForNode'
import doObjectsCollide from './doObjectsCollide'
import Selectbox from './Selectbox'

class SelectableGroup extends Component {
  static propTypes = {
    scale: PropTypes.number,
    distance: PropTypes.number,
    globalMouse: PropTypes.bool,
    whiteList: PropTypes.array,
    scrollSpeed: PropTypes.number,
    minimumSpeedFactor: PropTypes.number,
    allowClickWithoutSelected: PropTypes.bool,
    clickableClassName: PropTypes.string,
    style: PropTypes.object,
    selectionModeClass: PropTypes.string,
    onSelectionClear: PropTypes.func,

    /**
     * Scroll container selector
     */
    scrollContainer: PropTypes.string,

    /**
     * Event that will fire rapidly during selection (while the selector is
     * being dragged). Passes an array of keys.
     */
    duringSelection: PropTypes.func,

    /**
     * Event that will fire when items are selected. Passes an array of keys.
     */
    onSelectionFinish: PropTypes.func,

    /**
     * The component that will represent the Selectable DOM node
     */
    component: PropTypes.node,

    /**
     * Amount of forgiveness an item will offer to the selectbox before registering
     * a selection, i.e. if only 1px of the item is in the selection, it shouldn't be
     * included.
     */
    tolerance: PropTypes.number,

    /**
     * In some cases, it the bounding box may need fixed positioning, if your layout
     * is relying on fixed positioned elements, for instance.
     * @type boolean
     */
    fixedPosition: PropTypes.bool,

    /**
     * When enabled, makes all new selections add to the already selected items,
     * except for selections that contain only previously selected items--in this case
     * it unselects those items.
     */
    dontClearSelection: PropTypes.bool,
  }

  static defaultProps = {
    component: 'div',
    distance: 0,
    tolerance: 0,
    globalMouse: false,
    whiteList: [],
    scale: 1,
    scrollSpeed: 0.25,
    minimumSpeedFactor: 60,
    duringSelection: () => {},
    onSelectionFinish: () => {},
    onSelectionClear: () => {},
    dontClearSelection: true,
    allowClickWithoutSelected: true,
    selectionModeClass: 'in-selection-mode',
  }

  static childContextTypes = {
    selectable: React.PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = { selectionMode: false }

    this.mouseDownStarted = false
    this.mouseMoveStarted = false
    this.mouseUpStarted = false
    this.mouseDownData = null

    this.registry = new Set()
    this.selectedItems = new Set()
    this.selectingItems = new Set()
    this.whiteList = this.props.whiteList.concat(['.selectable-select-all', '.selectable-deselect-all'])
  }

  getChildContext() {
    return {
      selectable: {
        register: this.registerSelectable,
        unregister: this.unregisterSelectable,
        selectAll: this.selectAll,
        clearSelection: this.clearSelection,
        getScrolledContainer: () => this.scrollContainer,
      },
    }
  }

  componentDidMount() {
    this.rootNode = this.refs.selectableGroup
    this.scrollContainer = document.querySelector(this.props.scrollContainer) || this.rootNode
    this.initialRootBounds = this.rootNode.getBoundingClientRect()
    this.rootNode.addEventListener('mousedown', this.mouseDown)
    this.rootNode.addEventListener('touchstart', this.mouseDown)
    document.addEventListener('keydown', this.keyListener)
    document.addEventListener('keyup', this.keyListener)
  }

  componentWillUnmount() {
    this.rootNode.removeEventListener('mousedown', this.mouseDown)
    this.rootNode.removeEventListener('touchstart', this.mouseDown)
    document.removeEventListener('keydown', this.keyListener)
    document.removeEventListener('keyup', this.keyListener)
  }

  @autobind
  applyScale(top, left) {
    return {
      scaledTop: top / this.props.scale,
      scaledLeft: left / this.props.scale,
    }
  }

  @autobind
  setScollTop(e) {
    const scrollTop = this.scrollContainer.scrollTop
    this.checkScrollUp(e, scrollTop)
    this.checkScrollDown(e, scrollTop)
  }

  @autobind
  checkScrollUp(e, currentTop) {
    const { minimumSpeedFactor, scrollSpeed } = this.props
    const offset = this.scrollBounds.top - e.clientY

    if (offset > 0 || e.clientY < 0) {
      const newTop = currentTop - (Math.max(offset, minimumSpeedFactor)) * scrollSpeed
      this.scrollContainer.scrollTop = newTop
    }
  }

  @autobind
  checkScrollDown(e, currentTop) {
    const { minimumSpeedFactor, scrollSpeed } = this.props
    const offset = e.clientY - this.scrollBounds.bottom

    if (offset > 0 || e.clientY > window.innerHeight) {
      const newTop = currentTop + (Math.max(offset, minimumSpeedFactor)) * scrollSpeed
      this.scrollContainer.scrollTop = Math.min(newTop, this.maxScroll)
    }
  }

  updateRootBounds() {
    if (this.scrollBounds) {
      this.oldScrollBounds = this.scrollBounds
    }
    this.scrollBounds = this.scrollContainer.getBoundingClientRect()
    this.maxScroll = this.scrollContainer.scrollHeight - this.scrollContainer.clientHeight
  }

  @autobind
  updateRegistry() {
    const containerScroll = {
      scrollTop: this.scrollContainer.scrollTop,
      scrollLeft: this.scrollContainer.scrollLeft,
    }

    for (const selectableItem of this.registry.values()) {
      selectableItem.registerSelectable(containerScroll)
    }
  }

  @autobind
  registerSelectable(selectableItem) {
    this.registry.add(selectableItem)
  }

  @autobind
  unregisterSelectable(selectableItem) {
    this.registry.delete(selectableItem)
  }

  toggleSelectionMode() {
    const { selectedItems, state: { selectionMode } } = this

    if (selectedItems.size && !selectionMode) {
      this.setState({ selectionMode: true })
    }
    if (!selectedItems.size && selectionMode) {
      this.setState({ selectionMode: false })
    }
  }

  @autobind
  openSelectbox(event) {
    const e = this.desktopEventCoords(event)
    this.setScollTop(e)

    if (this.mouseMoveStarted) return
    this.mouseMoveStarted = true

    const scrollTop = this.scrollContainer.scrollTop
    const applyContainerScroll = (top, scroll) => top + scroll / this.props.scale
    const { scaledTop, scaledLeft } = this.applyScale(e.pageY, e.pageX)

    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
    const windowScroll = isChrome ? window.scrollY : document.documentElement.scrollTop

    const top = applyContainerScroll(scaledTop - this.scrollBounds.top, scrollTop - windowScroll)
    let boxTop = applyContainerScroll(this.mouseDownData.boxTop - this.scrollBounds.top, this.mouseDownData.scrollTop - windowScroll)
    const h = boxTop - top
    boxTop = Math.min(boxTop - h, boxTop)

    const w = this.mouseDownData.boxLeft - scaledLeft
    const leftContainerRelative = this.mouseDownData.boxLeft - this.scrollBounds.left
    const boxLeft = Math.min(leftContainerRelative - w / this.props.scale, leftContainerRelative / this.props.scale)

    this.updatedSelecting()

    this.refs.selectbox.setState({
      isBoxSelecting: true,
      boxWidth: Math.abs(w),
      boxHeight: Math.abs(h),
      boxLeft,
      boxTop,
    }, () => {
      this.mouseMoveStarted = false
    })

    this.props.duringSelection([...this.selectingItems])
  }

  @autobind
  updatedSelecting() {
    const selectbox = this.refs.selectbox.getRef()
    if (!selectbox) return

    const selectboxBounds = getBoundsForNode(selectbox)
    this.selectItems(selectboxBounds)
  }

  @autobind
  selectItems(selectboxBounds, { click } = {}) {
    const { tolerance, dontClearSelection } = this.props
    selectboxBounds.top += this.scrollContainer.scrollTop
    selectboxBounds.left += this.scrollContainer.scrollLeft

    for (const item of this.registry.values()) {
      const isCollided = doObjectsCollide(selectboxBounds, item.bounds, tolerance)
      const { selecting, selected } = item.state

      if (click && isCollided) {
        if (selected) {
          this.selectedItems.delete(item)
        } else {
          this.selectedItems.add(item)
        }
        item.setState({ selected: !selected })
        this.clickedItem = item
      }

      if (!click && isCollided && !selecting && !selected) {
        item.setState({ selecting: true })
        this.selectingItems.add(item)
      }

      if (!click && !isCollided && selecting) {
        if (this.selectingItems.has(item)) {
          item.setState({ selecting: false })
          this.selectingItems.delete(item)
        } else {
          if (!dontClearSelection) {
            item.setState({ selecting: false })
            this.selectedItems.delete(item)
          }
        }
      }
    }
  }

  @autobind
  clearSelection() {
    for (const item of this.selectedItems.values()) {
      item.setState({ selected: false })
      this.selectedItems.delete(item)
    }
    this.setState({ selectionMode: false })
    this.props.onSelectionFinish([...this.selectedItems])
    this.props.onSelectionClear()
  }

  @autobind
  selectAll() {
    for (const item of this.registry.values()) {
      if (!item.state.selected) {
        item.setState({ selected: true })
      }
      this.selectedItems.add(item)
    }
    this.setState({ selectionMode: true })
    this.props.onSelectionFinish([...this.selectedItems])
  }

  inWhiteList(target) {
    const nodes = [...document.querySelectorAll(this.whiteList.join(', '))]
    return nodes.some(node => (
      target === node || node.contains(target)
    ))
  }

  @autobind
  mouseDown(e) {
    if (this.mouseDownStarted) return
    this.mouseDownStarted = true
    this.mouseUpStarted = false
    e = this.desktopEventCoords(e)
    if (this.inWhiteList(e.target)) {
      this.mouseDownStarted = false
      return
    }

    const node = this.refs.selectableGroup
    if (!this.props.globalMouse && !isNodeInRoot(e.target, node)) {
      const offsetData = getBoundsForNode(node)
      const collides = doObjectsCollide(
        {
          top: offsetData.top,
          left: offsetData.left,
          bottom: offsetData.offsetHeight,
          right: offsetData.offsetWidth,
        },
        {
          top: e.pageY,
          left: e.pageX,
          offsetWidth: 0,
          offsetHeight: 0,
        }
      )
      if (!collides) return
    }

    this.updateRootBounds()
    this.updateRegistry()

    const { scaledTop, scaledLeft } = this.applyScale(e.pageY, e.pageX)
    this.mouseDownData = {
      boxLeft: scaledLeft,
      boxTop: scaledTop,
      scrollTop: this.scrollContainer.scrollTop,
      scrollLeft: this.scrollContainer.scrollLeft,
      target: e.target,
    }

    e.preventDefault()


    document.addEventListener('mousemove', this.openSelectbox)
    document.addEventListener('touchmove', this.openSelectbox)
    document.addEventListener('mouseup', this.mouseUp)
    document.addEventListener('touchend', this.mouseUp)
  }

  preventEvent(target, type) {
    const preventHandler = (e) => {
      target.removeEventListener(type, preventHandler, true)
      e.preventDefault()
      e.stopPropagation()
    }
    target.addEventListener(type, preventHandler, true)
  }

  @autobind
  mouseUp(event) {
    if (this.mouseUpStarted) return

    this.mouseUpStarted = true
    this.mouseDownStarted = false

    document.removeEventListener('mousemove', this.openSelectbox)
    document.removeEventListener('touchmove', this.openSelectbox)
    document.removeEventListener('mouseup', this.mouseUp)
    document.removeEventListener('touchend', this.mouseUp)

    if (!this.mouseDownData) return

    const e = this.desktopEventCoords(event)

    const { scaledTop, scaledLeft } = this.applyScale(e.pageY, e.pageX)
    const { boxTop, boxLeft } = this.mouseDownData
    const isClick = (scaledLeft === boxLeft && scaledTop === boxTop)

    if (isClick && isNodeInRoot(e.target, this.rootNode)) {
      this.handleClick(e, scaledTop, scaledLeft)
    } else {
      const itemsToAddToSelected = new Set()
      for (const item of this.selectingItems.values()) {
        if (!this.inWhiteList(item.node)) {
          item.setState({ selected: true, selecting: false })
          itemsToAddToSelected.add(item)
        } else {
          item.setState({ selected: false, selecting: false })
        }
      }
      this.selectedItems = new Set([...this.selectedItems, ...itemsToAddToSelected])
      this.selectingItems.clear()

      if (e.which === 1 && this.mouseDownData.target === e.target) {
        this.preventEvent(e.target, 'click')
      }

      this.refs.selectbox.setState({
        isBoxSelecting: false,
        boxWidth: 0,
        boxHeight: 0,
      })
      this.props.onSelectionFinish([...this.selectedItems])
    }

    this.toggleSelectionMode()
  }

  handleClick(e, top, left) {
    const isMouseUpOnClickElement = [...(e.target.classList || [])].indexOf(this.props.clickClassName) > -1

    if (this.props.allowClickWithoutSelected || this.selectedItems.size || isMouseUpOnClickElement || this.ctrlPressed) {
      this.selectItems({ top, left, offsetWidth: 0, offsetHeight: 0 }, { click: true })
      this.props.onSelectionFinish([...this.selectedItems], this.clickedItem)

      if (e.which === 1) {
        this.preventEvent(e.target, 'click')
      }
      if (e.which === 2 || e.which === 3) {
        this.preventEvent(e.target, 'contextmenu')
      }
    }
  }

  @autobind
  keyListener(e) {
    this.ctrlPressed = e.ctrlKey || e.metaKey
    if (this.ctrlPressed) {
      return
    }

    if (e.keyCode === 27) {
      this.clearSelection()
    }
  }

  /**
   * Used to return event object with desktop (non-touch) format of event
   * coordinates, regardless of whether the action is from mobile or desktop.
   */
  desktopEventCoords(e) {
    if (e.pageX === undefined || e.pageY === undefined) { // Touch-device
      if (e.targetTouches[0] !== undefined && e.targetTouches[0].pageX !== undefined) { // For touchmove
        e.pageX = e.targetTouches[0].pageX
        e.pageY = e.targetTouches[0].pageY
      } else if (e.changedTouches[0] !== undefined && e.changedTouches[0].pageX !== undefined) { // For touchstart
        e.pageX = e.changedTouches[0].pageX
        e.pageY = e.changedTouches[0].pageY
      }
    }
    return e
  }

  render() {
    return (
      <this.props.component
        ref="selectableGroup"
        className={`${this.props.className} ${this.state.selectionMode ? this.props.selectionModeClass : ''}`}
        style={this.props.style}
      >
        <Selectbox fixedPosition={this.props.fixedPosition} ref="selectbox" />
        {this.props.children}
      </this.props.component>
    )
  }
}

export default SelectableGroup
