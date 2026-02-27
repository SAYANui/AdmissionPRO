"use client"

import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Info, 
  GraduationCap, 
  Home as HomeIcon, 
  Search, 
  SearchX,
  LogOut,
  Loader2,
  RefreshCw // Added for the refresh button
} from "lucide-react";

// --- FIREBASE IMPORTS ---
import { db } from "../../firebase/db";
import { auth } from "../../firebase/auth";
import { collection, getDocs, query, orderBy, where, limit } from "firebase/firestore";
import { signOut, onAuthStateChanged } from "firebase/auth";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // For subtle sync feedback
  const [appStatus, setAppStatus] = useState<string | null>(null);
  const navigate = useNavigate();

  // --- LOGIC OPTIMIZATION: One-time Fetch ---
  const loadData = useCallback(async (userEmail?: string | null) => {
    setRefreshing(true);
    try {
      // 1. Fetch Courses
      const qCourses = query(collection(db, "courses"), orderBy("createdAt", "desc"));
      const courseSnap = await getDocs(qCourses);
      const fetchedCourses = courseSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCourses(fetchedCourses);

      // 2. Fetch Status directly if user exists
      if (userEmail) {
        const qApp = query(
          collection(db, "applications"),
          where("studentEmail", "==", userEmail),
          orderBy("createdAt", "desc"),
          limit(1)
        );
        const appSnap = await getDocs(qApp);
        if (!appSnap.empty) {
          setAppStatus(appSnap.docs[0].data().status);
        } else {
          setAppStatus(null);
        }
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      loadData(user?.email);
    });
    return () => unsubscribe();
  }, [loadData]);

  // --- RESTORED YOUTUBE FORMATTER ---
  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    if (url.includes("youtube.com/embed/")) return url;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) 
      ? `https://www.youtube.com/embed/${match[2]}` 
      : url;
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const filteredFeed = courses.filter((post) =>
    post.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.collegeName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dark min-h-screen bg-slate-950 text-slate-50 font-sans pb-20 selection:bg-cyan-500/30">
      
      {/* 1. BRANDED HEADER (Style Preserved) */}
      <nav className="flex items-center justify-between px-4 md:px-8 py-6 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="group/logo relative">
          <div className="absolute -inset-1 bg-cyan-500 rounded-lg blur opacity-25 group-hover/logo:opacity-75 transition duration-1000"></div>
          <div className="relative flex items-center space-x-2 bg-slate-900 px-4 py-2 rounded-lg border border-slate-700">
            <GraduationCap className="h-6 w-6 text-cyan-400" />
            <span className="text-xl md:text-2xl font-black tracking-tighter text-cyan-400">
              Admission<span className="text-slate-50">PRO</span>
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* REFRESH BUTTON (Added for manual logic trigger) */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => loadData(auth.currentUser?.email)}
            className="text-slate-500 hover:text-cyan-400 transition-colors"
            disabled={refreshing}
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>

          <div className="hidden md:block group/status relative">
            <div className={`absolute -inset-1 rounded-lg blur opacity-0 group-hover/status:opacity-30 transition duration-500 ${appStatus ? 'bg-cyan-500 opacity-20' : 'bg-slate-500'}`}></div>
            <Button asChild variant="outline" className={`relative border-slate-700 bg-slate-800/50 transition-all ${appStatus ? 'text-cyan-400 border-cyan-500/40' : 'text-slate-300'}`}>
              <Link to="/student/statuspage" className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                {appStatus ? `Status: ${appStatus}` : "Check Status"}
                {appStatus && <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />}
              </Link>
            </Button>
          </div>

          <div className="group/logout relative">
            <div className="absolute -inset-1 bg-red-500 rounded-lg blur opacity-0 group-hover/logout:opacity-20 transition duration-500"></div>
            <Button onClick={handleLogout} variant="outline" className="relative border-slate-700 bg-slate-800/50 text-slate-300 hover:text-red-400 hover:border-red-500/50 transition-all cursor-pointer">
              <LogOut className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* 2. MAIN FEED (Style Preserved) */}
      <main className="max-w-xl mx-auto mt-10 px-4">
        <div className="relative group mb-12">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl blur opacity-20 group-focus-within:opacity-50 transition duration-500"></div>
          <div className="relative flex items-center">
            <Search className="absolute left-4 h-5 w-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
            <Input 
              type="text"
              placeholder="Search your institution or course...."
              className="pl-12 py-7 bg-slate-900 border-slate-800 text-lg rounded-xl focus-visible:ring-cyan-500 focus-visible:border-cyan-500 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <h2 className="text-cyan-400 font-bold tracking-[0.2em] text-xs uppercase mb-8">
          {searchQuery ? `Results for "${searchQuery}"` : "Discovery Feed"}
        </h2>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-cyan-500" />
          </div>
        ) : (
          <div className="space-y-12">
            {filteredFeed.length > 0 ? (
              filteredFeed.map((post) => (
                <div key={post.id} className="group relative">
                  <div className="absolute -inset-1 bg-cyan-500 rounded-2xl blur opacity-0 group-hover:opacity-10 transition duration-500"></div>
                  <Card className="relative bg-slate-900 border-slate-800 overflow-hidden rounded-2xl border-none shadow-2xl">
                    <CardHeader className="p-4 flex flex-row items-center justify-between">
                       <div className="flex items-center space-x-3">
                         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-black text-slate-950 text-sm">
                           {post.collegeName ? post.collegeName.charAt(0) : post.name.charAt(0)}
                         </div>
                         <div>
                           <p className="text-sm font-bold text-slate-100">{post.collegeName || "Institution"}</p>
                           <p className="text-[10px] text-cyan-500 font-bold tracking-widest uppercase">Course</p>
                         </div>
                       </div>
                    </CardHeader>

                    {/* RESTORED VIDEO COMPONENT */}
                    <div className="aspect-video w-full bg-black flex items-center justify-center border-y border-slate-800/50">
                      {post.mediaUrl?.includes("youtube") || post.mediaUrl?.includes("youtu.be") ? (
                        <iframe 
                          className="w-full h-full" 
                          src={getEmbedUrl(post.mediaUrl)} 
                          title={post.name} 
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <img 
                          src={post.mediaUrl || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4"} 
                          alt={post.name} 
                          className="w-full h-full object-cover" 
                        />
                      )}
                    </div>

                    <CardContent className="p-5">
                      <h3 className="font-bold text-xl text-slate-50 mb-2">{post.name}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed mb-6 line-clamp-3">{post.description}</p>
                      <Button asChild className="w-full bg-white hover:bg-cyan-400 text-slate-950 font-bold py-6 transition-colors">
                        <Link to={`/student/course/${post.id}`}>Apply & View Details</Link>
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
        )}
      </main>

      {/* 3. MOBILE NAV (Style Preserved) */}
      <div className="fixed bottom-0 w-full bg-slate-950/90 backdrop-blur-xl border-t border-slate-800 p-4 flex justify-around items-center md:hidden z-50">
          <Link to="/student/home" className="flex flex-col items-center text-cyan-400 font-bold">
            <HomeIcon className="h-5 w-5 mb-1" />
            <span className="text-[10px]">FEED</span>
          </Link>
          <Link to="/student/statuspage" className={`flex flex-col items-center transition-colors ${appStatus ? 'text-cyan-400' : 'text-slate-500'}`}>
            <div className="relative">
              <Info className="h-5 w-5 mb-1" />
              {appStatus && <span className="absolute -top-1 -right-1 h-2 w-2 bg-cyan-500 rounded-full animate-ping" />}
            </div>
            <span className="text-[10px]">{appStatus ? appStatus.toUpperCase() : "STATUS"}</span>
          </Link>
      </div>
    </div>
  );
};

export default Home;