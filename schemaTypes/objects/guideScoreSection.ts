import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'guideScoreSection',
  title: 'Guide Score Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString'
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{type: 'guideScoreItem'}]
    })
  ]
})
