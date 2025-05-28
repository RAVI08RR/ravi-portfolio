export default {
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon name from React Icons (e.g., "SiReact" for React icon)',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Frontend', value: 'frontend' },
          { title: 'Backend', value: 'backend' },
          { title: 'Database', value: 'database' },
          { title: 'DevOps', value: 'devops' },
          { title: 'Tools', value: 'tools' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'proficiency',
      title: 'Proficiency',
      type: 'number',
      description: 'Proficiency level from 1-100',
      validation: (Rule: any) => Rule.min(1).max(100).required(),
    },
  ],
}