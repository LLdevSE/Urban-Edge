import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "Why Investing in Gampaha is the Next Big Move",
      excerpt: "Gampaha is seeing unprecedented growth due to the new highway developments and infrastructure projects...",
      date: "Dec 15, 2025",
      author: "Urban Edge Team",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Top 5 Things to Check Before Buying Land in Sri Lanka",
      excerpt: "Legal verification is key. Learn about Bim Saviya and other crucial document checks you must perform...",
      date: "Dec 10, 2025",
      author: "Legal Dept",
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Understanding Land Valuation in 2026",
      excerpt: "How market trends and regional developments are affecting land prices across the Western Province...",
      date: "Dec 05, 2025",
      author: "Market Analyst",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="bg-lightGray min-h-screen pb-24">
      <section className="bg-white py-20 border-b">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-montserrat text-textDark mb-4">Latest Insights & News</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Stay updated with the latest trends in the Sri Lankan real estate market and land development.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
                <div className="h-64 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase mb-4">
                    <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                    <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                  </div>
                  <h2 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">{post.title}</h2>
                  <p className="text-gray-600 mb-6 line-clamp-3">{post.excerpt}</p>
                  <button className="text-primary font-bold flex items-center gap-2 group/link">
                    Read Full Article
                    <ArrowRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
