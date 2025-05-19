"use client"

import type React from "react"

import { useState } from "react"
import { Check, ChevronDown, X } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { columnColors } from "@/lib/data"

export type SdrOption = {
  value: string
  label: string
}

export const sdrOptions: SdrOption[] = [
  { value: "SDR 1", label: "SDR 1" },
  { value: "SDR 2", label: "SDR 2" },
  { value: "SDR 3", label: "SDR 3" },
]

interface SdrOwnerDropdownProps {
  value: string
  onChange?: (value: string) => void
  className?: string
}

export function SdrOwnerDropdown({ value, onChange, className }: SdrOwnerDropdownProps) {
  const [selectedValue, setSelectedValue] = useState(value)

  const selectedOption = sdrOptions.find((option) => option.value === selectedValue) || {
    value: selectedValue,
    label: selectedValue,
  }

  const handleSelect = (option: SdrOption) => {
    setSelectedValue(option.value)
    if (onChange) {
      onChange(option.value)
    }
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedValue("")
    if (onChange) {
      onChange("")
    }
  }

  // Use the consistent color for all SDR owner badges
  const badgeColor = columnColors.sdrOwner

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn("flex items-center", className)}>
          {selectedValue ? (
            <div className="flex items-center gap-1">
              <Badge className={cn("cursor-pointer font-normal", badgeColor)}>
                {selectedOption.label}
                <X className="h-3 w-3 ml-1" onClick={handleClear} />
              </Badge>
              <ChevronDown className="h-4 w-4 opacity-50 ml-1" />
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">Select an option or create one</div>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56 bg-white border border-gray-200 shadow-lg rounded-md">
        {sdrOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-800"
            onSelect={() => handleSelect(option)}
          >
            <div className="grid place-items-center w-5">
              <span className="text-gray-400">::</span>
            </div>
            <Badge className={cn("cursor-pointer", badgeColor)}>{option.label}</Badge>
            {option.value === selectedValue && <Check className="h-4 w-4 ml-auto" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
