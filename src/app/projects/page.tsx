import { PageIntro } from '@/components/PageIntro/PageIntro'
import { ProjectList } from '@/components/ProjectList/ProjectList'
import { projects } from '@/content/projects'

export default function ProjectsPage() {
  return (
    <PageIntro title="projects" intro="things i've built and research i've worked on.">
      <ProjectList projects={projects} />
    </PageIntro>
  )
}
