import { useEffect, useRef } from 'react'

/**
 * Drives a horizontal parallax on `rowRefs` as the page scrolls: each row's track
 * is translated by `speeds[i]` pixels per pixel of scroll relative to the gallery.
 * Writes directly to the DOM inside requestAnimationFrame to avoid re-rendering.
 */
export function useParallax(
  containerRef: React.RefObject<HTMLElement | null>,
  speeds: readonly number[],
  enabled: boolean,
) {
  const trackRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const container = containerRef.current
    if (!container || !enabled) {
      trackRefs.current.forEach((track) => track && (track.style.transform = ''))
      return
    }

    let frame = 0
    const update = () => {
      frame = 0
      const rect = container.getBoundingClientRect()
      const galleryCenter = rect.top + rect.height / 2
      const distance = window.innerHeight / 2 - galleryCenter
      trackRefs.current.forEach((track, i) => {
        if (track)
          track.style.transform = `translate3d(${distance * (speeds[i] ?? 0)}px,0,0)`
      })
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [containerRef, speeds, enabled])

  return trackRefs
}
