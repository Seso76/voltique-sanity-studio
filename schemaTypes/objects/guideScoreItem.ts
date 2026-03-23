import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'guideScoreItem',
  title: 'Guide Score Item',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'localeString'
    }),
    defineField({
      name: 'points',
      title: 'Points',
      type: 'number'
    })
  ]
})
