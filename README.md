# React-selectable-fast ![npm](https://img.shields.io/npm/v/react-selectable-fast.svg) ![license](https://img.shields.io/npm/l/react-selectable-fast.svg)

Enable a React component (or group of components) to be selectable via mouse/touch.

## Demo

https://react-selectable-fast.now.sh

## Install

```sh
npm i -S react-selectable-fast
```

[![react-selectable-fast](https://nodei.co/npm/react-selectable-fast.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-selectable-fast/)

## Based on react-selectable

This project is based on [react-selectable](https://github.com/unclecheese/react-selectable) by [unclecheese](https://github.com/unclecheese).
The main idea of this fork is to eliminate render during selection caused by state updates of SelectableGroup. Only items under selectbox rerender themselves, which great for big lists of selectable items. Also, this package extends the original functionality with ability to scroll items while selecting relative to window and specified scroll container.

## Usage

Package exports 5 entities

```ts
export { TSelectableItemProps, SelectableGroup, createSelectable, SelectAll, DeselectAll }
```

To make other components selectable wrap them using HoC `createSelectable`, add passed `selectableRef` prop to the target node and put a list of seletable items under `SelectableGroup`.

```ts
import React, { Component } from 'react'
import { SelectableGroup } from 'react-selectable-fast'

class App extends Component {
  ...

  render() {
    return (
      <SelectableGroup
        className="main"
        clickClassName="tick"
        enableDeselect
        tolerance={this.state.tolerance}
        globalMouse={this.state.isGlobal}
        allowClickWithoutSelected={false}
        duringSelection={this.handleSelecting}
        onSelectionClear={this.handleSelectionClear}
        onSelectionFinish={this.handleSelectionFinish}
        onSelectedItemUnmount={this.handleSelectedItemUnmount}
        ignoreList={['.not-selectable', '.item:nth-child(10)', '.item:nth-child(27)']}
      >
        <List items={this.props.items} />
      </SelectableGroup>
    )
  }
}
```

```ts
import React from 'react'
import { TSelectableItemProps, createSelectable } from 'react-selectable-fast'

class SomeComponent extends Component<TSelectableItemProps> {
  render() {
    const { selectableRef, isSelected, isSelecting } = this.props

    return <div ref={selectableRef}>...</div>
  }
}

export default createSelectable(SomeComponent)
```

```ts
import React from 'react'
import { SelectAll, DeselectAll } from 'react-selectable-fast'
import SelectableComponent from './SomeComponent'

const List = () => (
  <div>
    <SelectAll className="selectable-button">
      <button>Select all</button>
    </SelectAll>
    <DeselectAll className="selectable-button">
      <button>Clear selection</button>
    </DeselectAll>
    {this.props.items.map((item, i) => (
      <SelectableComponent key={i} player={item.player} year={item.year} />
    ))}
  </div>
)
```

## JavaScript environment requirements

The React-Selectable-Fast package distributed on NPM use the widely-supported ES5
version of JavaScript to support as many browser environments as possible.

However, this package expects modern JavaScript globals (`Map`, `Set`,
`Array.from`, `Array.isArray` `Object.assign`) to be defined. If you support older browsers and
devices which may not yet provide these natively, consider including a global
polyfill in your bundled application, such as [core-js](https://github.com/zloirock/core-js) or
[babel-polyfill](https://babeljs.io/docs/usage/polyfill/).

A polyfilled environment for React-Selectable-Fast using [core-js](https://github.com/zloirock/core-js) to support older browsers
might look like this:

```ts
import 'core-js/fn/object/assign'
import 'core-js/fn/array/from'
import 'core-js/fn/array/is-array'
import 'core-js/fn/map'
import 'core-js/fn/set'

import App from './myApp'
```

## Configuration

The `<SelectableGroup />` component accepts a few optional props:

- `duringSelection` (Function) Callback fired rapidly during selection (while the selector is being dragged). Passes an array containing selectable items currently under the selector to the callback function.
- `onSelectionFinish` (Function) Callback.
- `onSelectionClear` (Function) Callback.
- `onSelectedItemUnmount` (Function) Callback.
- `enableDeselect` (Boolean) Enables deselect with selectbox.
- `mixedDeselect` (Boolean) When enabled items can be selected and deselected with selectbox at the same time, `enableDeselect` should be set to `true`.
- `scrollContainer` (String) Selector of scroll container which will be used to calculate selectbox position. If not specified SelectableGroup element will be used as scroll container.
- `ignoreList` (Array) Array of ignored selectors.
- `disableSelectStartList` (Array) Array of selectors where select lasso can not be started by dragging mouse. Useful if you want to enable drag of selectables.
- `clickableClassName` (String) On elements with specified selector click item containing this element will be selected.
- `tolerance` (Number) The amount of buffer to add around your `<SelectableGroup />` container, in pixels.
- `className` (String) Class of selectable group element.
- `selectionModeClass` (String) Class indicating that there is more than 1 selected item. Defaults to 'in-selection-mode'.
- `selectboxClassName` (String) Class of selectbox element.
- `component` (String) The component to render. Defaults to `div`.
- `allowClickWithoutSelected` (Boolean) When disabled items can be selected by click only if there is more than 1 already selected item.
- `fixedPosition` (Boolean) Whether the `<SelectableGroup />` container is a fixed or absolutely positioned element or the grandchild of one.
- `resetOnStart` (Boolean) Unselect all items when you start a new drag. Default value is `false`.
- `deselectOnEsc` (Boolean) Unselect all items on ESC keydown/keyup events. Default value is `true`. Using `ref` on `SelectableGroup` gives access to `ref.clearSelection()` method to unselect all items programmatically.
- `disabled` (Boolean) Enable or disable the selectable draggable, useful if you want to enable drag of sub-items. Default value is `false`.
- `delta` (Number) Value of the CSS transform property scaled list, useful if your list of items in `<SelectableGroup />` is wrapped by a scale css transform property. Default value is `1`.
- `selectOnClick` (Boolean) Allow selecting by clicking items. Default value is `true`
- `allowAltClick` (Boolean) Perform select actions even though the `alt` key is down when clicking or dragging. Default value is `false`
- `allowCtrlClick` (Boolean) Perform select actions even though the `ctrl` key is down when clicking or dragging. Default value is `false`
- `allowMetaClick` (Boolean) Perform select actions even though the `meta` key is down when clicking or dragging. Default value is `false`
- `allowShiftClick` (Boolean) Perform select actions even though the `shift` key is down when clicking or dragging. Default value is `false`
