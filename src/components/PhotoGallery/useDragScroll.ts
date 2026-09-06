import { useRef, type PointerEvent as ReactPointerEvent } from 'react'

const DRAG_THRESHOLD = 6

/**
 * Click-and-drag horizontal scrolling for mouse users. Touch and trackpads
 * already scroll natively, so only primary-button mouse pointers are handled.
 * Returns pointer handlers and a `wasDragged` flag so clicks after a drag are ignored.
 */
export function useDragScroll<T extends HTMLElement>() {
  const state = useRef({ active: false, startX: 0, startScroll: 0, moved: false })

  function onPointerDown(e: ReactPointerEvent<T>) {
    if (e.pointerType !== 'mouse' || e.button !== 0) return
    state.current = {
      active: true,
      startX: e.clientX,
      startScroll: e.currentTarget.scrollLeft,
      moved: false,
    }
  }

  function onPointerMove(e: ReactPointerEvent<T>) {
    const s = state.current
    if (!s.active) return
    const dx = e.clientX - s.startX
    if (!s.moved && Math.abs(dx) < DRAG_THRESHOLD) return
    if (!s.moved) {
      s.moved = true
      e.currentTarget.setPointerCapture(e.pointerId)
    }
    e.currentTarget.scrollLeft = s.startScroll - dx
  }

  function onPointerUp(e: ReactPointerEvent<T>) {
    const s = state.current
    if (s.active && s.moved) e.currentTarget.releasePointerCapture(e.pointerId)
    s.active = false
  }

  function wasDragged(): boolean {
    return state.current.moved
  }

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel: onPointerUp,
    wasDragged,
  }
}
