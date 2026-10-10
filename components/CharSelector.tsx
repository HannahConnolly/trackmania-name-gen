'use client'

import { useState } from "react"
import { StyledChar } from "@/lib/tmFormat"

// Pick individual letters to color/style on their own
type Props = {
  chars: StyledChar[]
  selected: number[]
  onChange: (selected: number[]) => void
}

export default function CharSelector({ chars, selected, onChange }: Props) {
  const [anchor, setAnchor] = useState<number | null>(null)

  if (chars.length === 0) return null

  const handleClick = (index: number, shiftKey: boolean) => {
    if (shiftKey && anchor !== null && anchor < chars.length) {
      // shift-click selects everything between the last click and this one
      const from = Math.min(anchor, index)
      const range = Array.from({ length: Math.abs(anchor - index) + 1 }, (_, i) => from + i)
      onChange([...new Set([...selected, ...range])])
    } else if (selected.includes(index)) {
      onChange(selected.filter((i) => i !== index))
    } else {
      onChange([...selected, index])
    }
    setAnchor(index)
  }

  return (
    <div>
      <p className="text-sm text-gray-400 mb-1 flex justify-between">
        <span>Click letters to style them individually (shift-click for a range):</span>
        {selected.length > 0 && (
          <button onClick={() => onChange([])} className="text-blue-400 hover:text-blue-300 cursor-pointer">
            Clear selection
          </button>
        )}
      </p>
      <div className="flex flex-wrap gap-1">
        {chars.map(({ char }, i) => (
          <button
            key={i}
            onClick={(e) => handleClick(i, e.shiftKey)}
            aria-pressed={selected.includes(i)}
            className={`min-w-8 h-8 px-1 rounded border font-mono cursor-pointer ${
              selected.includes(i)
                ? "bg-blue-600 border-blue-500 text-white"
                : "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {char.trim() ? char : " "}
          </button>
        ))}
      </div>
    </div>
  )
}
