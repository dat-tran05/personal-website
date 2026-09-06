'use client'

import Image from 'next/image'
import type { Photo } from '@/content/photos'
import { useDragScroll } from './useDragScroll'
import styles from './PhotoGallery.module.css'

type Props = {
  photos: readonly Photo[]
  /** Extra leading offset so seams in neighbouring rows don't line up. */
  offset: number
  trackRef: (el: HTMLDivElement | null) => void
  onOpen: (photo: Photo) => void
}

export function PhotoRow({ photos, offset, trackRef, onOpen }: Props) {
  const drag = useDragScroll<HTMLDivElement>()

  return (
    <div
      className={styles.scroller}
      onPointerDown={drag.onPointerDown}
      onPointerMove={drag.onPointerMove}
      onPointerUp={drag.onPointerUp}
      onPointerCancel={drag.onPointerCancel}
    >
      <div
        className={styles.track}
        ref={trackRef}
        style={{ paddingLeft: `calc(15vw + ${offset}px)` }}
      >
        {photos.map((photo) => (
          <figure
            key={photo.src}
            className={styles.item}
            style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
          >
            <button
              type="button"
              className={styles.button}
              aria-label={`open photo: ${photo.caption}`}
              onClick={() => {
                if (!drag.wasDragged()) onOpen(photo)
              }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 45vw, 360px"
                draggable={false}
                className={styles.image}
              />
            </button>
            <figcaption className={styles.caption}>{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
