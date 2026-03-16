import { defineField, defineType } from "sanity";

export default defineType({
  name: "car",
  title: "Car",
  type: "document",
  fields: [

    {
      name: "teslaWarrantyUsedUntilDate",
      title: "Tesla Used Vehicle Warranty Until (date)",
      type: "date",
    },
    {
      name: "teslaWarrantyUsedUntilKm",
      title: "Tesla Used Vehicle Warranty Until (km)",
      type: "number",
    },
    {
      name: "teslaWarrantyBatteryUntilDate",
      title: "Tesla Battery Warranty Until (date)",
      type: "date",
    },
    {
      name: "teslaWarrantyBatteryUntilKm",
      title: "Tesla Battery Warranty Until (km)",
      type: "number",
    },

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
      name: "brand",
      title: "Brand",
      type: "string",
      initialValue: "Tesla",
    }),

    defineField({
      name: "model",
      title: "Model",
      type: "string",
      options: {
        list: ["Model 3", "Model Y", "Model S", "Model X"],
      },
    }),

    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      description: "Example: Long Range, Performance, Standard Range",
    }),

    defineField({
      name: "featured",
      title: "Featured on Home",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      description: "Lower number = shown earlier",
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
      name: "batteryChemistry",
      title: "Battery Chemistry",
      type: "string",
      options: {
        list: ["LFP", "NCA", "NMC", "Unknown"],
      },
    }),

    defineField({
      name: "colorExterior",
      title: "Exterior Color",
      type: "string",
    }),

    defineField({
      name: "colorInterior",
      title: "Interior Color",
      type: "string",
    }),

    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "images",
      title: "Gallery Images",
      type: "array",
      of: [{ type: "image" }],
    }),

    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      of: [{ type: "string" }],
      description: "Short selling points shown as bullets or badges",
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),

    defineField({
      name: "conditionSummary",
      title: "Condition Summary",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "originCountry",
      title: "Origin Country",
      type: "string",
    }),

    defineField({
      name: "ownersCount",
      title: "Owners Count",
      type: "number",
    }),

    defineField({
      name: "serviceInfo",
      title: "Service Information",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "accidentInfo",
      title: "Accident Information",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["available", "reserved", "sold"] },
      initialValue: "available",
    }),

    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
    }),

    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
    }),
  ],
});
