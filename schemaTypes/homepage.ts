import { defineField, defineType } from "sanity"

export default defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "localeString",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "localeText",
    }),
    defineField({
      name: "heroCTA",
      title: "Hero CTA",
      type: "localeString",
    }),
    defineField({
      name: "featuredCars",
      title: "Featured Cars",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "car" }],
        },
      ],
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "localeString",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "localeText",
    }),
  ],
})
