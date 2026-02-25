import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, GraduationCap, Calendar, DollarSign, Users, Award, CheckCircle, Loader2 
} from "lucide-react";
// --- FIREBASE IMPORTS ---
import { db } from "../../firebase/db";
import { doc, getDoc } from "firebase/firestore";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;
      const docRef = doc(db, "courses", id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setCourse({ id: docSnap.id, ...docSnap.data() });
      }
      setLoading(false);
    };
    fetchCourse();
  }, [id]);

  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : url;
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-cyan-500" />
    </div>
  );

  if (!course) return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Course Not Found😢</h2>
      <Link to="/student/home" className="text-cyan-400 underline">Back to Feed</Link>
    </div>
  );

  return (
    <div className="dark min-h-screen bg-slate-950 text-slate-50 font-sans pb-10">
      {/* Navbar stays exactly as you styled it */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-slate-800 sticky top-0 bg-slate-950/80 backdrop-blur-md z-50">
        <Link to="/student/home" className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors">
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Back to Feed</span>
        </Link>
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-6 w-6 text-cyan-400" />
          <span className="text-xl md:text-2xl font-black tracking-tighter text-cyan-400">
            Admission<span className="text-slate-50">PRO</span>
          </span>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 mt-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* MEDIA CONTENT */}
          <div className="space-y-6">
            <div className="relative group overflow-hidden rounded-3xl border border-slate-800 bg-black aspect-video shadow-2xl">
              {course.mediaUrl?.includes("youtube") || course.mediaUrl?.includes("youtu.be") ? (
                <iframe className="w-full h-full" src={getEmbedUrl(course.mediaUrl)} title={course.name} allowFullScreen></iframe>
              ) : (
                <img src={course.mediaUrl || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4"} className="w-full h-full object-cover" />
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                <Users className="text-cyan-400 h-5 w-5" />
                <span className="text-sm text-slate-300">{course.intake} Seats Total</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                <Award className="text-cyan-400 h-5 w-5" />
                <span className="text-sm text-slate-300">Top Rated</span>
              </div>
            </div>
          </div>

          {/* TEXT CONTENT */}
          <div className="flex flex-col justify-center">
            <div className="mb-6">
               <span className="bg-cyan-500/10 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-cyan-500/20">Course Profile</span>
               <h1 className="text-4xl md:text-5xl font-black text-white mt-4 mb-2 tracking-tight">{course.name}</h1>
               <p className="text-xl text-cyan-400/80 font-semibold">{course.collegeName || "Institution Name"}</p>
            </div>

            <p className="text-slate-400 leading-relaxed text-lg mb-8">{course.description}</p>

            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-500 text-sm uppercase font-bold tracking-tighter">
                  <Calendar className="h-4 w-4" /> Duration
                </div>
                <p className="text-xl font-bold text-white">{course.duration}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-500 text-sm uppercase font-bold tracking-tighter">
                  <DollarSign className="h-4 w-4" /> Est. Fees
                </div>
                <p className="text-xl font-bold text-cyan-400">{course.fees || "TBD"}</p>
              </div>
            </div>

            <Button asChild className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black py-8 text-xl rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.2)]">
  <Link to={`/student/apply/${course.id}`}>APPLY FOR ADMISSION</Link>
</Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseDetails;