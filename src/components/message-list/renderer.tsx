import { useState, useEffect } from 'react'

const Renderer = ({ value }: { value: string }) => {
  const [html, setHtml] = useState<string | null>(null)

  useEffect(() => {
    import('quill-delta-to-html').then(({ QuillDeltaToHtmlConverter }) => {
      try {
        const contents = JSON.parse(value)
        const converter = new QuillDeltaToHtmlConverter(contents.ops, {})
        const converted = converter.convert()

        const isEmpty = converted.replace(/<(.|\n)*?>/g, '').trim().length === 0
        setHtml(isEmpty ? null : converted)
      } catch {
        setHtml(null)
      }
    })
  }, [value])

  if (!html) return null

  return <div className='ql-editor ql-renderer' dangerouslySetInnerHTML={{ __html: html }} />
}

export default Renderer
