import React from 'react'

import { TSelectableGroupContext, TSelectableItem } from './Selectable.types'
import { noop } from './utils'

export const SelectableGroupContext = React.createContext<TSelectableGroupContext>({
  selectable: {
    register(_: TSelectableItem) {},
    unregister(_: TSelectableItem) {},
    selectAll: noop,
    clearSelection: noop,
    getScrolledContainer: () => null,
  },
})
