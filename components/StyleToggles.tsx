'use client'

import { STYLE_CODES, Styles } from "@/lib/tmFormat"

type Props = {
  styles: Styles
  onToggle: (key: keyof Styles) => void
  label?: string
}

export default function StyleToggles({ styles, onToggle, label = "Styles:" }: Props) {
  return (
    <div>
      <p className="text-sm text-gray-400 mb-1">{label}</p>
      <div className="flex flex-wrap gap-2">
        {STYLE_CODES.map(({ key, code, label }) => (
          <button
            key={key}
            onClick={() => onToggle(key)}
            aria-pressed={styles[key]}
            className={`px-3 py-1 rounded border text-sm cursor-pointer ${
              styles[key]
                ? "bg-blue-600 border-blue-500 text-white"
                : "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {label} <span className="opacity-60">${code}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
