import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

async function getPost(slug: string): Promise<SanityDocument> {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    "mainImage": mainImage.asset->url,
    body,
    tags
  }`;
  
  const post = await client.fetch(query, { slug });
  
  if (!post) {
    throw new Error(`Post not found for slug: ${slug}`);
  }
  
  return post;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  
  return {
    title: `${post.title} | Blog`,
    description: post.excerpt || `Read ${post.title} on Ravi Belpade's blog`,
  };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  
  return (
    <>
      <Navbar />
      <main className="container mx-auto min-h-screen max-w-3xl p-8 pt-32">
        <Link href="/blog" className="text-blue-600 dark:text-blue-400 mb-6 inline-block">
          ← Back to all posts
        </Link>
        
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          
          {post.mainImage && (
            <div className="mb-8">
              <Image 
                src={post.mainImage} 
                alt={post.title}
                width={800}
                height={500}
                className="rounded-lg"
              />
            </div>
          )}
          
          {/* This is a simplified version - in a real app, you'd use a Portable Text component */}
          <div className="mt-8">
            {post.body ? (
              <div>
                {/* This is where you'd render the Portable Text content */}
                <p className="text-gray-700 dark:text-gray-300">
                  {typeof post.body === 'string' 
                    ? post.body 
                    : 'This content requires a Portable Text renderer.'}
                </p>
              </div>
            ) : (
              <p className="text-gray-700 dark:text-gray-300">No content available.</p>
            )}
          </div>
          
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <span 
                    key={tag}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}