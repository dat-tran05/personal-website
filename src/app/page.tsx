import { InlineLink } from '@/components/InlineLink/InlineLink'
import { SocialLinks } from '@/components/SocialLinks/SocialLinks'
import { VisuallyHidden } from '@/components/VisuallyHidden/VisuallyHidden'
import { site } from '@/content/site'
import styles from './page.module.css'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({ description: site.description, path: '/' })

export default function AboutPage() {
  return (
    <section className={styles.about}>
      <VisuallyHidden as="h1">{site.name}</VisuallyHidden>
      <div className={styles.text}>
        <p>
          hi! i&apos;m dat. i am a student at mit studying cs. i&apos;m passionate about
          building technology that serves and considers people.
        </p>
        <p>
          currently, i am exploring ai safety and research. most recently, i worked at{' '}
          <InlineLink href="/experience">netic</InlineLink>, building out agent harnesses
          and evals for essential services businesses. before that, i founded{' '}
          <InlineLink href="/experience">horus health</InlineLink>, building ai for
          hospital revenue teams, and previously worked at{' '}
          <InlineLink href="https://amplitude.com">amplitude</InlineLink> and{' '}
          <InlineLink href="https://aws.amazon.com">aws</InlineLink>.
        </p>
        <p>
          right now, i spend my free time training for a triathlon, learning the guitar,
          perfecting my latte art, and reading. currently it&apos;s{' '}
          <em>night sky with exit wounds</em> by ocean vuong. feel free to send recs!
        </p>
      </div>
      <SocialLinks />
    </section>
  )
}
