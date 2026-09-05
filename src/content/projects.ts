export type Project = {
  name: string
  year: string
  url: string
  what: string
}

// Placeholder entries: replace with real projects.
export const projects: readonly Project[] = [
  {
    name: 'project one',
    year: '2026',
    url: '#',
    what: 'one or two lines on what it is and why you built it.',
  },
  { name: 'project two', year: '2025', url: '#', what: 'another short description.' },
  { name: 'project three', year: '2024', url: '#', what: 'short description here.' },
]
