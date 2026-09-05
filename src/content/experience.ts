export type ExperienceEntry = {
  /** Display date, e.g. "2024" or "2025 –". */
  when: string
  org: string
  role: string
  what: string
  /** When present, `what` renders as a link to this URL. */
  link?: { href: string }
}

export const experience: readonly ExperienceEntry[] = [
  {
    when: '2025 –',
    org: 'mit',
    role: 'student, computer science',
    what: 'alignment and frontier research.',
  },
  {
    when: '2024',
    org: 'netic',
    role: 'engineer',
    what: 'built agent harnesses and evals for essential services businesses.',
  },
  {
    when: '2023',
    org: 'horus health',
    role: 'founder',
    what: 'ai for hospital revenue teams.',
  },
  {
    when: '2022',
    org: 'amplitude',
    role: 'software engineer intern',
    what: 'agent analytics and infra.',
    link: { href: 'https://amplitude.com/blog/agent-analytics' },
  },
  {
    when: '2021',
    org: 'aws',
    role: 'software engineer intern',
    what: 'elastic container service enhanced observability.',
    link: {
      href: 'https://aws.amazon.com/blogs/aws/container-insights-with-enhanced-observability-now-available-in-amazon-ecs/',
    },
  },
]
