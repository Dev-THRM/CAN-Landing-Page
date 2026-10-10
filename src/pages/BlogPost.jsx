import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft } from 'lucide-react';
import { blogPosts } from '../data/blogs';

const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="bg-[#050505] text-white min-h-screen flex items-center justify-center font-sans">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Blog not found</h1>
          <Link to="/blog" className="text-cyan-400 hover:underline">Return to Blogs</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] text-white min-h-screen font-sans overflow-hidden pt-24 pb-32">
      <div className="max-w-4xl mx-auto px-6 sm:px-12 md:px-16">
        
        {/* Back Button */}
        <Link to="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-10 group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-semibold tracking-widest uppercase">Back to Blogs</span>
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-white leading-tight mb-6">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
            <span>{post.date}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-700"></span>
            <span>By {post.author}</span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-[32px] overflow-hidden bg-black/50 border border-white/10 mb-16 shadow-[0_30px_80px_rgba(0,0,0,0.8)] relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
          <img src={post.image} alt={post.title} className="w-full h-full object-cover relative z-0" />
        </div>

        {/* Content (Markdown) */}
        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-light prose-headings:tracking-tight prose-a:text-cyan-400 hover:prose-a:text-cyan-300 prose-p:text-gray-300 prose-p:leading-relaxed">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

      </div>
    </div>
  );
};

export default BlogPost;
