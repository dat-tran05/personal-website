export type Photo = {
  /** Path under /public. */
  src: string
  width: number
  height: number
  alt: string
  /** Shown on hover and in the lightbox. */
  caption: string
}

// Placeholder gradients until real photos are dropped into public/photos.
export const photos: readonly Photo[] = [
  {
    src: '/photos/01.jpg',
    width: 1600,
    height: 1067,
    alt: 'warm terracotta gradient',
    caption: 'placeholder · somewhere warm',
  },
  {
    src: '/photos/02.jpg',
    width: 1067,
    height: 1600,
    alt: 'dark stone gradient',
    caption: 'placeholder · early morning',
  },
  {
    src: '/photos/03.jpg',
    width: 1600,
    height: 1067,
    alt: 'peach and umber gradient',
    caption: 'placeholder · golden hour',
  },
  {
    src: '/photos/04.jpg',
    width: 1600,
    height: 1200,
    alt: 'paper and rust gradient',
    caption: 'placeholder · from the train',
  },
  {
    src: '/photos/05.jpg',
    width: 1067,
    height: 1600,
    alt: 'deep rust gradient',
    caption: 'placeholder · a long climb',
  },
  {
    src: '/photos/06.jpg',
    width: 1600,
    height: 1067,
    alt: 'charcoal and peach gradient',
    caption: 'placeholder · after the rain',
  },
  {
    src: '/photos/07.jpg',
    width: 1600,
    height: 1067,
    alt: 'terracotta and charcoal gradient',
    caption: 'placeholder · low tide',
  },
  {
    src: '/photos/08.jpg',
    width: 1200,
    height: 1600,
    alt: 'pale peach gradient',
    caption: 'placeholder · window seat',
  },
  {
    src: '/photos/09.jpg',
    width: 1600,
    height: 1067,
    alt: 'muted stone gradient',
    caption: 'placeholder · the quiet street',
  },
  {
    src: '/photos/10.jpg',
    width: 1600,
    height: 1067,
    alt: 'night gradient',
    caption: 'placeholder · last light',
  },
  {
    src: '/photos/11.jpg',
    width: 1067,
    height: 1600,
    alt: 'linen and rust gradient',
    caption: 'placeholder · looking up',
  },
  {
    src: '/photos/12.jpg',
    width: 1600,
    height: 1067,
    alt: 'peach and ink gradient',
    caption: 'placeholder · heading home',
  },
]
