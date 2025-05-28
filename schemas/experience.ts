export default {
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    {
      name: 'company',
      title: 'Company Name',
      type: 'string',
      validation: (Rule: any) => Rule.required().min(1).error('Company name is required')
    },
    {
      name: 'position',
      title: 'Position',
      type: 'string',
      validation: (Rule: any) => Rule.required().min(1).error('Position is required')
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g., "03/2023 – Present" or "09/2022 – 02/2023"',
      validation: (Rule: any) => Rule.required().min(1).error('Duration is required')
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      options: {
        dateFormat: 'MM/YYYY'
      },
      validation: (Rule: any) => Rule.required().error('Start date is required')
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      options: {
        dateFormat: 'MM/YYYY'
      },
      description: 'Leave empty if this is your current position'
    },
    {
      name: 'isCurrent',
      title: 'Is Current Position',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        {
          type: 'string',
          validation: (Rule: any) => Rule.required().min(5).error('Each description item should be at least 5 characters')
        }
      ],
      validation: (Rule: any) => Rule.required().min(1).error('At least one description item is required')
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers appear first (chronologically newest)',
      initialValue: 0,
      validation: (Rule: any) => Rule.required().error('Order is required for sorting')
    }
  ],
  orderings: [
    {
      title: 'Chronological Order',
      name: 'chronologicalOrder',
      by: [
        {field: 'order', direction: 'asc'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'company',
      subtitle: 'position',
      description: 'duration'
    },
    prepare({ title, subtitle, description }: { title: string, subtitle: string, description: string }) {
      return {
        title,
        subtitle: `${subtitle} (${description})`
      }
    }
  }
}