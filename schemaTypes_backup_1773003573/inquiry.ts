import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'inquiry',
  title: 'Inquiries',
  type: 'document',
  fields: [

    defineField({
      name: 'customer',
      title: 'Customer',
      type: 'reference',
      to: [{type: 'customer'}],
    }),

    defineField({
      name: 'car',
      title: 'Car',
      type: 'reference',
      to: [{type: 'car'}],
    }),

    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
    }),

    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'New', value: 'new'},
          {title: 'Contacted', value: 'contacted'},
          {title: 'Closed', value: 'closed'},
        ],
      },
      initialValue: 'new',
    }),

    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
    }),

  ],
})