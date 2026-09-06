'use client'

import { useCallback, useMemo, useRef, useState } from 'react'
import type { Photo } from '@/content/photos'
import { splitIntoRows } from '@/lib/gallery'
import { Lightbox } from './Lightbox'
import { PhotoRow } from './PhotoRow'
import { useParallax } from './useParallax'
import { useReducedMotion } from './useReducedMotion'
import styles from './PhotoGallery.module.css'

const ROW_COUNT = 3
/** Pixels of horizontal drift per pixel of page scroll, per row. Alternating directions. */
const ROW_SPEEDS = [-0.12, 0.08, -0.1] as const
const ROW_OFFSETS = [0, 140, 60] as const

type Props = { photos: readonly Photo[] }

/** Full-bleed, three-row horizontal photo gallery with scroll parallax and a lightbox. */
export function PhotoGallery({ photos }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const trackRefs = useParallax(containerRef, ROW_SPEEDS, !reducedMotion)
  const rows = useMemo(() => splitIntoRows(photos, ROW_COUNT), [photos])
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const open = useCallback(
    (photo: Photo) => setOpenIndex(photos.findIndex((p) => p.src === photo.src)),
    [photos],
  )
  const close = useCallback(() => setOpenIndex(null), [])

  return (
    <div
      className={styles.gallery}
      ref={containerRef}
      data-reduced-motion={reducedMotion || undefined}
    >
      {rows.map((row, i) => (
        <PhotoRow
          key={i}
          photos={row}
          offset={ROW_OFFSETS[i] ?? 0}
          trackRef={(el) => {
            trackRefs.current[i] = el
          }}
          onOpen={open}
        />
      ))}
      {openIndex !== null && (
        <Lightbox
          photos={photos}
          index={openIndex}
          onClose={close}
          onNavigate={setOpenIndex}
        />
      )}
    </div>
  )
}
