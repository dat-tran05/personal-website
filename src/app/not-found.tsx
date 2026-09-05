import { InlineLink } from '@/components/InlineLink/InlineLink'
import { PageIntro } from '@/components/PageIntro/PageIntro'

export default function NotFound() {
  return (
    <PageIntro title="not found" intro="nothing here.">
      <p>
        <InlineLink href="/">back to about</InlineLink>
      </p>
    </PageIntro>
  )
}
