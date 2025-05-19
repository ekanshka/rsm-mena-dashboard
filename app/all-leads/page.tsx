"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  CalendarDays,
  Star,
  Search,
  Filter,
  Plus,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { leadsData as initialLeadsData, type Lead, type LeadStatus } from "@/lib/data"
import { StatusDropdown } from "@/components/status-dropdown"
import { SolutionDropdown } from "@/components/solution-dropdown"
import { GeoDropdown } from "@/components/geo-dropdown"
import { SdrOwnerDropdown } from "@/components/sdr-owner-dropdown"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function AllLeads() {
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
                All Leads
              </h1>
              <p className="text-[#63666A]">View and manage all leads in one place</p>
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
