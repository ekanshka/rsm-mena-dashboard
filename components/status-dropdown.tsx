"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export type StatusOption = {
  value: string
  label: string
  color: string
  category: "todo" | "inprogress" | "complete"
}

export const statusOptions: StatusOption[] = [
  { value: "lead", label: "Lead", color: "bg-gray-500", category: "todo" },
  { value: "warm", label: "Warm", color: "bg-orange-500", category: "inprogress" },
  { value: "hot", label: "Hot", color: "bg-rose-500", category: "inprogress" },
  { value: "meeting_schedule", label: "Meeting Schedule", color: "bg-amber-500", category: "inprogress" },
  { value: "meeting_done", label: "Meeting Done", color: "bg-green-500", category: "complete" },
]

interface StatusDropdownProps {
  value: string
  onChange?: (value: string) => void
  className?: string
}

export function StatusDropdown({ value, onChange, className }: StatusDropdownProps) {
  const [selectedValue, setSelectedValue] = useState(value)

  const selectedOption = statusOptions.find((option) => option.value === selectedValue) || statusOptions[0]

  const handleSelect = (option: StatusOption) => {
    setSelectedValue(option.value)
    if (onChange) {
      onChange(option.value)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-2 px-2 py-1 rounded-md hover:bg-accent border border-transparent hover:border-gray-200",
            className,
          )}
        >
          <div className={cn("w-2 h-2 rounded-full", selectedOption.color)} />
          <span>{selectedOption.label}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">To-do</div>
        {statusOptions
          .filter((option) => option.category === "todo")
          .map((option) => (
            <DropdownMenuItem
              key={option.value}
              className="flex items-center gap-2"
              onSelect={() => handleSelect(option)}
            >
              <div className={cn("w-3 h-3 rounded-full", option.color)} />
              <span>{option.label}</span>
              {option.value === selectedValue && <Check className="h-4 w-4 ml-auto" />}
            </DropdownMenuItem>
          ))}

        <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">In progress</div>
        {statusOptions
          .filter((option) => option.category === "inprogress")
          .map((option) => (
            <DropdownMenuItem
              key={option.value}
              className="flex items-center gap-2"
              onSelect={() => handleSelect(option)}
            >
              <div className={cn("w-3 h-3 rounded-full", option.color)} />
              <span>{option.label}</span>
              {option.value === selectedValue && <Check className="h-4 w-4 ml-auto" />}
            </DropdownMenuItem>
          ))}

        <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Complete</div>
        {statusOptions
          .filter((option) => option.category === "complete")
          .map((option) => (
            <DropdownMenuItem
              key={option.value}
              className="flex items-center gap-2"
              onSelect={() => handleSelect(option)}
            >
              <div className={cn("w-3 h-3 rounded-full", option.color)} />
              <span>{option.label}</span>
              {option.value === selectedValue && <Check className="h-4 w-4 ml-auto" />}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
