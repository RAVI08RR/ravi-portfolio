import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Portfolio CMS',

  projectId: 'vr05dnd0',
  dataset: 'production',
  
  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  basePath: '/studio',
})