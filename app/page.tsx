"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  CalendarDays,
  Star,
  Users,
  Flame,
  CheckCircle,
  Calendar,
  Search,
  Filter,
  Plus,
  ArrowUpRight,
  BarChart2,
  TrendingUp,
  ChevronRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { leadsData as initialLeadsData, type Lead, type LeadStatus } from "@/lib/data"
import { StatusDropdown } from "@/components/status-dropdown"
import { SolutionDropdown } from "@/components/solution-dropdown"
import { GeoDropdown } from "@/components/geo-dropdown"
import { SdrOwnerDropdown } from "@/components/sdr-owner-dropdown"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function Dashboard() {
  const router = useRouter()
  const [leadsData, setLeadsData] = useState<Lead[]>(initialLeadsData)

  const handleRowDoubleClick = (leadId: string) => {
    router.push(`/leads/${leadId}`)
  }

  const handleStatusChange = (leadId: string, status: string) => {
    setLeadsData(
      leadsData.map((lead) => {
        if (lead.id === leadId) {
          return {
            ...lead,
            leadStatus: status as LeadStatus,
          }
        }
        return lead
      }),
    )
  }

  const handleSolutionChange = (leadId: string, solution: string) => {
    setLeadsData(
      leadsData.map((lead) => {
        if (lead.id === leadId) {
          return {
            ...lead,
            solution,
          }
        }
        return lead
      }),
    )
  }

  const handleGeoChange = (leadId: string, geo: string) => {
    setLeadsData(
      leadsData.map((lead) => {
        if (lead.id === leadId) {
          return {
            ...lead,
            geo,
          }
        }
        return lead
      }),
    )
  }

  const handleSdrOwnerChange = (leadId: string, sdrOwner: string) => {
    setLeadsData(
      leadsData.map((lead) => {
        if (lead.id === leadId) {
          return {
            ...lead,
            sdrOwner,
          }
        }
        return lead
      }),
    )
  }

  // Calculate statistics
  const totalLeads = leadsData.length
  const hotLeads = leadsData.filter((lead) => lead.leadStatus === "hot").length
  const meetingDone = leadsData.filter((lead) => lead.leadStatus === "meeting_done").length
  const meetingScheduled = leadsData.filter((lead) => lead.leadStatus === "meeting_schedule").length
  const warmLeads = leadsData.filter((lead) => lead.leadStatus === "warm").length
  const newLeads = leadsData.filter((lead) => lead.leadStatus === "lead").length

  // Calculate percentages
  const hotLeadsPercent = Math.round((hotLeads / totalLeads) * 100) || 0
  const meetingDonePercent = Math.round((meetingDone / totalLeads) * 100) || 0
  const meetingScheduledPercent = Math.round((meetingScheduled / totalLeads) * 100) || 0
  const warmLeadsPercent = Math.round((warmLeads / totalLeads) * 100) || 0
  const newLeadsPercent = Math.round((newLeads / totalLeads) * 100) || 0

  // Get top performing SDRs
  const sdrPerformance = leadsData.reduce(
    (acc, lead) => {
      if (!lead.sdrOwner) return acc
      if (!acc[lead.sdrOwner]) {
        acc[lead.sdrOwner] = { total: 0, hot: 0, meetings: 0 }
      }
      acc[lead.sdrOwner].total += 1
      if (lead.leadStatus === "hot") acc[lead.sdrOwner].hot += 1
      if (lead.leadStatus === "meeting_done" || lead.leadStatus === "meeting_schedule") {
        acc[lead.sdrOwner].meetings += 1
      }
      return acc
    },
    {} as Record<string, { total: number; hot: number; meetings: number }>,
  )

  const topSdrs = Object.entries(sdrPerformance)
    .map(([name, stats]) => ({ name, ...stats }))
    .sort((a, b) => b.meetings - a.meetings)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto py-10">
        {/* Header with decorative elements */}
        <div className="relative mb-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#009CDE]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-70"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#3F9C35]/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl opacity-70"></div>

          <div className="relative z-10 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-[#00153D] mb-2">
                Leads Dashboard
              </h1>
              <p className="text-[#63666A]">Track and manage your sales pipeline efficiently</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[#888B8D]" />
                <Input
                  type="search"
                  placeholder="Search leads..."
                  className="w-[250px] pl-8 rounded-lg border-[#63666A]/20 focus-visible:ring-[#009CDE]"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="gap-1 border-[#63666A]/20 hover:border-[#63666A]/30 hover:bg-[#63666A]/5"
              >
                <Filter className="h-4 w-4" /> Filter
              </Button>
              <Button
                size="sm"
                className="gap-1 bg-[#009CDE] hover:bg-[#009CDE]/90 shadow-sm hover:shadow transition-all"
              >
                <Plus className="h-4 w-4" /> Add Lead
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Stats Cards Section */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 bg-white relative group">
              <div className="absolute inset-0 bg-[#009CDE]/5 rounded-lg opacity-80"></div>
              <div className="absolute inset-0 bg-[radial-gradient(#009CDE_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.15]"></div>
              <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
                <CardTitle className="text-sm font-medium text-[#00153D]">Total Leads</CardTitle>
                <div className="h-10 w-10 rounded-full bg-[#009CDE]/10 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  <Users className="h-5 w-5 text-[#009CDE]" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-[#009CDE]">{totalLeads}</div>
                  <div className="flex items-center gap-1 text-xs bg-[#009CDE]/10 text-[#009CDE] px-2 py-1 rounded-md font-medium">
                    <TrendingUp className="h-3 w-3" /> 100%
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 bg-white relative group">
              <div className="absolute inset-0 bg-[#3F9C35]/5 rounded-lg opacity-80"></div>
              <div className="absolute inset-0 bg-[radial-gradient(#3F9C35_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.15]"></div>
              <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
                <CardTitle className="text-sm font-medium text-[#00153D]">Hot Lead</CardTitle>
                <div className="h-10 w-10 rounded-full bg-[#3F9C35]/10 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  <Flame className="h-5 w-5 text-[#3F9C35]" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-[#3F9C35]">{hotLeads}</div>
                  <div className="flex items-center gap-1 text-xs bg-[#3F9C35]/10 text-[#3F9C35] px-2 py-1 rounded-md font-medium">
                    <TrendingUp className="h-3 w-3" /> {hotLeadsPercent}%
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 bg-white relative group">
              <div className="absolute inset-0 bg-[#009CDE]/5 rounded-lg opacity-80"></div>
              <div className="absolute inset-0 bg-[radial-gradient(#009CDE_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.15]"></div>
              <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
                <CardTitle className="text-sm font-medium text-[#00153D]">Meeting Done</CardTitle>
                <div className="h-10 w-10 rounded-full bg-[#009CDE]/10 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  <CheckCircle className="h-5 w-5 text-[#009CDE]" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-[#009CDE]">{meetingDone}</div>
                  <div className="flex items-center gap-1 text-xs bg-[#009CDE]/10 text-[#009CDE] px-2 py-1 rounded-md font-medium">
                    <TrendingUp className="h-3 w-3" /> {Math.round((meetingDone / 30) * 100)}%
                  </div>
                </div>
                <div className="text-xs text-[#009CDE]/70 mt-1 font-medium">Monthly Target: 30 meetings</div>
                <Progress
                  value={Math.min(Math.round((meetingDone / 30) * 100), 100)}
                  className="h-2 mt-2"
                  indicatorClassName="bg-[#009CDE]"
                />
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 bg-white relative group">
              <div className="absolute inset-0 bg-[#3F9C35]/5 rounded-lg opacity-80"></div>
              <div className="absolute inset-0 bg-[radial-gradient(#3F9C35_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.15]"></div>
              <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
                <CardTitle className="text-sm font-medium text-[#00153D]">Meeting Scheduled</CardTitle>
                <div className="h-10 w-10 rounded-full bg-[#3F9C35]/10 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  <Calendar className="h-5 w-5 text-[#3F9C35]" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-[#3F9C35]">{meetingScheduled}</div>
                  <div className="flex items-center gap-1 text-xs bg-[#3F9C35]/10 text-[#3F9C35] px-2 py-1 rounded-md font-medium">
                    <TrendingUp className="h-3 w-3" /> {meetingScheduledPercent}%
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 bg-white relative group">
              <div className="absolute inset-0 bg-[#63666A]/5 rounded-lg opacity-80"></div>
              <div className="absolute inset-0 bg-[radial-gradient(#63666A_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.15]"></div>
              <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
                <CardTitle className="text-sm font-medium text-[#00153D]">Warm Leads</CardTitle>
                <div className="h-10 w-10 rounded-full bg-[#63666A]/10 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  <Flame className="h-5 w-5 text-[#63666A]" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-[#63666A]">{warmLeads}</div>
                  <div className="flex items-center gap-1 text-xs bg-[#63666A]/10 text-[#63666A] px-2 py-1 rounded-md font-medium">
                    <TrendingUp className="h-3 w-3" /> {warmLeadsPercent}%
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 bg-white relative group">
              <div className="absolute inset-0 bg-[#888B8D]/5 rounded-lg opacity-80"></div>
              <div className="absolute inset-0 bg-[radial-gradient(#888B8D_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.15]"></div>
              <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
                <CardTitle className="text-sm font-medium text-[#00153D]">New Leads</CardTitle>
                <div className="h-10 w-10 rounded-full bg-[#888B8D]/10 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  <Users className="h-5 w-5 text-[#888B8D]" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-[#888B8D]">{newLeads}</div>
                  <div className="flex items-center gap-1 text-xs bg-[#888B8D]/10 text-[#888B8D] px-2 py-1 rounded-md font-medium">
                    <TrendingUp className="h-3 w-3" /> {newLeadsPercent}%
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top SDRs Section */}
          <div className="lg:col-span-1">
            <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300 bg-white h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-[#009CDE]/10 flex items-center justify-center">
                    <BarChart2 className="h-3 w-3 text-[#009CDE]" />
                  </div>
                  Top Performing SDRs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topSdrs.map((sdr, index) => (
                    <div key={sdr.name} className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                          <AvatarImage
                            src={`/diverse-group-avatars.png?height=40&width=40&query=avatar ${index + 1}`}
                          />
                          <AvatarFallback className="bg-[#009CDE] text-white">
                            {sdr.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-white flex items-center justify-center shadow-sm">
                          <span className="text-xs font-bold text-[#009CDE]">#{index + 1}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-[#00153D]">{sdr.name}</div>
                        <div className="flex items-center gap-2 text-xs text-[#63666A]">
                          <span className="flex items-center gap-1">
                            <span className="h-2 w-2 rounded-full bg-[#3F9C35]"></span> {sdr.hot} hot
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="h-2 w-2 rounded-full bg-[#009CDE]"></span> {sdr.meetings} meetings
                          </span>
                        </div>
                      </div>
                      <div className="text-sm font-semibold text-[#009CDE]">{sdr.total} leads</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-[#63666A]/10">
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-[#009CDE] hover:text-[#00153D] hover:bg-[#009CDE]/5"
                  >
                    View all performance stats
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-[#009CDE] flex items-center justify-center shadow-sm">
              <ArrowUpRight className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-[#00153D]">
              Lead Pipeline
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="bg-white shadow-sm border-[#63666A]/20 text-[#63666A] hover:bg-[#63666A]/5 cursor-pointer"
            >
              All Leads
            </Badge>
            <Badge
              variant="outline"
              className="bg-white shadow-sm border-[#63666A]/20 text-[#63666A] hover:bg-[#63666A]/5 cursor-pointer"
            >
              This Month
            </Badge>
            <div className="text-sm text-[#888B8D]">
              Showing <span className="font-medium text-[#00153D]">{leadsData.length}</span> leads
            </div>
          </div>
        </div>

        <div className="border rounded-xl overflow-hidden shadow-sm bg-white">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-[#00153D]">
                <TableRow className="hover:bg-[#00153D] border-none">
                  <TableHead className="min-w-[150px] font-semibold text-white">Company</TableHead>
                  <TableHead className="min-w-[120px] font-semibold text-white">Person</TableHead>
                  <TableHead className="min-w-[120px] font-semibold text-white">Position</TableHead>
                  <TableHead className="min-w-[120px] font-semibold text-white">Lead Date</TableHead>
                  <TableHead className="min-w-[120px] font-semibold text-white">Meeting Date</TableHead>
                  <TableHead className="min-w-[120px] font-semibold text-white">Status</TableHead>
                  <TableHead className="min-w-[100px] font-semibold text-white">Solution</TableHead>
                  <TableHead className="min-w-[100px] font-semibold text-white">GEO</TableHead>
                  <TableHead className="min-w-[100px] font-semibold text-white">SDR Owner</TableHead>
                  <TableHead className="min-w-[180px] font-semibold text-white">Email</TableHead>
                  <TableHead className="min-w-[120px] font-semibold text-white">Phone</TableHead>
                  <TableHead className="min-w-[100px] font-semibold text-white">Rating</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leadsData.map((lead, index) => (
                  <TableRow
                    key={lead.id}
                    className={`hover:bg-[#009CDE]/5 group transition-colors cursor-pointer ${
                      index % 2 === 0 ? "bg-white" : "bg-white"
                    }`}
                    onDoubleClick={() => handleRowDoubleClick(lead.id)}
                  >
                    <TableCell className="font-medium whitespace-nowrap">
                      <div className="truncate max-w-[150px]" title={lead.companyName}>
                        {lead.companyName}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="truncate max-w-[120px] flex items-center gap-2" title={lead.personName}>
                        <Avatar className="h-6 w-6 hidden group-hover:flex">
                          <AvatarFallback className="bg-[#009CDE]/10 text-[#009CDE] text-xs">
                            {lead.personName.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span>{lead.personName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="truncate max-w-[120px]" title={lead.position}>
                        {lead.position}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 flex-shrink-0 text-[#009CDE]" />
                        <span className="truncate">{lead.leadDate}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 flex-shrink-0 text-[#009CDE]" />
                        <span className="truncate">{lead.meetingDate}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusDropdown
                        value={lead.leadStatus}
                        onChange={(status) => handleStatusChange(lead.id, status)}
                      />
                    </TableCell>
                    <TableCell>
                      <SolutionDropdown
                        value={lead.solution}
                        onChange={(solution) => handleSolutionChange(lead.id, solution)}
                      />
                    </TableCell>
                    <TableCell>
                      <GeoDropdown value={lead.geo} onChange={(geo) => handleGeoChange(lead.id, geo)} />
                    </TableCell>
                    <TableCell>
                      <SdrOwnerDropdown
                        value={lead.sdrOwner}
                        onChange={(sdrOwner) => handleSdrOwnerChange(lead.id, sdrOwner)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="truncate max-w-[180px] group-hover:text-[#009CDE]" title={lead.email || "-"}>
                        {lead.email || "-"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="truncate max-w-[120px]" title={lead.phone || "-"}>
                        {lead.phone || "-"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex">
                        {Array.from({ length: lead.leadRating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-[#3F9C35] text-[#3F9C35]" />
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}
