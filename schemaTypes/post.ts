import {defineField, defineType} from 'sanity'

const portableBlocks = [
  {
    type: 'block',
  },
  {
    type: 'image',
    options: {hotspot: true},
    fields: [
      {
        name: 'alt',
        title: 'Alt text',
        type: 'string',
      },
    ],
  },
  {
    type: 'guideVisual',
  },
  {
    type: 'guideScoreTool',
  },
]

export default defineType({
  name: 'post',
  title: 'Guide Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'featured',
      title: 'Featured Article',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          'Buying Guide',
          'Tesla Ownership',
          'Charging',
          'Battery',
          'Comparison',
          'Market Insight',
        ],
      },
    }),

    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        },
      ],
    }),

  defineField({
    name: 'socialImage',
    title: 'Social Share Image',
    description:
      'Used only for Facebook, Open Graph and other social previews.',
    type: 'image',
    options: {
      hotspot: true,
    },
    fields: [
      {
        name: 'alt',
        title: 'Alt text',
        type: 'string',
      },
    ],
  }),

    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'localeText',
    }),

    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'localeString',
    }),

    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'localeText',
    }),

    defineField({
      name: 'bodyEn',
      title: 'Article Content (EN)',
      type: 'array',
      of: portableBlocks,
    }),

    defineField({
      name: 'bodyBg',
      title: 'Article Content (BG)',
      type: 'array',
      of: portableBlocks,
    }),
  ],
})
