"use client"

import React, { useState, useEffect, useMemo, useCallback } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Pie, PieChart, Sector, Label } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Loader2, Users, FileText, CheckCircle, ArrowUpRight, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

// --- FIREBASE IMPORTS ---
import { db } from "../../firebase/db"
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore"

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [applications, setApplications] = useState<any[]>([])
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [activeCourse, setActiveCourse] = useState<string>("")

  // --- OPTIMIZED DATA FETCH (Non-Realtime for Courses) ---
  const fetchData = useCallback(async () => {
    setRefreshing(true)
    try {
      // 1. Fetch Latest 5 Applications
      const qApps = query(collection(db, "applications"), orderBy("createdAt", "desc"), limit(5))
      const appSnap = await getDocs(qApps)
      const appList = appSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setApplications(appList)

      // 2. Fetch All Courses for Pie Chart
      const courseSnap = await getDocs(collection(db, "courses"))
      const courseList = courseSnap.docs.map((doc, index) => ({
        course: doc.id,
        name: doc.data().name,
        intake: doc.data().intake || 0,
        fill: `var(--chart-${(index % 5) + 1})`
      }))
      
      setCourses(courseList)
      if (courseList.length > 0 && !activeCourse) setActiveCourse(courseList[0].course)
    } catch (error) {
      console.error("Dashboard Load Error:", error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [activeCourse])

  useEffect(() => {
    fetchData()
  }, []) // Runs once on mount

  const pieChartConfig = useMemo(() => {
    const config: ChartConfig = { visitors: { label: "Seats" } }
    courses.forEach((c, index) => {
      config[c.course] = { label: c.name, color: `var(--chart-${(index % 5) + 1})` }
    })
    return config
  }, [courses])

  const activeIndex = useMemo(() => courses.findIndex((item) => item.course === activeCourse), [activeCourse, courses])

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-cyan-500" />
    </div>
  )

  return (
    <div className="p-8 space-y-8 min-h-screen bg-slate-950 text-slate-50 selection:bg-cyan-500/30 font-sans">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 w-fit px-4 py-1.5 rounded-full mb-2">
            <GraduationCap className="h-6 w-6 text-cyan-400" />
            <h1 className="text-4xl font-black tracking-tighter text-white">
              Admission<span className="text-cyan-500">PRO</span>
            </h1>
          </div>
          <Link to="/" className="text-xs font-black tracking-widest text-slate-500 hover:text-red-400 uppercase transition-colors">
            Logout Session
          </Link>
        </div>
        
        <div className="flex gap-4 items-center">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={fetchData} 
              disabled={refreshing}
              className="border-slate-800 bg-slate-900 text-slate-400 hover:text-cyan-400"
            >
              <RefreshCw size={16} className={`${refreshing ? "animate-spin" : ""}`} />
            </Button>

            <button 
              onClick={() => navigate("/admin/managecourses")}
              className="text-left transition-transform active:scale-95"
            >
              <StatMiniCard 
                icon={<Users size={16}/>} 
                label="Total Courses" 
                value={courses.length} 
                isLink 
              />
            </button>
            <StatMiniCard icon={<FileText size={16}/>} label="Recent Apps" value={applications.length} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        
        {/* --- COURSE DISTRIBUTION PIE --- */}
        <Card className="lg:col-span-1 bg-slate-900 border-slate-800">
          <CardHeader className="flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-bold text-slate-200">Seat Distribution</CardTitle>
            <Select value={activeCourse} onValueChange={setActiveCourse}>
              <SelectTrigger className="w-[120px] bg-slate-950 border-slate-800 text-xs text-slate-200">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
                {courses.map(c => (
                  <SelectItem key={c.course} value={c.course}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <ChartContainer config={pieChartConfig} className="mx-auto aspect-square max-h-[250px]">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={courses}
                  dataKey="intake"
                  nameKey="name"
                  innerRadius={60}
                  strokeWidth={8}
                  stroke="#0f172a"
                  activeIndex={activeIndex}
                  activeShape={({ outerRadius = 0, ...props }) => (
                    <g>
                      <Sector {...props} outerRadius={outerRadius + 8} />
                      <Sector {...props} outerRadius={outerRadius + 15} innerRadius={outerRadius + 10} />
                    </g>
                  )}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                            <tspan x={viewBox.cx} y={viewBox.cy} className="fill-white text-2xl font-black">
                              {courses[activeIndex]?.intake || 0}
                            </tspan>
                            <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 20} className="fill-slate-500 text-[10px] uppercase font-bold">
                              Seats
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* --- RECENT APPLICATIONS TABLE --- */}
        <Card className="md:col-span-2 bg-slate-900 border-slate-800 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
              <CheckCircle className="text-cyan-500" size={20} />
              Incoming Applications
            </CardTitle>
            <CardDescription className="text-slate-400 italic text-xs uppercase tracking-widest">Previewing Latest 5 Submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader className="bg-slate-950/50">
                <TableRow className="border-slate-800 hover:bg-transparent">
                  <TableHead className="text-slate-500 font-bold uppercase text-[10px]">Student</TableHead>
                  <TableHead className="text-slate-500 font-bold uppercase text-[10px]">Reference</TableHead>
                  <TableHead className="text-slate-500 font-bold uppercase text-[10px]">Status</TableHead>
                  <TableHead className="text-right text-slate-500 font-bold uppercase text-[10px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.length > 0 ? applications.map((app) => (
                  <TableRow key={app.id} className="border-slate-800 hover:bg-slate-800/30 transition-colors">
                    <TableCell className="font-medium">
                        <div className="text-slate-200 text-sm">{app.studentName}</div>
                        <div className="text-[10px] text-slate-500">{app.studentEmail}</div>
                    </TableCell>
                    <TableCell className="text-[10px] text-slate-400 font-mono">ID: {app.id.substring(0,8)}</TableCell>
                    <TableCell>
                      <Badge className={`${
                        app.status === "Verified" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : 
                        app.status === "Payment" ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" :
                        "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      } rounded-full px-3 text-[10px] uppercase font-black`}>
                        {app.status || "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <button 
                        onClick={() => navigate(`/admin/application/${app.id}`)} 
                        className="text-[10px] uppercase font-black text-cyan-500 hover:text-cyan-400 tracking-tighter transition-colors"
                      >
                        Review Details
                      </button>
                    </TableCell>
                  </TableRow>
                )) : (
                    <TableRow><TableCell colSpan={4} className="text-center py-10 text-slate-600">No recent applications found.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StatMiniCard({ icon, label, value, isLink = false }: { icon: any, label: string, value: any, isLink?: boolean }) {
    return (
        <div className={`
          relative bg-slate-900 border border-slate-800 p-3 rounded-2xl flex items-center gap-4 min-w-[150px] transition-all duration-300
          ${isLink ? "hover:border-cyan-500/50 hover:bg-slate-800/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.1)] group" : ""}
        `}>
            <div className={`p-2 rounded-xl transition-colors ${isLink ? "bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950" : "bg-slate-800 text-slate-400"}`}>
              {icon}
            </div>
            <div className="flex-1">
                <p className="text-[10px] uppercase font-bold text-slate-500 tracking-tight">{label}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xl font-black text-white leading-none">{value}</p>
                  {isLink && <ArrowUpRight className="h-3 w-3 text-slate-600 group-hover:text-cyan-400 transition-colors" />}
                </div>
            </div>
        </div>
    )
}