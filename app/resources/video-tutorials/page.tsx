'use client';

import { useState, useEffect } from "react";
import {
  PlayCircle,
  Search,
  Lock,
  Timer,
  Video,
  HelpCircle,
  Filter,
} from "lucide-react";

// Type for Video object
type VideoType = {
  id: number;
  title: string;
  duration: string;
  description: string;
  category: string;
  status: "live" | "coming-soon";
  thumbnail: string;
};

export default function VideoTutorials() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVideos, setFilteredVideos] = useState<VideoType[]>([]);

  // Video Data
  const videoData: VideoType[] = [
    { id: 1, title: "Introduction to Vaiket", duration: "2:10", description: "Quick overview & what you can do", category: "getting-started", status: "live", thumbnail: "" },
    { id: 2, title: "Create Your Vaiket Account", duration: "1:35", description: "Sign up & login", category: "getting-started", status: "live", thumbnail: "" },
    { id: 3, title: "Dashboard Overview", duration: "2:45", description: "Where everything is", category: "getting-started", status: "coming-soon", thumbnail: "" },
    { id: 5, title: "Connect Your Domain", duration: "3:50", description: "Complete setup", category: "email-security", status: "live", thumbnail: "" },
    { id: 8, title: "Enable AI Auto Replies", duration: "3:00", description: "Automation setup", category: "ai-automation", status: "live", thumbnail: "" },
    { id: 11, title: "Lead Capture from Emails", duration: "2:55", description: "Auto tag customers", category: "lead-tracking", status: "live", thumbnail: "" },
    { id: 13, title: "Fix email not sending issue", duration: "2:20", description: "Solve common problems", category: "troubleshooting", status: "live", thumbnail: "" },
  ];

  // Category Tabs
  const categories = [
    { id: "all", name: "All Videos" },
    { id: "getting-started", name: "Getting Started" },
    { id: "email-security", name: "Email Setup & Security" },
    { id: "ai-automation", name: "AI Automation" },
    { id: "lead-tracking", name: "Lead Tracking" },
    { id: "troubleshooting", name: "Troubleshooting" },
  ];

  // Filter videos
  useEffect(() => {
    let results = videoData;

    if (activeCategory !== "all") {
      results = results.filter((v) => v.category === activeCategory);
    }

    if (searchQuery) {
      results = results.filter((v) =>
        v.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredVideos(results);
  }, [activeCategory, searchQuery]);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="px-6 py-20 text-center bg-gradient-to-br from-purple-700 to-indigo-800">
        <h1 className="text-4xl md:text-6xl font-bold">Learn Vaiket in Minutes</h1>
        <p className="mt-4 text-lg text-purple-200 max-w-2xl mx-auto">
          Quick videos to help you set up AI automation & business email smoothly.
        </p>

        {/* Search */}
        <div className="max-w-xl mx-auto mt-8 relative">
          <input
            type="text"
            placeholder="Search tutorials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white text-black rounded-full px-5 py-3 outline-none"
          />
          <Search className="w-5 h-5 text-gray-700 absolute right-4 top-3.5" />
        </div>
      </section>

      {/* Category Tabs */}
      <div className="sticky top-0 z-20 bg-black/90 backdrop-blur-md border-b border-white/10 px-6 py-4">
        <div className="flex overflow-x-auto space-x-3 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`px-4 py-2 rounded-full text-sm transition ${
                activeCategory === cat.id
                  ? "bg-purple-600 text-white"
                  : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
              }`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Videos Grid */}
      <div className="max-w-6xl mx-auto px-6 py-14">
        <h2 className="text-xl font-semibold mb-6">
          Showing {filteredVideos.length} video
          {filteredVideos.length !== 1 ? "s" : ""}
        </h2>

        {filteredVideos.length === 0 ? (
          <p className="text-zinc-500 text-center py-10">No videos found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredVideos.map((v) => (
              <div
                key={v.id}
                className="bg-zinc-900 rounded-xl border border-white/10 hover:border-purple-400/50 transition-all p-4"
              >
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-40 rounded-lg flex items-center justify-center relative">
                  {v.status === "live" ? (
                    <PlayCircle className="w-14 h-14 text-white opacity-90" />
                  ) : (
                    <Lock className="w-14 h-14 text-white opacity-70" />
                  )}
                  <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs">
                    {v.duration}
                  </div>
                </div>

                <h3 className="text-lg font-bold mt-3">{v.title}</h3>
                <p className="text-sm text-zinc-400 mb-4">
                  {v.description}
                </p>

                {v.status === "live" ? (
                  <button className="flex items-center gap-2 text-purple-400 hover:text-purple-200">
                    Watch Now <Video className="w-4 h-4" />
                  </button>
                ) : (
                  <span className="inline-flex px-2 py-1 text-xs rounded bg-yellow-500/20 text-yellow-300 font-medium">
                    Coming Soon
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="text-center py-16 bg-zinc-950 border-t border-white/10">
        <h3 className="text-xl font-semibold">Need More Help?</h3>
        <p className="text-zinc-400 mt-2">Our team is always here to assist you.</p>
        <a
          href="/company/contact-support"
          className="mt-6 inline-flex items-center justify-center px-6 py-3 bg-purple-600 rounded-full text-white hover:bg-purple-500"
        >
          Contact Support
        </a>
      </div>
    </main>
  );
}
