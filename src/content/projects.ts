export type Project = {
  name: string
  year: string
  /** Optional; when absent the name renders as plain text. */
  url?: string
  what: string
}

export const projects: readonly Project[] = [
  {
    name: 'foodnex',
    year: '2022 –',
    what: 'ios and android app connecting organizations with surplus food to 37 food pantries and banks across 11 states. 1.2m+ pounds of food delivered so far.',
  },
  {
    name: 'maze craze',
    year: '2024',
    url: 'https://mazecraze.onrender.com',
    what: 'arcade-style multiplayer maze party game with real-time perks and coin collection. placed 2nd of 89 teams at mit weblab.',
  },
]
