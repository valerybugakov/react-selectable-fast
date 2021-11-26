import { TComputedBounds } from './getBoundsForNode'

type TAreBoundsCollideOptions = {
  tolerance?: number
  useOffsetSize?: boolean
}

/**
 * Given offsets, widths, and heights of two objects, determine if they collide (overlap).
 */
const areBoundsCollide = (
  a: TComputedBounds,
  b: TComputedBounds,
  { tolerance = 0, useOffsetSize = false }: TAreBoundsCollideOptions
) => {
  const aHeight = useOffsetSize ? a.offsetHeight : a.height
  const bHeight = useOffsetSize ? b.offsetHeight : b.height

  const aWidth = useOffsetSize ? a.offsetWidth : a.width
  const bWidth = useOffsetSize ? b.offsetWidth : b.width

  return !(
    a.top + aHeight - tolerance < b.top ||
    // 'a' top doesn't touch 'b' bottom
    a.top + tolerance > b.top + bHeight ||
    // 'a' right doesn't touch 'b' left
    a.left + aWidth - tolerance < b.left ||
    // 'a' left doesn't touch 'b' right
    a.left + tolerance > b.left + bWidth
  )
}

function toArray(value: any) {
  if (Array.isArray(value)) {
    return value
  }

  return [value]
}

/**
 * Given two objects containing "top", "left", "offsetWidth" and "offsetHeight"
 * properties, determine if they collide.
 */
export function doObjectsCollide(
  a: TComputedBounds | TComputedBounds[],
  b: TComputedBounds | TComputedBounds[],
  tolerance = 0,
  delta = 1
) {
  const aBounds = toArray(a)
  const bBounds = toArray(b)

  for (let i = 0; i < aBounds.length; i++) {
    for (let j = 0; j < bBounds.length; j++) {
      return areBoundsCollide(aBounds[i], bBounds[j], { tolerance, useOffsetSize: delta === 1 })
    }
  }
}
