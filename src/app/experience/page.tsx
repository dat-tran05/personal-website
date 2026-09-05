import { PageIntro } from '@/components/PageIntro/PageIntro'
import { Timeline } from '@/components/Timeline/Timeline'
import { experience } from '@/content/experience'

export default function ExperiencePage() {
  return (
    <PageIntro title="experience" intro="where i've worked and what i did there.">
      <Timeline entries={experience} />
    </PageIntro>
  )
}
