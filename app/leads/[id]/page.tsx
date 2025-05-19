"use client"

import { useState, use } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  Calendar,
  CircleDot,
  FileText,
  Globe,
  LinkIcon,
  Mail,
  MapPin,
  Phone,
  Star,
  User,
  UserCircle,
  ArrowLeft,
  Clock,
  MessageSquare,
  BarChart,
  ChevronRight,
  Edit,
  Share2,
  MoreHorizontal,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { leadsData, type Lead, type LeadStatus } from "@/lib/data"
import { StatusDropdown } from "@/components/status-dropdown"
import { SolutionDropdown } from "@/components/solution-dropdown"
import { GeoDropdown } from "@/components/geo-dropdown"
import { SdrOwnerDropdown } from "@/components/sdr-owner-dropdown"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function LeadPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params)
  const lead = leadsData.find((lead) => lead.id === unwrappedParams.id)

  if (!lead) {
    notFound()
  }

  const [currentLead, setCurrentLead] = useState<Lead>({ ...lead })

  const handleStatusChange = (status: string) => {
    setCurrentLead({
      ...currentLead,
      leadStatus: status as LeadStatus,
    })
  }

  const handleSolutionChange = (solution: string) => {
    setCurrentLead({
      ...currentLead,
      solution,
    })
  }

  const handleGeoChange = (geo: string) => {
    setCurrentLead({
      ...currentLead,
      geo,
    })
  }

  const handleSdrOwnerChange = (sdrOwner: string) => {
    setCurrentLead({
      ...currentLead,
      sdrOwner,
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto py-10">
        {/* Header with decorative elements */}
        <div className="relative mb-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#009CDE]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-70"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button
                  variant="outline"
                  className="gap-1 hover:bg-[#009CDE]/10 hover:text-[#009CDE] hover:border-[#009CDE]/20 shadow-sm"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-[#00153D]">
                  {currentLead.companyName}
                </h1>
                <div className="flex items-center gap-2 mt-1 text-[#63666A]">
                  <StatusDropdown value={currentLead.leadStatus} onChange={handleStatusChange} />
                  <span>•</span>
                  <span>{currentLead.geo}</span>
                  <span>•</span>
                  <span>{currentLead.solution}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1 shadow-sm">
                <Edit className="h-4 w-4" /> Edit
              </Button>
              <Button variant="outline" size="sm" className="gap-1 shadow-sm">
                <Share2 className="h-4 w-4" /> Share
              </Button>
              <Button variant="outline" size="icon" className="shadow-sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Lead Overview Card */}
            <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 bg-white relative">
              <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.15]"></div>
              <CardHeader className="pb-2 relative">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-[#009CDE]/10 flex items-center justify-center">
                    <User className="h-3 w-3 text-[#009CDE]" />
                  </div>
                  Lead Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="relative grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="h-9 w-9 rounded-full bg-[#009CDE]/10 flex items-center justify-center shadow-sm flex-shrink-0">
                      <Calendar className="h-5 w-5 text-[#009CDE]" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Lead Date</p>
                      <p className="font-medium">{currentLead.leadDate}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-9 w-9 rounded-full bg-[#009CDE]/10 flex items-center justify-center shadow-sm flex-shrink-0">
                      <CircleDot className="h-5 w-5 text-[#009CDE]" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Lead Status</p>
                      <StatusDropdown value={currentLead.leadStatus} onChange={handleStatusChange} />
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-9 w-9 rounded-full bg-[#009CDE]/10 flex items-center justify-center shadow-sm flex-shrink-0">
                      <UserCircle className="h-5 w-5 text-[#009CDE]" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Person Name</p>
                      <div className="font-medium flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-[#009CDE]/10 text-[#009CDE] text-xs">
                            {currentLead.personName.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        {currentLead.personName}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-9 w-9 rounded-full bg-[#009CDE]/10 flex items-center justify-center shadow-sm flex-shrink-0">
                      <User className="h-5 w-5 text-[#009CDE]" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Position</p>
                      <p className="font-medium">{currentLead.position}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-9 w-9 rounded-full bg-[#009CDE]/10 flex items-center justify-center shadow-sm flex-shrink-0">
                      <CircleDot className="h-5 w-5 text-[#009CDE]" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Solution</p>
                      <SolutionDropdown value={currentLead.solution} onChange={handleSolutionChange} />
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-9 w-9 rounded-full bg-[#009CDE]/10 flex items-center justify-center shadow-sm flex-shrink-0">
                      <MapPin className="h-5 w-5 text-[#009CDE]" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">GEO</p>
                      <GeoDropdown value={currentLead.geo} onChange={handleGeoChange} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="h-9 w-9 rounded-full bg-[#009CDE]/10 flex items-center justify-center shadow-sm flex-shrink-0">
                      <Calendar className="h-5 w-5 text-[#009CDE]" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Meeting Date</p>
                      <p className="font-medium">{currentLead.meetingDate}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-9 w-9 rounded-full bg-[#009CDE]/10 flex items-center justify-center shadow-sm flex-shrink-0">
                      <UserCircle className="h-5 w-5 text-[#009CDE]" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">SDR Owner</p>
                      <SdrOwnerDropdown value={currentLead.sdrOwner} onChange={handleSdrOwnerChange} />
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-9 w-9 rounded-full bg-[#009CDE]/10 flex items-center justify-center shadow-sm flex-shrink-0">
                      <Mail className="h-5 w-5 text-[#009CDE]" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{currentLead.email || "Empty"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-9 w-9 rounded-full bg-[#009CDE]/10 flex items-center justify-center shadow-sm flex-shrink-0">
                      <Phone className="h-5 w-5 text-[#009CDE]" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{currentLead.phone || "Empty"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-9 w-9 rounded-full bg-[#009CDE]/10 flex items-center justify-center shadow-sm flex-shrink-0">
                      <CircleDot className="h-5 w-5 text-[#009CDE]" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Lead Rating</p>
                      <div className="flex">
                        {Array.from({ length: currentLead.leadRating }).map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Information Card */}
            <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 bg-white relative">
              <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.15]"></div>
              <CardHeader className="pb-2 relative">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-[#009CDE]/10 flex items-center justify-center">
                    <Globe className="h-3 w-3 text-[#009CDE]" />
                  </div>
                  Additional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="relative space-y-4">
                <div className="flex items-start gap-4">
                  <div className="h-9 w-9 rounded-full bg-[#009CDE]/10 flex items-center justify-center shadow-sm flex-shrink-0">
                    <LinkIcon className="h-5 w-5 text-[#009CDE]" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Person LinkedIn Profile</p>
                    <p className="font-medium text-[#009CDE] hover:underline cursor-pointer">
                      {currentLead.personLinkedin || "Not available"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-9 w-9 rounded-full bg-[#009CDE]/10 flex items-center justify-center shadow-sm flex-shrink-0">
                    <Globe className="h-5 w-5 text-[#009CDE]" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Company Website</p>
                    <p className="font-medium text-[#009CDE] hover:underline cursor-pointer">
                      {currentLead.companyWebsite || "Not available"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-9 w-9 rounded-full bg-[#009CDE]/10 flex items-center justify-center shadow-sm flex-shrink-0">
                    <LinkIcon className="h-5 w-5 text-[#009CDE]" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Company LinkedIn</p>
                    <p className="font-medium text-[#009CDE] hover:underline cursor-pointer">
                      {currentLead.companyLinkedin || "Not available"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notes Card */}
            <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 bg-white relative mt-8">
              <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.15]"></div>
              <CardHeader className="pb-2 relative">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-[#009CDE]/10 flex items-center justify-center">
                    <FileText className="h-3 w-3 text-[#009CDE]" />
                  </div>
                  Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-4">
                    <div className="h-9 w-9 rounded-full bg-[#009CDE]/10 flex items-center justify-center shadow-sm flex-shrink-0">
                      <FileText className="h-5 w-5 text-[#009CDE]" />
                    </div>
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Lead Notes</p>
                        <Button variant="outline" size="sm" className="gap-1 shadow-sm">
                          <Edit className="h-3 w-3" /> Edit Notes
                        </Button>
                      </div>
                      <div className="p-4 bg-[#009CDE]/5 rounded-lg border border-[#009CDE]/10 min-h-[200px] whitespace-pre-wrap">
                        <p className="font-medium leading-relaxed">{currentLead.notes || "No notes available. Click 'Edit Notes' to add notes about this lead."}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Activity Timeline Card */}
            <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 bg-white relative">
              <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.15]"></div>
              <CardHeader className="pb-2 relative">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-[#3F9C35]/10 flex items-center justify-center">
                    <Clock className="h-3 w-3 text-[#3F9C35]" />
                  </div>
                  Activity Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <div className="space-y-4">
                  <div className="relative pl-6 pb-6">
                    <div className="absolute top-0 left-0 h-full w-0.5 bg-[#3F9C35]"></div>
                    <div className="absolute top-0 left-0 h-3 w-3 rounded-full bg-[#3F9C35] -translate-x-1"></div>
                    <div className="bg-[#3F9C35]/5 rounded-lg p-3 border border-[#3F9C35]/10 ml-2">
                      <p className="text-xs text-[#3F9C35] font-medium">Today</p>
                      <p className="font-medium">Lead viewed by SDR</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                        <Avatar className="h-4 w-4">
                          <AvatarFallback className="bg-[#3F9C35]/10 text-[#3F9C35] text-[8px]">SD</AvatarFallback>
                        </Avatar>
                        <span>SDR 1</span>
                      </div>
                    </div>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute top-0 left-0 h-full w-0.5 bg-[#3F9C35]"></div>
                    <div className="absolute top-0 left-0 h-3 w-3 rounded-full bg-[#3F9C35]/60 -translate-x-1"></div>
                    <div className="bg-[#3F9C35]/5 rounded-lg p-3 border border-[#3F9C35]/10 ml-2">
                      <p className="text-xs text-[#3F9C35] font-medium">{currentLead.leadDate}</p>
                      <p className="font-medium">Lead created</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                        <Avatar className="h-4 w-4">
                          <AvatarFallback className="bg-[#3F9C35]/10 text-[#3F9C35] text-[8px]">SY</AvatarFallback>
                        </Avatar>
                        <span>System</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className="w-full justify-between text-[#009CDE] hover:text-[#009CDE]/80 hover:bg-[#009CDE]/5 mt-4"
                >
                  View all activity
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions Card */}
            <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 bg-white relative">
              <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.15]"></div>
              <CardHeader className="pb-2 relative">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-[#009CDE]/10 flex items-center justify-center">
                    <MessageSquare className="h-3 w-3 text-[#009CDE]" />
                  </div>
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="relative space-y-3">
                <Button className="w-full justify-start gap-2 bg-[#3F9C35] hover:bg-[#3F9C35]/90">
                  <MessageSquare className="h-4 w-4" /> Send Email
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Phone className="h-4 w-4" /> Schedule Call
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Calendar className="h-4 w-4" /> Schedule Meeting
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <BarChart className="h-4 w-4" /> View Analytics
                </Button>
              </CardContent>
            </Card>

            {/* Related Leads Card */}
            <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 bg-white relative">
              <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.15]"></div>
              <CardHeader className="pb-2 relative">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-[#00153D]/10 flex items-center justify-center">
                    <Users className="h-3 w-3 text-[#00153D]" />
                  </div>
                  Related Leads
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <div className="space-y-2">
                  {leadsData
                    .filter((l) => l.id !== currentLead.id && l.geo === currentLead.geo)
                    .slice(0, 3)
                    .map((relatedLead) => (
                      <Link
                        key={relatedLead.id}
                        href={`/leads/${relatedLead.id}`}
                        className="block p-3 rounded-md hover:bg-[#00153D]/5 border border-transparent hover:border-[#00153D]/10 transition-all"
                      >
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-[#00153D]/10 text-[#00153D] text-xs">
                              {relatedLead.companyName.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{relatedLead.companyName}</p>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-[#00153D]/10 text-[#00153D] hover:bg-[#00153D]/20 border-none text-xs">
                                {relatedLead.solution}
                              </Badge>
                              <span className="text-xs text-gray-500">{relatedLead.geo}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
                <Button
                  variant="ghost"
                  className="w-full justify-between text-[#00153D] hover:text-[#00153D]/80 hover:bg-[#00153D]/5 mt-4"
                >
                  View all related leads
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
