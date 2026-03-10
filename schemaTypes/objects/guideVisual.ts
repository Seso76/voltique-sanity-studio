import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'guideVisual',
  title: 'Guide Visual',
  type: 'object',
  fields: [
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          {title: 'Infographic', value: 'infographic'},
          {title: 'Icon Grid', value: 'iconGrid'},
          {title: 'Stat Card', value: 'statCard'},
          {title: 'Checklist Box', value: 'checklistBox'},
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'localeText',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', title: 'Label', type: 'localeString'},
            {name: 'value', title: 'Value', type: 'string'},
            {name: 'icon', title: 'Icon', type: 'string'},
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      media: 'image',
      subtitle: 'style',
    },
  },
})
