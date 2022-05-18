import { MouseEvent } from 'react'

type TDetectMouseButtonOptions = {
  allowAltClick?: boolean
  allowCtrlClick?: boolean
  allowMetaClick?: boolean
  allowShiftClick?: boolean
}

/**
 * @buttonNumber
 * 1: Left button
 * 2: Middle/Right button
 * 3: Right/Back button
 */
export function detectMouseButton(
  evt: MouseEvent<HTMLElement>,
  buttonNumber = 1,
  options: TDetectMouseButtonOptions = {}
) {
  if (
    (evt.metaKey && !options.allowMetaClick) ||
    (evt.ctrlKey && !options.allowCtrlClick) ||
    (evt.altKey && !options.allowAltClick) ||
    (evt.shiftKey && !options.allowShiftClick)
  ) {
    return false
  }

  if ('buttons' in evt) {
    return evt.buttons === buttonNumber
  }

  if ('which' in evt) {
    return (<unknown>evt as KeyboardEvent).which === buttonNumber
  }

  return (evt as MouseEvent).button === buttonNumber - 1
}
