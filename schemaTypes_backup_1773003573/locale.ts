// schemaTypes/locale.ts

import {defineType, defineField} from 'sanity'

export const localeString = defineType({
  name: 'localeString',
  title: 'Localized string',
  type: 'object',
  fields: [
    defineField({
      name: 'bg',
      title: 'Bulgarian (BG)',
      type: 'string',
    }),
    defineField({
      name: 'en',
      title: 'English (EN)',
      type: 'string',
    }),
  ],
})

export const localeText = defineType({
  name: 'localeText',
  title: 'Localized text',
  type: 'object',
  fields: [
    defineField({
      name: 'bg',
      title: 'Bulgarian (BG)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'en',
      title: 'English (EN)',
      type: 'text',
      rows: 4,
    }),
  ],
})