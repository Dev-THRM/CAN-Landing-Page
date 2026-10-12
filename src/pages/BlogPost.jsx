import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft } from 'lucide-react';
import { blogPosts } from '../data/blogs';

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug || p.id.toString() === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

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

        {/* Optional Top Banner Image (Above Title) */}
        {post.bannerImage && (
          <div className="w-full aspect-[21/9] rounded-[28px] overflow-hidden bg-black/50 border border-white/10 mb-10 shadow-2xl relative">
            <img src={post.bannerImage} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

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

        {/* Featured Image */}
        {post.image && (
          <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-[32px] overflow-hidden bg-black/50 border border-white/10 mb-16 shadow-[0_30px_80px_rgba(0,0,0,0.8)] relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 pointer-events-none"></div>
            <img src={post.image} alt={post.title} className="w-full h-full object-cover relative z-0 group-hover:scale-[1.02] transition-transform duration-700" />
          </div>
        )}

        {/* Content (HTML or Markdown) */}
        {post.content && (post.content.trim().startsWith('<') || post.content.includes('<p>') || post.content.includes('<h2>') || post.content.includes('<div>')) ? (
          <div 
            className="prose prose-invert prose-lg max-w-none prose-headings:font-semibold prose-headings:text-white prose-headings:tracking-normal prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:font-semibold prose-h2:mt-10 prose-h2:mb-4 prose-a:text-cyan-400 hover:prose-a:text-cyan-300 prose-p:text-gray-300 prose-p:leading-relaxed prose-strong:text-white prose-strong:font-bold prose-ul:my-4 prose-li:my-1.5 prose-img:rounded-2xl prose-img:border prose-img:border-white/10 prose-img:shadow-2xl"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        ) : (
          <div className="prose prose-invert prose-lg max-w-none prose-headings:font-light prose-headings:tracking-tight prose-a:text-cyan-400 hover:prose-a:text-cyan-300 prose-p:text-gray-300 prose-p:leading-relaxed">
            <ReactMarkdown
              components={{
                img: ({ node, ...props }) => (
                  <div className="my-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/40">
                    <img {...props} className="w-full h-auto max-h-[520px] object-cover" alt={props.alt || 'Blog illustration'} />
                    {props.alt && (
                      <p className="text-xs text-gray-400 text-center py-2.5 bg-black/60 border-t border-white/5 font-medium m-0">
                        {props.alt}
                      </p>
                    )}
                  </div>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        )}

        {/* Secondary Image (Below Article) */}
        {post.secondaryImage && (
          <div className="mt-14 w-full rounded-[28px] overflow-hidden bg-black/50 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative group">
            <img 
              src={post.secondaryImage} 
              alt={post.secondaryImageCaption || `${post.title} - secondary illustration`} 
              className="w-full h-auto max-h-[550px] object-cover group-hover:scale-[1.02] transition-transform duration-700" 
            />
            {post.secondaryImageCaption && (
              <p className="text-xs text-gray-400 text-center py-3 bg-black/60 border-t border-white/5 font-medium m-0">
                {post.secondaryImageCaption}
              </p>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default BlogPost;
