import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'guideScoreTool',
  title: 'Guide Score Tool',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString'
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'localeText'
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [{type: 'guideScoreSection'}]
    }),
    defineField({
      name: 'results',
      title: 'Results',
      type: 'array',
      of: [{type: 'guideScoreBand'}]
    })
  ]
})
