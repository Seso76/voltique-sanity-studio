import { defineField, defineType } from "sanity";

export default defineType({
  name: "page",
  title: "Pages",
  type: "document",
  fields: [
    defineField({
      name: "pageKey",
      title: "Page",
      type: "string",
      options: {
        list: [
          { title: "About", value: "about" },
          { title: "Process", value: "process" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "localeString",
      validation: (Rule) => Rule.required(),
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
    defineField({
      name: "contentEn",
      title: "Content EN",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "contentBg",
      title: "Content BG",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  preview: {
    select: {
      title: "pageKey",
    },
    prepare(selection) {
      return {
        title: selection.title || "Page",
      };
    },
  },
});
