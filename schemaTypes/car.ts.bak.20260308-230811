import { defineField, defineType } from "sanity";

export default defineType({
  name: "car",
  title: "Car",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "featured",
      title: "Featured on Home",
      type: "boolean",
      initialValue: false,
    }),

    defineField({ name: "price", title: "Price (€)", type: "number" }),
    defineField({ name: "year", title: "Year", type: "number" }),
    defineField({ name: "mileage", title: "Mileage (km)", type: "number" }),

    defineField({
      name: "drive",
      title: "Drive",
      type: "string",
      options: { list: ["RWD", "AWD"] },
    }),
    defineField({ name: "range", title: "Range (WLTP km)", type: "number" }),
    defineField({ name: "battery", title: "Battery (kWh)", type: "number" }),

    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image" }],
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),

    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["available", "sold"] },
      initialValue: "available",
    }),
  ],
});