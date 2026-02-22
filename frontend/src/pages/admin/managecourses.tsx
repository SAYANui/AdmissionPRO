import React, { useState } from "react";
import { Plus, Edit2, BookOpen, Clock, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

// Mock Data
const INITIAL_COURSES = [
  { id: 1, name: "Computer Science", duration: "4 Years", intake: 120, description: "Software engineering, AI, and Data Structures." },
  { id: 2, name: "Electronics & Communication", duration: "4 Years", intake: 60, description: "Circuit design, VLSI, and Digital Communication." },
  { id: 3, name: "Business Administration", duration: "3 Years", intake: 150, description: "Finance, Marketing, and Operations Management." },
  { id: 4, name: "Architecture", duration: "5 Years", intake: 40, description: "Urban planning and structural design." },
];

export default function ManageCourses() {
  const [courses, setCourses] = useState(INITIAL_COURSES);

  return (
    <div className="p-8 space-y-6 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Courses</h1>
          <p className="text-muted-foreground">Add, edit or remove academic programs.</p>
        </div>
        <AddCourseDialog />
      </div>

      {/* Course Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

function CourseCard({ course }) {
  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-md border-slate-200">
      {/* Hover Overlay with Edit Button */}
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <EditCourseDialog course={course} />
      </div>

      <CardHeader className="pb-2">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2">
          <BookOpen size={20} />
        </div>
        <CardTitle className="text-lg">{course.name}</CardTitle>
        <CardDescription className="line-clamp-2">
          {course.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center text-sm text-muted-foreground gap-2">
          <Clock size={14} />
          <span>Duration: {course.duration}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground gap-2">
          <Users size={14} />
          <span>Total Seats: {course.intake} Students</span>
        </div>
      </CardContent>
    </Card>
  );
}

function AddCourseDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="gap-2 shadow-xl">
          <Plus size={18} /> Add New Course
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Course</DialogTitle>
          <DialogDescription>
            Add the course parameters for the current academic year.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Course Name</Label>
            <Input id="name" defaultValue={""} placeholder="e.g. Mechanical Engineering" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="duration">Duration</Label>
              <Input id="duration" defaultValue={4} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="intake">Intake</Label>
              <Input id="intake" type="number" defaultValue={30} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <textarea 
              id="description" 
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              defaultValue={"Course description goes here..."}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function EditCourseDialog({ course }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="gap-2 shadow-xl">
          <Edit2 size={16} /> Edit Course
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Course Details</DialogTitle>
          <DialogDescription>
            Modify the course parameters for the current academic year.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Course Name</Label>
            <Input id="name" defaultValue={course.name} placeholder="e.g. Mechanical Engineering" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="duration">Duration</Label>
              <Input id="duration" defaultValue={course.duration} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="intake">Intake</Label>
              <Input id="intake" type="number" defaultValue={course.intake} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <textarea 
              id="description" 
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              defaultValue={course.description}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}