'use client'

import { hex6to3 } from "@/lib/tmFormat"

type Props = {
  color: string
  onChange: (color: string) => void
  label?: string
  onRemove?: () => void
}

export default function ColorPicker({ color, onChange, label = "Pick a Color", onRemove }: Props) {
  return (
    <div className="flex items-center space-x-4">
      <label className="text-sm text-gray-300 w-32">{label}</label>
      <input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className="w-10 h-10 p-0 border-none rounded-md cursor-pointer bg-transparent"
      />
      <span className="text-sm text-gray-400 font-mono">${hex6to3(color)}</span>
      {onRemove && (
        <button onClick={onRemove} className="text-sm text-gray-500 hover:text-red-400 cursor-pointer">
          Remove
        </button>
      )}
    </div>
  )
}
