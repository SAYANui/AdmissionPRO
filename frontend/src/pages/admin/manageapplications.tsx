"use client"

import React, { useEffect, useState, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { db } from "../../firebase/db"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft, FileText, User, MapPin, 
  GraduationCap, CheckCircle, XCircle, Clock, FileCheck 
} from "lucide-react"

export default function ManageApplication() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [app, setApp] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  const fetchApp = useCallback(async () => {
    if (!id) return
    try {
      const docRef = doc(db, "applications", id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setApp({ id: docSnap.id, ...docSnap.data() })
      } else {
        alert("Application not found")
        navigate(-1)
      }
    } catch (error) {
      console.error("Fetch error:", error)
    } finally {
      setLoading(false)
    }
  }, [id, navigate])

  useEffect(() => {
    fetchApp()
  }, [fetchApp])

  const updateStatus = async (newStatus: string) => {
    if (!id || updating) return
    setUpdating(true)
    try {
      const docRef = doc(db, "applications", id)
      await updateDoc(docRef, { 
        status: newStatus,
        lastUpdated: new Date()
      })
      setApp((prev: any) => ({ ...prev, status: newStatus }))
    } catch (error) {
      console.error("Update error:", error)
      alert("Failed to update status")
    } finally {
      setUpdating(false)
    }
  }

  // --- REUSABLE PDF OPENER ---
  const openPdf = (base64?: string, title?: string) => {
    if (!base64) {
      alert("No document found!")
      return
    }
    try {
      const newWindow = window.open()
      if (newWindow) {
        newWindow.document.title = `${title} - ${app?.studentName}`
        newWindow.document.body.style.margin = "0"
        const iframe = newWindow.document.createElement('iframe')
        iframe.src = base64
        iframe.style.width = "100%"
        iframe.style.height = "100vh"
        iframe.style.border = "none"
        newWindow.document.body.appendChild(iframe)
      }
    } catch (e) {
      alert("Pop-up blocked!")
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <Clock className="animate-spin text-cyan-500" />
    </div>
  )

  return (
    <div className="p-8 min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Button 
        onClick={() => navigate(-1)} 
        variant="ghost" 
        className="mb-6 text-slate-400 hover:text-cyan-400"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>

      <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-3">
        
        <div className="md:col-span-2 space-y-6">
          <Card className="bg-slate-900 border-slate-800 overflow-hidden">
            <div className="h-2 bg-cyan-500"></div>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl font-black">Application Details</CardTitle>
                <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 uppercase font-black px-4">
                  {app?.status || "Pending"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <DetailItem label="Student Name" value={app?.studentName} icon={<User size={14}/>} />
                <DetailItem label="Email" value={app?.studentEmail} />
                <DetailItem label="Phone" value={app?.phone} />
                <DetailItem label="Date of Birth" value={app?.dob} />
              </div>
              <hr className="border-slate-800" />
              <div className="grid grid-cols-2 gap-4">
                <DetailItem label="Father's Name" value={app?.fatherName} />
                <DetailItem label="Father's Contact" value={app?.fatherPhone} />
              </div>
              <hr className="border-slate-800" />
              <div className="space-y-4">
                <h4 className="text-xs font-black text-cyan-500 uppercase tracking-widest">Academic Background</h4>
                <div className="grid grid-cols-2 gap-4">
                   <DetailItem label="Institution" value={app?.institution} icon={<GraduationCap size={14}/>} />
                   <DetailItem label="GPA / Percentage" value={app?.gpa} />
                </div>
                <DetailItem label="Address" value={app?.address} icon={<MapPin size={14}/>} />
              </div>
            </CardContent>
          </Card>

          {/* DOCUMENT SECTION */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Verification Files</h3>
            
            {/* PRIMARY DOCUMENT */}
            <Card className="bg-slate-900 border-slate-800">
               <CardContent className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="p-3 bg-slate-800 rounded-xl text-red-400">
                        <FileText size={24} />
                     </div>
                     <div>
                        <p className="text-sm font-bold">Initial Marksheet/ID</p>
                        <p className="text-xs text-slate-500">{app?.fileName || "primary_document.pdf"}</p>
                     </div>
                  </div>
                  <Button onClick={() => openPdf(app?.documentBase64, "Initial Doc")} className="bg-slate-100 text-slate-900 hover:bg-cyan-400 font-bold uppercase text-xs">
                     View
                  </Button>
               </CardContent>
            </Card>

            {/* CONDITIONAL: FINAL/SECOND DOCUMENT (This is the logic you needed) */}
            {app?.finalDocumentBase64 && (
              <Card className="bg-slate-900 border-cyan-500/30 border-2 border-dashed shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                <CardContent className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-cyan-500/20 rounded-xl text-cyan-400">
                          <FileCheck size={24} />
                      </div>
                      <div>
                          <p className="text-sm font-black text-cyan-100 flex items-center gap-2">
                            Final Updated Document
                            <Badge className="bg-cyan-500 text-slate-950 text-[8px] h-4">NEW</Badge>
                          </p>
                          <p className="text-xs text-slate-500">Uploaded after review request</p>
                      </div>
                    </div>
                    <Button 
                      onClick={() => openPdf(app?.finalDocumentBase64, "Final Doc")} 
                      className="bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-bold uppercase text-xs shadow-lg"
                    >
                        Review New File
                    </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: ACTIONS */}
        <div className="space-y-6">
          <Card className="bg-slate-900 border-slate-800 sticky top-8">
            <CardHeader><CardTitle className="text-sm font-bold uppercase text-slate-400">Admin Actions</CardTitle></CardHeader>
            <CardContent className="grid gap-3">
                <Button 
                 disabled={updating}
                 onClick={() => updateStatus("Verified")}
                 className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                >
                  <CheckCircle className="mr-2 h-4 w-4" /> Approve & Verify
                </Button>
                
                <Button 
                 disabled={updating}
                 onClick={() => updateStatus("Reviewing")}
                 variant="outline"
                 className="w-full border-slate-700 hover:bg-slate-800 text-amber-400"
                >
                  <Clock className="mr-2 h-4 w-4" /> Request Re-upload
                </Button>

                <Button 
                 disabled={updating}
                 onClick={() => updateStatus("Payment")}
                 className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-900 font-bold"
                >
                  Send Payment Link
                </Button>

                <Button 
                 disabled={updating}
                 onClick={() => updateStatus("Rejected")}
                 variant="destructive"
                 className="w-full font-bold"
                >
                  <XCircle className="mr-2 h-4 w-4" /> Reject Application
                </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function DetailItem({ label, value, icon }: { label: string, value: string, icon?: any }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter flex items-center gap-1">
        {icon} {label}
      </p>
      <p className="text-sm font-medium text-slate-200">{value || "Not provided"}</p>
    </div>
  )
}