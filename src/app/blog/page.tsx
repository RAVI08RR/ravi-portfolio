"use client"

import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt, excerpt}`;

export default function BlogPage() {
  const [posts, setPosts] = useState<SanityDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await client.fetch<SanityDocument[]>(POSTS_QUERY);
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
  
  return (
    <>
      <Navbar />
      <main className="container mx-auto min-h-screen max-w-4xl p-8 pt-32">
        <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xl text-gray-600 dark:text-gray-400">
              No blog posts found. Check back soon!
            </p>
          </div>
        ) : (
          <ul className="grid gap-8">
            {posts.map((post) => (
              <li 
                key={post._id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <Link href={`/blog/${post.slug.current}`}>
                  <h2 className="text-2xl font-semibold hover:text-blue-600 dark:hover:text-blue-400 mb-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  {post.excerpt && (
                    <p className="text-gray-700 dark:text-gray-300">
                      {post.excerpt}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </>
  );
}