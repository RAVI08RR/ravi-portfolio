export default {
  name: 'about',
  title: 'About Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'About Me',
      validation: (Rule: any) => Rule.required().error('Section title is required')
    },
    {
      name: 'paragraphs',
      title: 'Paragraphs',
      type: 'array',
      of: [
        {
          type: 'text',
          validation: (Rule: any) => Rule.required().min(10).error('Each paragraph should be at least 10 characters')
        }
      ],
      validation: (Rule: any) => Rule.required().min(1).error('At least one paragraph is required')
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'paragraphs[0]'
    },
    prepare({ title, subtitle }: { title: string, subtitle: string }) {
      return {
        title,
        subtitle: subtitle ? (subtitle.length > 50 ? subtitle.substring(0, 50) + '...' : subtitle) : 'No content'
      }
    }
  }
}