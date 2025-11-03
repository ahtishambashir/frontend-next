import Link from "next/link";
import { notFound } from "next/navigation";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface PageProps {
  params: {
    id: string;
  };
}

async function getPost(id: string): Promise<Post | null> {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error(`Failed to fetch post ${id}: ${response.status}`);
      return null;
    }

    const post: Post = await response.json();
    return post;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export default async function PostDetailPage({ params }: PageProps) {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) {
    notFound();
  }
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/posts"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Posts
        </Link>
        <article className="bg-white rounded-lg shadow-lg p-8">
          {/* Post Header */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-bold text-lg">
                {post.id}
              </span>
              <div>
                <p className="text-sm text-gray-500">Post #{post.id}</p>
                <p className="text-sm text-gray-500">User ID: {post.userId}</p>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 capitalize leading-tight">
              {post.title}
            </h1>
          </div>

          {/* Post Body */}
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed text-lg">{post.body}</p>
          </div>
        </article>
      </div>
    </div>
  );
}
