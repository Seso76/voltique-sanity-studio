import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'customer',
  title: 'Customers',
  type: 'document',
  fields: [

    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),

    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),

    defineField({
      name: 'authId',
      title: 'Auth ID',
      type: 'string',
      description: 'ID from Google / Apple login',
    }),

    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
    }),

  ],
})