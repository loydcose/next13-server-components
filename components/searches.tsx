"use client"

import { useEffect, useRef, useState } from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "./ui/input"

const frameworks = [
  {
    value: "sortDate",
    label: "Sort by date",
  },
  {
    value: "newest",
    label: "Newest blogs",
  },
  {
    value: "oldest",
    label: "Oldest blogs",
  },
]

interface SearchObj {
  name: string
  sort: string
}

export default function Searches() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("sortDate")
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQueries] = useState("")
  const searchParams = new URLSearchParams(query)
  console.log(searchParams.toString())

  const handleSearch = () => {
    if (inputRef.current) {
      setQueries(searchParams.toString())
      searchParams.set("name", inputRef.current.value)
    }
  }

  useEffect(() => {
    searchParams.set("sort", value)
    setQueries(searchParams.toString())
  }, [value])

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-4">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search blog..."
          className=""
        />
        <Button variant="outline">
          <X />
        </Button>
        <Button onClick={handleSearch} variant="outline">
          Submit
        </Button>
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {frameworks.find((framework) => framework.value === value)?.label}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search framework..." />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  onSelect={(currentValue: string) => {
                    setValue(framework.value)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {/* <Check /> */}
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
