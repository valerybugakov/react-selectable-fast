import { SelectableGroup } from './SelectableGroup'
import { createSelectable } from './CreateSelectable'
import { SelectAll } from './SelectAll'
import { DeselectAll } from './DeselectAll'
import { TSelectableItemProps } from './Selectable.types'

// As early as possible, check for the existence of the JavaScript globals which
// package Runtime relies upon, and produce a clear message if they do not exist.
if (process.env.NODE_ENV === 'development') {
  if (
    typeof Map !== 'function' ||
    typeof Set !== 'function' ||
    typeof Array.from !== 'function' ||
    typeof Array.isArray !== 'function' ||
    typeof Object.assign !== 'function'
  ) {
    throw new Error(`
      React-Selectable-Fast requires Map, Set, Array.from,
      Array.isArray, and Object.assign to exist.
      Use a polyfill to provide these for older browsers.
    `)
  }
}

export { TSelectableItemProps, SelectableGroup, createSelectable, SelectAll, DeselectAll }
