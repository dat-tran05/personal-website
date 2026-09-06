'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import type { Photo } from '@/content/photos'
import styles from './Lightbox.module.css'

type Props = {
  photos: readonly Photo[]
  index: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export function Lightbox({ photos, index, onClose, onNavigate }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const photo = photos[index]
  const count = photos.length

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate((index + 1) % count)
      if (e.key === 'ArrowLeft') onNavigate((index - 1 + count) % count)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      previous?.focus()
    }
  }, [index, count, onClose, onNavigate])

  if (!photo) return null

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-label={photo.caption}
      onClick={onClose}
    >
      <div className={styles.frame} onClick={(e) => e.stopPropagation()}>
        <div
          className={styles.stage}
          style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
        >
          <Image
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="90vw"
            priority
            className={styles.image}
          />
        </div>
        <div className={styles.bar}>
          <span className={styles.caption}>{photo.caption}</span>
          <span className={styles.controls}>
            <button
              type="button"
              onClick={() => onNavigate((index - 1 + count) % count)}
              aria-label="previous photo"
            >
              ←
            </button>
            <span className={styles.counter}>
              {index + 1} / {count}
            </span>
            <button
              type="button"
              onClick={() => onNavigate((index + 1) % count)}
              aria-label="next photo"
            >
              →
            </button>
            <button type="button" ref={closeRef} onClick={onClose} aria-label="close">
              esc
            </button>
          </span>
        </div>
      </div>
    </div>
  )
}
