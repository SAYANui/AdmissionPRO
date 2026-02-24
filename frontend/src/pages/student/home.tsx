import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Info, 
  GraduationCap, 
  Home as HomeIcon, 
  ExternalLink, 
  Search, 
  SearchX,
  LogOut 
} from "lucide-react";

const FEED_DATA = [
  {
    id: "1",
    collegeName: "Tech University",
    title: "B.Tech Computer Science",
    description: "Learn AI, Web3, and Cloud Computing with 100% placement support.",
    mediaType: "video",
    mediaUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
    type: "Course"
  },
  {
    id: "2",
    collegeName: "Stanford Tuition",
    title: "Entrance Exam Prep",
    description: "Master your SAT/ACT exams with our expert educators.",
    mediaType: "image",
    mediaUrl: "https://images.pexels.com/photos/1070534/pexels-photo-1070534.jpeg?cs=srgb&dl=pexels-steve-1070534.jpg&fm=jpg",
    type: "Tuition"
  },
  {
    id: "2",
    collegeName: "Stanford Tuition",
    title: "Entrance Exam Prep",
    description: "Master your SAT/ACT exams with our expert educators.",
    mediaType: "image",
    mediaUrl: "https://images.pexels.com/photos/1070534/pexels-photo-1070534.jpeg?cs=srgb&dl=pexels-steve-1070534.jpg&fm=jpg",
    type: "Tuition"
  },
  {
    id: "2",
    collegeName: "Stanford Tuition",
    title: "Entrance Exam Prep",
    description: "Master your SAT/ACT exams with our expert educators.",
    mediaType: "image",
    mediaUrl: "https://images.pexels.com/photos/1070534/pexels-photo-1070534.jpeg?cs=srgb&dl=pexels-steve-1070534.jpg&fm=jpg",
    type: "Tuition"
  },{
    id: "2",
    collegeName: "Stanford Tuition",
    title: "Entrance Exam Prep",
    description: "Master your SAT/ACT exams with our expert educators.",
    mediaType: "image",
    mediaUrl: "https://images.pexels.com/photos/1070534/pexels-photo-1070534.jpeg?cs=srgb&dl=pexels-steve-1070534.jpg&fm=jpg",
    type: "Tuition"
  }
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFeed = FEED_DATA.filter((post) =>
    post.collegeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dark min-h-screen bg-slate-950 text-slate-50 font-sans pb-20 selection:bg-cyan-500/30">
      
      {/* 1. BRANDED HEADER (Updated with PC Navigation) */}
      <nav className="flex items-center justify-between px-4 md:px-8 py-6 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        
        {/* Logo */}
        <div className="group/logo relative">
          <div className="absolute -inset-1 bg-cyan-500 rounded-lg blur opacity-25 group-hover/logo:opacity-75 transition duration-1000"></div>
          <div className="relative flex items-center space-x-2 bg-slate-900 px-4 py-2 rounded-lg border border-slate-700">
            <GraduationCap className="h-6 w-6 text-cyan-400" />
            <span className="text-xl md:text-2xl font-black tracking-tighter text-cyan-400">
              Admission<span className="text-slate-50">PRO</span>
            </span>
          </div>
        </div>

        {/* Header Buttons (Right Side) */}
        <div className="flex items-center space-x-3">
          
          {/* PC ONLY: Check Status Button */}
          <div className="hidden md:block group/status relative">
            <div className="absolute -inset-1 bg-cyan-500 rounded-lg blur opacity-0 group-hover/status:opacity-30 transition duration-500"></div>
            <Button asChild variant="outline" className="relative border-slate-700 bg-slate-800/50 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all">
              <Link to="/student/statuspage" className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                Check Status
              </Link>
            </Button>
          </div>

          {/* Logout Button */}
          <div className="group/logout relative">
            <div className="absolute -inset-1 bg-red-500 rounded-lg blur opacity-0 group-hover/logout:opacity-20 transition duration-500"></div>
            <Button asChild variant="outline" className="relative border-slate-700 bg-slate-800/50 text-slate-300 hover:text-red-400 hover:border-red-500/50 transition-all">
              <Link to="/" className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* 2. MAIN FEED */}
      <main className="max-w-xl mx-auto mt-10 px-4">
        
        {/* Search Bar */}
        <div className="relative group mb-12">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl blur opacity-20 group-focus-within:opacity-50 transition duration-500"></div>
          <div className="relative flex items-center">
            <Search className="absolute left-4 h-5 w-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
            <Input 
              type="text"
              placeholder="Search your institution name...."
              className="pl-12 py-7 bg-slate-900 border-slate-800 text-lg rounded-xl focus-visible:ring-cyan-500 focus-visible:border-cyan-500 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <h2 className="text-cyan-400 font-bold tracking-[0.2em] text-xs uppercase mb-8">
          {searchQuery ? `Results for "${searchQuery}"` : "Discovery Feed"}
        </h2>

        {/* Cards */}
        <div className="space-y-12">
          {filteredFeed.length > 0 ? (
            filteredFeed.map((post) => (
              <div key={post.id} className="group relative">
                <div className="absolute -inset-1 bg-cyan-500 rounded-2xl blur opacity-0 group-hover:opacity-10 transition duration-500"></div>
                <Card className="relative bg-slate-900 border-slate-800 overflow-hidden rounded-2xl border-none shadow-2xl">
                  <CardHeader className="p-4 flex flex-row items-center justify-between">
                     <div className="flex items-center space-x-3">
                       <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-black text-slate-950 text-sm">
                         {post.collegeName.charAt(0)}
                       </div>
                       <div>
                         <p className="text-sm font-bold text-slate-100">{post.collegeName}</p>
                         <p className="text-[10px] text-cyan-500 font-bold tracking-widest uppercase">{post.type}</p>
                       </div>
                     </div>
                  </CardHeader>

                  <div className="aspect-video w-full bg-black flex items-center justify-center border-y border-slate-800/50">
                    {post.mediaType === "video" ? (
                      <iframe className="w-full h-full" src={post.mediaUrl} title={post.title} allowFullScreen></iframe>
                    ) : (
                      <img src={post.mediaUrl} alt={post.title} className="w-full h-full object-cover" />
                    )}
                  </div>

                  <CardContent className="p-5">
                    <h3 className="font-bold text-xl text-slate-50 mb-2">{post.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-6">{post.description}</p>


{/* Inside Home.jsx map loop */}
<Button asChild className="w-full bg-white text-slate-950 font-bold py-6">
  {/* Correct use of backticks and ${} to pass the ID */}
  <Link to={`/student/course/${post.id}`}>
    Apply & View Details
  </Link>
</Button>



                  </CardContent>
                </Card>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <SearchX className="h-12 w-12 text-slate-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-200">No Courses Found</h3>
              <Button variant="link" className="mt-4 text-cyan-400" onClick={() => setSearchQuery("")}>Clear search</Button>
            </div>
          )}
        </div>
      </main>

      {/* 3. MOBILE BOTTOM NAV (Visible only on small screens) */}
      <div className="fixed bottom-0 w-full bg-slate-950/90 backdrop-blur-xl border-t border-slate-800 p-4 flex justify-around items-center md:hidden z-50">
          <Link to="/student/home" className="flex flex-col items-center text-cyan-400 font-bold">
            <HomeIcon className="h-5 w-5 mb-1" />
            <span className="text-[10px]">FEED</span>
          </Link>
          <Link to="/student/statuspage" className="flex flex-col items-center text-slate-500 hover:text-cyan-400">
            <Info className="h-5 w-5 mb-1" />
            <span className="text-[10px]">CHECK STATUS</span>
          </Link>
      </div>
    </div>
  );
};

export default Home;