import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
    }),

    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),

    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),

    defineField({
      name: 'whatsapp',
      title: 'WhatsApp',
      type: 'string',
    }),

    defineField({
      name: 'instagram',
      title: 'Instagram',
      type: 'url',
    }),

    defineField({
      name: 'facebook',
      title: 'Facebook',
      type: 'url',
    }),

    defineField({
      name: 'linkedin',
      title: 'LinkedIn',
      type: 'url',
    }),

    defineField({
      name: 'defaultSeoTitle',
      title: 'Default SEO Title',
      type: 'string',
    }),

    defineField({
      name: 'defaultSeoDescription',
      title: 'Default SEO Description',
      type: 'text',
      rows: 3,
    }),
  ],
})
