import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { blogPosts } from '../data/blogs';

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#050505] text-white min-h-screen font-sans overflow-hidden">
      
      {/* HEADER SECTION */}
      <section className="relative pt-28 pb-12 px-6 sm:px-12 md:px-16 lg:px-24 bg-[#06070a] border-b border-white/5 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-10 -right-24 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-10 -left-24 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-cyan-400 font-semibold mb-6 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-sm shadow-[0_0_15px_rgba(34,211,238,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            INSIGHTS & NEWS
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-light tracking-tight text-white leading-[1.08] max-w-4xl mx-auto mb-6">
            Blog is Must For Our Readers,<br className="hidden sm:inline" /> Trend keepers.
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 font-light max-w-2xl mx-auto">
            Stay updated with the latest trends, insights, and technological advancements in the world of digital displays and signage.
          </p>
        </div>
      </section>

      {/* BLOG GRID SECTION */}
      <section className="py-24 sm:py-32 px-6 sm:px-12 md:px-16 lg:px-24 bg-[#050505] relative">
        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            {blogPosts.map((post) => (
              <Link to={`/blog/${post.id}`} key={post.id} className="group block rounded-[28px] sm:rounded-[32px] overflow-hidden bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-cyan-500/40 transition-all duration-500 flex flex-col justify-between shadow-xl hover:shadow-[0_25px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(34,211,238,0.15)] interactive cursor-pointer p-8 sm:p-10 lg:p-12 h-full">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-black/60 mb-6 border border-white/5">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                </div>
                <div className="flex flex-col justify-between flex-1">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-white group-hover:text-cyan-300 transition-colors leading-relaxed mb-8">
                    {post.title}
                  </h3>
                  <div className="pt-5 mt-auto border-t border-white/10 flex items-center justify-between text-xs sm:text-sm font-semibold tracking-wider uppercase text-cyan-400 group-hover:translate-x-1 transition-transform">
                    <span>Read Article</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};

export default Blog;
