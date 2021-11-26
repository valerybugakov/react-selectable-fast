export type TGetBoundsForNodeArgs = {
  scrollTop: number
  scrollLeft: number
}

export type TComputedBounds = {
  top: number
  left: number
  width: number
  height: number
  offsetWidth: number
  offsetHeight: number
}

export function getDocumentScroll() {
  const documentScrollTop = Math.max(
    window.pageYOffset,
    document.documentElement.scrollTop,
    document.body.scrollTop
  )

  const documentScrollLeft = Math.max(
    window.pageXOffset,
    document.documentElement.scrollLeft,
    document.body.scrollLeft
  )

  return { documentScrollTop, documentScrollLeft }
}

/**
 * Given a node, get everything needed to calculate its boundaries
 */
export function getBoundsForNode(
  node: HTMLElement,
  containerScroll: TGetBoundsForNodeArgs = { scrollTop: 0, scrollLeft: 0 }
): TComputedBounds[] {
  const { scrollTop, scrollLeft } = containerScroll

  return Array.from(node.getClientRects()).map(rect => ({
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft,
    offsetWidth: node.offsetWidth,
    offsetHeight: node.offsetHeight,
    width: rect.width,
    height: rect.height,
  }))
}
