import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'localeString',
    }),

    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'localeText',
    }),

    defineField({
      name: 'heroCTA',
      title: 'Hero CTA Text',
      type: 'localeString',
    }),

    defineField({
      name: 'trustPoints',
      title: 'Trust Points',
      type: 'array',
      of: [{type: 'localeString'}],
    }),

    defineField({
      name: 'featuredSectionTitle',
      title: 'Featured Section Title',
      type: 'localeString',
    }),

    defineField({
      name: 'featuredSectionIntro',
      title: 'Featured Section Intro',
      type: 'localeText',
    }),
  ],
})
