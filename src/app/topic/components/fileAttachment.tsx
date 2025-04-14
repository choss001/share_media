// FileAttachment.ts
import { Node, mergeAttributes } from '@tiptap/core'

export const FileAttachment = Node.create({
  name: 'fileAttachment',

  group: 'block',

  atom: true,

  addAttributes() {
    return {
      src: {},
      name: {},
    }
  },

  parseHTML() {
    return [
      {
        tag: 'a[data-type="file-attachment"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'a',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'file-attachment',
        href: HTMLAttributes.src,
        download: HTMLAttributes.name,
      }),
      `📎 ${HTMLAttributes.name}`,
    ]
  },

  addNodeView() {
    return ({ HTMLAttributes }) => {
      const a = document.createElement('a')
      a.href = HTMLAttributes.src
      a.innerText = `첨부파일 : 📎 ${HTMLAttributes.name}`
      a.setAttribute('download', HTMLAttributes.name)
      a.setAttribute('data-type', 'file-attachment')
      return {
        dom: a,
      }
    }
  },
})