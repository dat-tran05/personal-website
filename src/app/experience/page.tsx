import { PageIntro } from '@/components/PageIntro/PageIntro'
import { Timeline } from '@/components/Timeline/Timeline'
import { experience } from '@/content/experience'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: 'experience',
  description: "where dat tran has worked: mit, netic, horus health, amplitude, and aws.",
  path: '/experience',
})

export default function ExperiencePage() {
  return (
    <PageIntro title="experience" intro="where i've worked and what i did there.">
      <Timeline entries={experience} />
    </PageIntro>
  )
}
