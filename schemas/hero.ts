export default {
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required().min(1).error('Name is required')
    },
    {
      name: 'title',
      title: 'Professional Title',
      type: 'string',
      validation: (Rule: any) => Rule.required().min(1).error('Title is required')
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: any) => Rule.required().min(10).error('Description should be at least 10 characters')
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule: any) => Rule.required().email().error('Invalid email address')
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: (Rule: any) => Rule.required().min(10).error('Phone number should be at least 10 digits')
    },
    {
      name: 'linkedIn',
      title: 'LinkedIn URL',
      type: 'url',
      validation: (Rule: any) => Rule.required().uri().error('Invalid LinkedIn URL')
    },
    {
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          validation: (Rule: any) => Rule.required().error('Alternative text is required for accessibility')
        }
      ],
      validation: (Rule: any) => Rule.required().error('Profile image is required')
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'profileImage'
    }
  }
}