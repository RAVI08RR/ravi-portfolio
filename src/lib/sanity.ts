import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: "vr05dnd0",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
})

const builder = imageUrlBuilder(client);

export function urlFor(source: { _ref: string; _type?: string }) {
  return builder.image(source);
}

// Helper function to fetch hero data
export async function getHeroData() {
  return client.fetch(`*[_type == "hero"][0] {
    _id,
    name,
    title,
    description,
    email,
    phone,
    linkedIn,
    "profileImageUrl": profileImage.asset->url,
    "profileImageAlt": profileImage.alt
  }`)
}

// Helper function to fetch about data
export async function getAboutData() {
  return client.fetch(`*[_type == "about"][0] {
    _id,
    title,
    paragraphs
  }`)
}

// Helper function to fetch experience data
export async function getExperienceData() {
  return client.fetch(`*[_type == "experience"] | order(order asc) {
    _id,
    company,
    position,
    duration,
    startDate,
    endDate,
    isCurrent,
    description,
    order
  }`)
}

// Helper function to fetch projects
export async function getProjects() {
  return client.fetch(`*[_type == "project"] | order(order asc) {
    _id,
    title,
    description,
    "imageUrl": imageUrl.asset->url,
    liveUrl,
    techStack,
    features
  }`)
}

// Helper function to fetch skills
export async function getSkills() {
  return client.fetch(`*[_type == "skill"] | order(name asc) {
    _id,
    name,
    icon,
    category,
    proficiency
  }`)
}