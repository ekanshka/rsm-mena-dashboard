"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { columnColors } from "@/lib/data"

export type SolutionOption = {
  value: string
  label: string
}

// Updated to only include options shown in the image
export const solutionOptions: SolutionOption[] = [
  { value: "GRC", label: "GRC" },
  { value: "VAPT", label: "VAPT" },
  { value: "CISOasaService", label: "CISOasaService" },
]

interface SolutionDropdownProps {
  value: string
  onChange?: (value: string) => void
  className?: string
}

export function SolutionDropdown({ value, onChange, className }: SolutionDropdownProps) {
  const [selectedValue, setSelectedValue] = useState(value)

  const selectedOption = solutionOptions.find((option) => option.value === selectedValue) || {
    value: selectedValue,
    label: selectedValue,
  }

  const handleSelect = (option: SolutionOption) => {
    setSelectedValue(option.value)
    if (onChange) {
      onChange(option.value)
    }
  }

  // Use the consistent color for all solution badges
  const badgeColor = columnColors.solution

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn("flex items-center", className)}>
          <Badge className={cn("cursor-pointer font-normal", badgeColor)}>{selectedOption.label}</Badge>
          <ChevronDown className="h-4 w-4 opacity-50 ml-1" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56 bg-white border border-gray-200 shadow-lg rounded-md">
        {solutionOptions.map((option) => (
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
