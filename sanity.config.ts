import {media} from "sanity-plugin-media"
import {media} from "sanity-plugin-media"
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Voltique site',

  projectId: '45q738u1',
  dataset: 'production',

  plugins: [
    media(),structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
