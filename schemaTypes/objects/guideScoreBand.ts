import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'guideScoreBand',
  title: 'Guide Score Band',
  type: 'object',
  fields: [
    defineField({
      name: 'min',
      title: 'Min score',
      type: 'number'
    }),
    defineField({
      name: 'max',
      title: 'Max score',
      type: 'number'
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'localeString'
    }),
    defineField({
      name: 'note',
      title: 'Note',
      type: 'localeText'
    })
  ]
})
