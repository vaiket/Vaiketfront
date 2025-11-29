// pages/blog/[slug].js
import { useRouter } from 'next/router';
import { Calendar, User, Clock, Tag, ArrowLeft, Share } from 'lucide-react';

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div className="min-h-screen bg-white">
      {/* Article Header */}
      <header className="bg-gradient-to-r from-purple-50 to-cyan-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <button 
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-purple-600 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </button>
          
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">Category</span>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              March 15, 2024
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              5 min read
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Blog Post Title Will Appear Here
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl">
            A compelling excerpt that summarizes what readers will learn from this article and why it matters for their business.
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
              <div>
                <p className="font-semibold text-gray-900">Vaiket Team</p>
                <p className="text-gray-600 text-sm">AI Communication Experts</p>
              </div>
            </div>
            <button className="flex items-center text-gray-600 hover:text-purple-600">
              <Share className="w-5 h-5 mr-2" />
              Share
            </button>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="container mx-auto px-4 max-w-4xl py-12">
        <div className="prose prose-lg max-w-none">
          {/* Article content would go here */}
          <p>This is where your blog post content would appear...</p>
          
          {/* CTA at the end of article */}
          <div className="bg-gradient-to-r from-purple-50 to-cyan-50 p-8 rounded-2xl my-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to automate your business communication?</h3>
            <p className="text-gray-600 mb-6">Start your journey with Vaiket today and transform how you handle customer emails.</p>
            <a
              href="/signup"
              className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-8 py-4 rounded-lg font-bold inline-block hover:shadow-lg transition-shadow"
            >
              Try Vaiket Free Today 🚀
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}