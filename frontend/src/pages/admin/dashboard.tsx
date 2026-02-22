"use client"

import React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, Label, Pie, PieChart, Sector } from "recharts"
// import { type PieSectorDataItem } from "recharts/types/polar/Pie"
import {
  ChartContainer,
  ChartStyle,
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
  CardFooter
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
import { Input } from "@/components/ui/input"
import { TrendingUp } from "lucide-react"

// --- MOCK DATA ---
const barData = [
  { year: "2021", Student: 450 },
  { year: "2022", Student: 520 },
  { year: "2023", Student: 610 },
  { year: "2024", Student: 800 },
]

const barChartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export const description = "An interactive pie chart"

const courseData = [
  { course: "january", desktop: 186, fill: "var(--color-january)" },
  { course: "february", desktop: 305, fill: "var(--color-february)" },
  { course: "march", desktop: 237, fill: "var(--color-march)" },
  { course: "april", desktop: 173, fill: "var(--color-april)" },
  { course: "may", desktop: 209, fill: "var(--color-may)" },
]

const pieChartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
  },
  mobile: {
    label: "Mobile",
  },
  january: {
    label: "BCA",
    color: "var(--chart-1)",
  },
  february: {
    label: "MCA",
    color: "var(--chart-2)",
  },
  march: {
    label: "BBA",
    color: "var(--chart-3)",
  },
  april: {
    label: "B. Com",
    color: "var(--chart-4)",
  },
  may: {
    label: "MBA",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

const students = [
  { id: "1", name: "Alice Johnson", course: "Computer Science", status: "Verified", date: "2024-02-15" },
  { id: "2", name: "Bob Smith", course: "Electronics", status: "Pending", date: "2024-02-16" },
  { id: "3", name: "Charlie Brown", course: "Mechanical", status: "Rejected", date: "2024-02-14" },
  { id: "4", name: "Diana Prince", course: "Computer Science", status: "Verified", date: "2024-02-18" },
]

const AdminDashboard = () => {
  const id = "pie-interactive"
  const [activeCourse, setActiveCourse] = React.useState(courseData[0].course)
  const activeIndex = React.useMemo(
    () => courseData.findIndex((item) => item.course === activeCourse),
    [activeCourse]
  )
  const courses = React.useMemo(() => courseData.map((item) => item.course), [])
  return (
    <div className="p-8 space-y-8 min-h-screen container mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>

      {/* --- CHARTS SECTION --- */}
      <div className="grid gap-6 md:grid-cols-2">
        
        {/* Bar Chart: Students Per Year */}
        <Card>
          <CardHeader>
            <CardTitle>Total Student Per Year</CardTitle>
            <CardDescription>Number of students admitted each year</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={barChartConfig}>
              <BarChart accessibilityLayer data={barData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="year"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="Student" fill="var(--color-desktop)" radius={8} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          {/* <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 leading-none font-medium">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground leading-none">
              Showing total visitors for the last 6 months
            </div>
          </CardFooter> */}
        </Card>

        {/* Pie Chart: Course Distribution */}
        <Card data-chart={id} className="flex flex-col">
          <ChartStyle id={id} config={pieChartConfig} />
          <CardHeader className="flex-row items-start space-y-0 pb-0">
            <div className="grid gap-1">
              <CardTitle>Course Distribution</CardTitle>
              <CardDescription>Distribution of students across different courses</CardDescription>
            </div>
            <Select value={activeCourse} onValueChange={setActiveCourse}>
              <SelectTrigger
                className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
                aria-label="Select a value"
              >
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent align="end" className="rounded-xl">
                {courses.map((key) => {
                  const config = pieChartConfig[key as keyof typeof pieChartConfig]
                  if (!config) {
                    return null
                  }
                  return (
                    <SelectItem
                      key={key}
                      value={key}
                      className="rounded-lg [&_span]:flex"
                    >
                      <div className="flex items-center gap-2 text-xs">
                        <span
                          className="flex h-3 w-3 shrink-0 rounded-xs"
                          style={{
                            backgroundColor: `var(--color-${key})`,
                          }}
                        />
                        {config?.label}
                      </div>
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="flex flex-1 justify-center pb-0">
            <ChartContainer
              id={id}
              config={pieChartConfig}
              className="mx-auto aspect-square w-full max-w-[300px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={courseData}
                  dataKey="desktop"
                  nameKey="course"
                  innerRadius={60}
                  strokeWidth={5}
                  activeIndex={activeIndex}
                  activeShape={({
                    outerRadius = 0,
                    ...props
                  }) => (
                    <g>
                      <Sector {...props} outerRadius={outerRadius + 10} />
                      <Sector
                        {...props}
                        outerRadius={outerRadius + 25}
                        innerRadius={outerRadius + 12}
                      />
                    </g>
                  )}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {courseData[activeIndex].desktop.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Students
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
      </div>

      {/* --- DATA TABLE SECTION --- */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
          <CardDescription>Manage and verify student document submissions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="">
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Submission Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.course}</TableCell>
                  <TableCell>{student.date}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        student.status === "Verified" ? "success" : 
                        student.status === "Rejected" ? "destructive" : "outline"
                      }
                      className={student.status === "Verified" ? "bg-emerald-100 text-emerald-700 border-none" : ""}
                    >
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <button className="text-sm text-primary font-medium hover:underline">View Details</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminDashboard
