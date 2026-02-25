"use client"

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Added for routing
import { 
  Plus, Edit2, BookOpen, Clock, Users, GraduationCap, 
  Loader2, Trash2, School, ArrowLeft 
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// --- FIREBASE IMPORTS ---
import { db } from "../../firebase/db";
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  updateDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp,
  query,
  orderBy
} from "firebase/firestore";

export default function ManageCourses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigation hook

  useEffect(() => {
    const q = query(collection(db, "courses"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const courseData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCourses(courseData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="p-8 space-y-8 min-h-screen bg-slate-950 text-slate-50 selection:bg-cyan-500/30">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-4">
          {/* BACK TO DASHBOARD BUTTON */}
          <button 
            onClick={() => navigate("/admin/dashboard")}
            className="group flex items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors text-xs font-bold uppercase tracking-widest"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </button>

          <div className="space-y-2">
            <div className="group/logo relative inline-block">
              <div className="absolute -inset-1 bg-cyan-500 rounded-lg blur opacity-20 group-hover/logo:opacity-60 transition duration-500"></div>
              <div className="relative flex items-center space-x-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl">
                <GraduationCap className="h-6 w-6 text-cyan-400" />
                <span className="text-2xl font-black tracking-tighter text-cyan-400">
                  Admission<span className="text-slate-50">PRO</span> <span className="text-xs font-normal text-slate-500 ml-2">ADMIN</span>
                </span>
              </div>
            </div>
            <p className="text-slate-400 ml-1">Architect your institution's future programs with rich media and clear pricing.</p>
          </div>
        </div>
        
        <AddCourseDialog />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-cyan-500 h-10 w-10" />
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {courses.length > 0 ? (
            courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-800 rounded-3xl">
              <BookOpen className="mx-auto text-slate-800 mb-4" size={48} />
              <p className="text-slate-500 font-medium">No courses published yet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ... (CourseMediaRenderer stays the same)
function CourseMediaRenderer({ url, className }: { url: string, className?: string }) {
  if (!url) return <div className={`${className} bg-slate-800 flex items-center justify-center`}><BookOpen className="text-slate-600" size={40} /></div>;
  const isYoutube = url.includes("youtube.com") || url.includes("youtu.be");
  const isVideo = url.match(/\.(mp4|webm|ogg)$/i);

  if (isYoutube) {
    const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
    return <iframe className={className} src={`https://www.youtube.com/embed/${videoId}`} title="Course Video" allowFullScreen></iframe>;
  }
  if (isVideo) return <video src={url} className={className} controls muted />;
  return <img src={url} alt="Course Media" className={className} onError={(e) => (e.currentTarget.src = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4")} />;
}

function CourseCard({ course }: { course: any }) {
  const handleDelete = async () => {
    if(confirm("Delete this course permanently?")) {
      await deleteDoc(doc(db, "courses", course.id));
    }
  };

  return (
    <Card className="group relative overflow-hidden transition-all bg-slate-900 border-slate-800 hover:border-cyan-500/50 shadow-2xl flex flex-col h-full">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur opacity-0 group-hover:opacity-10 transition duration-500"></div>

      <div className="relative h-44 w-full overflow-hidden border-b border-slate-800">
         <CourseMediaRenderer url={course.mediaUrl} className="w-full h-full object-cover" />
         <div className="absolute inset-0 bg-slate-950/60 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
            <EditCourseDialog course={course} />
            <Button onClick={handleDelete} variant="destructive" size="sm" className="gap-2"><Trash2 size={14} /></Button>
         </div>
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg text-slate-100 line-clamp-1 flex-1">{course.name}</CardTitle>
          <span className="text-cyan-400 text-xs font-bold whitespace-nowrap">{course.fees}</span>
        </div>
        <CardDescription className="text-slate-400 line-clamp-1 text-[10px] uppercase tracking-widest flex items-center gap-1">
          <School size={10} /> {course.collegeName || "Unknown Institution"}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 pb-6 mt-auto">
        <div className="flex items-center text-[10px] text-slate-300 gap-2 bg-slate-800/50 p-2 rounded border border-slate-700/50">
          <Clock size={12} className="text-cyan-400" />
          <span>{course.duration}</span>
          <Users size={12} className="ml-auto text-cyan-400" />
          <span>{course.intake} Seats</span>
        </div>
      </CardContent>
    </Card>
  );
}

// ... (AddCourseDialog and EditCourseDialog remain largely the same, but ensure they close properly)
function AddCourseDialog() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ 
    name: "", 
    collegeName: "", 
    duration: "", 
    intake: "", 
    fees: "", 
    description: "", 
    mediaUrl: "" 
  });

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDoc(collection(db, "courses"), {
      ...formData,
      intake: Number(formData.intake),
      createdAt: serverTimestamp()
    });
    setOpen(false);
    setFormData({ name: "", collegeName: "", duration: "", intake: "", fees: "", description: "", mediaUrl: "" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold gap-2 px-6 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
          <Plus size={20} /> Add New Course
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-900 border-slate-800 text-slate-100 sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleAdd} className="space-y-4">
          <DialogHeader>
            <DialogTitle className="text-cyan-400 text-2xl font-bold italic">Launch New Program</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-400 text-xs uppercase tracking-tighter">Course Title</Label>
                <Input className="bg-slate-950 border-slate-800" placeholder="e.g. B.Tech CS" value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} required />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-400 text-xs uppercase tracking-tighter">Institution Name</Label>
                <Input className="bg-slate-950 border-slate-800" placeholder="e.g. MIT University" value={formData.collegeName} onChange={(e)=>setFormData({...formData, collegeName: e.target.value})} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-400 text-xs uppercase tracking-tighter">Media Link (YT/Image/Video)</Label>
              <Input className="bg-slate-950 border-slate-800" placeholder="Paste URL here..." value={formData.mediaUrl} onChange={(e)=>setFormData({...formData, mediaUrl: e.target.value})} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-400 text-xs uppercase tracking-tighter">Duration</Label>
                <Input className="bg-slate-950 border-slate-800" placeholder="4 Years" value={formData.duration} onChange={(e)=>setFormData({...formData, duration: e.target.value})} required />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-400 text-xs uppercase tracking-tighter">Fees</Label>
                <Input className="bg-slate-950 border-slate-800" placeholder="$5,000" value={formData.fees} onChange={(e)=>setFormData({...formData, fees: e.target.value})} required />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-400 text-xs uppercase tracking-tighter">Seats</Label>
                <Input type="number" className="bg-slate-950 border-slate-800" value={formData.intake} onChange={(e)=>setFormData({...formData, intake: e.target.value})} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-400 text-xs uppercase tracking-tighter">Full Description</Label>
              <textarea 
                className="flex min-h-[100px] w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm focus:border-cyan-500 outline-none"
                placeholder="Talk about placements, curriculum..."
                value={formData.description}
                onChange={(e)=>setFormData({...formData, description: e.target.value})}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black tracking-widest uppercase py-6">
              Publish to AdmissionPRO
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function EditCourseDialog({ course }: { course: any }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ ...course });

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const courseRef = doc(db, "courses", course.id);
    await updateDoc(courseRef, {
      ...formData,
      intake: Number(formData.intake)
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm" className="bg-slate-100 hover:bg-cyan-400 text-slate-950 font-bold">
          <Edit2 size={14} /> Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-900 border-slate-800 text-slate-100 sm:max-w-[500px]">
        <form onSubmit={handleUpdate} className="space-y-4">
          <DialogHeader><DialogTitle className="text-cyan-400">Modify {course.name}</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-2">
             <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1"><Label className="text-xs">Course Name</Label><Input value={formData.name} className="bg-slate-950 border-slate-800" onChange={(e)=>setFormData({...formData, name: e.target.value})} /></div>
               <div className="space-y-1"><Label className="text-xs">Institution</Label><Input value={formData.collegeName} className="bg-slate-950 border-slate-800" onChange={(e)=>setFormData({...formData, collegeName: e.target.value})} /></div>
             </div>
             <div className="space-y-1"><Label className="text-xs">Media URL</Label><Input value={formData.mediaUrl} className="bg-slate-950 border-slate-800" onChange={(e)=>setFormData({...formData, mediaUrl: e.target.value})} /></div>
             <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1"><Label className="text-xs">Duration</Label><Input value={formData.duration} className="bg-slate-950 border-slate-800" onChange={(e)=>setFormData({...formData, duration: e.target.value})} /></div>
                <div className="space-y-1"><Label className="text-xs">Fees</Label><Input value={formData.fees} className="bg-slate-950 border-slate-800" onChange={(e)=>setFormData({...formData, fees: e.target.value})} /></div>
                <div className="space-y-1"><Label className="text-xs">Seats</Label><Input type="number" value={formData.intake} className="bg-slate-950 border-slate-800" onChange={(e)=>setFormData({...formData, intake: e.target.value})} /></div>
             </div>
             <div className="space-y-1"><Label className="text-xs">Description</Label>
               <textarea className="w-full bg-slate-950 border-slate-800 rounded-md p-2 text-sm h-24" value={formData.description} onChange={(e)=>setFormData({...formData, description: e.target.value})} />
             </div>
          </div>
          <DialogFooter><Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold uppercase tracking-widest">Update Course</Button></DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}