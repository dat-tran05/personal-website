type Props = { data: Record<string, unknown> }

/** Emits a JSON-LD script tag. The data is our own, so no HTML escaping beyond `<` is needed. */
export function JsonLd({ data }: Props) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c')
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
