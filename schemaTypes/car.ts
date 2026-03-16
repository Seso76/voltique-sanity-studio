import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'car',
  title: 'Car',
  type: 'document',
  fieldsets: [
    {name: 'basic', title: 'Basic Info', options: {collapsible: true}},
    {name: 'specs', title: 'Specifications', options: {collapsible: true, collapsed: true}},
    {name: 'condition', title: 'Condition & History', options: {collapsible: true, collapsed: true}},
    {name: 'warranty', title: 'Warranty', options: {collapsible: true, collapsed: true}},
    {name: 'seo', title: 'SEO', options: {collapsible: true, collapsed: true}},
  ],
  fields: [
    // === BASIC INFO ===
    defineField({
      name: 'title',
      title: 'Title (BG/EN)',
      type: 'localeString',
      fieldset: 'basic',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      fieldset: 'basic',
      options: {source: (doc) => (doc.title as any)?.en || (doc.title as any)?.bg || ''},
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'brand',
      title: 'Brand',
      type: 'string',
      fieldset: 'basic',
      initialValue: 'Tesla',
    }),

    defineField({
      name: 'model',
      title: 'Model',
      type: 'string',
      fieldset: 'basic',
      options: {
        list: ['Model 3', 'Model Y', 'Model S', 'Model X'],
      },
    }),

    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      fieldset: 'basic',
      description: 'Example: Long Range, Performance, Standard Range',
    }),

    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      fieldset: 'basic',
      options: {list: ['available', 'reserved', 'sold']},
      initialValue: 'available',
    }),

    defineField({
      name: 'featured',
      title: 'Featured on Home',
      type: 'boolean',
      fieldset: 'basic',
      initialValue: false,
    }),

    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      fieldset: 'basic',
      description: 'Lower number = shown earlier',
    }),

    defineField({
      name: 'price',
      title: 'Price (€)',
      type: 'number',
      fieldset: 'basic',
    }),

    // === SPECS ===
    defineField({name: 'year', title: 'Year', type: 'number', fieldset: 'specs'}),
    defineField({name: 'mileage', title: 'Mileage (km)', type: 'number', fieldset: 'specs'}),

    defineField({
      name: 'drive',
      title: 'Drive',
      type: 'string',
      fieldset: 'specs',
      options: {list: ['RWD', 'AWD']},
    }),

    defineField({name: 'range', title: 'Range (WLTP km)', type: 'number', fieldset: 'specs'}),
    defineField({name: 'battery', title: 'Battery (kWh)', type: 'number', fieldset: 'specs'}),

    defineField({
      name: 'batteryChemistry',
      title: 'Battery Chemistry',
      type: 'string',
      fieldset: 'specs',
      options: {
        list: ['LFP', 'NCA', 'NMC', 'Unknown'],
      },
    }),

    defineField({
      name: 'colorExterior',
      title: 'Exterior Color',
      type: 'string',
      fieldset: 'specs',
    }),

    defineField({
      name: 'colorInterior',
      title: 'Interior Color',
      type: 'string',
      fieldset: 'specs',
    }),

    // === IMAGES ===
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {hotspot: true},
    }),

    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [{type: 'image'}],
    }),

    // === CONTENT ===
    defineField({
      name: 'highlights',
      title: 'Highlights (BG/EN)',
      type: 'object',
      description: 'Short selling points shown as bullets or badges',
      fields: [
        defineField({
          name: 'bg',
          title: 'Bulgarian',
          type: 'array',
          of: [{type: 'string'}],
        }),
        defineField({
          name: 'en',
          title: 'English',
          type: 'array',
          of: [{type: 'string'}],
        }),
      ],
    }),

    defineField({
      name: 'description',
      title: 'Description (BG/EN)',
      type: 'localeText',
    }),

    // === CONDITION & HISTORY ===
    defineField({
      name: 'conditionSummary',
      title: 'Condition Summary (BG/EN)',
      type: 'localeText',
      fieldset: 'condition',
    }),

    defineField({
      name: 'originCountry',
      title: 'Origin Country',
      type: 'string',
      fieldset: 'condition',
    }),

    defineField({
      name: 'ownersCount',
      title: 'Owners Count',
      type: 'number',
      fieldset: 'condition',
    }),

    defineField({
      name: 'serviceInfo',
      title: 'Service Information (BG/EN)',
      type: 'localeText',
      fieldset: 'condition',
    }),

    defineField({
      name: 'accidentInfo',
      title: 'Accident Information (BG/EN)',
      type: 'localeText',
      fieldset: 'condition',
    }),

    // === WARRANTY ===
    defineField({
      name: 'teslaWarrantyUsedUntilDate',
      title: 'Tesla Used Vehicle Warranty Until (date)',
      type: 'date',
      fieldset: 'warranty',
    }),

    defineField({
      name: 'teslaWarrantyUsedUntilKm',
      title: 'Tesla Used Vehicle Warranty Until (km)',
      type: 'number',
      fieldset: 'warranty',
    }),

    defineField({
      name: 'teslaWarrantyBatteryUntilDate',
      title: 'Tesla Battery Warranty Until (date)',
      type: 'date',
      fieldset: 'warranty',
    }),

    defineField({
      name: 'teslaWarrantyBatteryUntilKm',
      title: 'Tesla Battery Warranty Until (km)',
      type: 'number',
      fieldset: 'warranty',
    }),

    // === SEO ===
    defineField({
      name: 'seoTitle',
      title: 'SEO Title (BG/EN)',
      type: 'localeString',
      fieldset: 'seo',
    }),

    defineField({
      name: 'seoDescription',
      title: 'SEO Description (BG/EN)',
      type: 'localeText',
      fieldset: 'seo',
    }),
  ],

  preview: {
    select: {
      titleEn: 'title.en',
      titleBg: 'title.bg',
      status: 'status',
      media: 'coverImage',
    },
    prepare({titleEn, titleBg, status, media}) {
      return {
        title: titleEn || titleBg || 'Untitled',
        subtitle: status ? status.toUpperCase() : '',
        media,
      }
    },
  },
})
