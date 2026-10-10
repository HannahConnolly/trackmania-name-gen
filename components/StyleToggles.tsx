'use client'

import { STYLE_CODES, Styles } from "@/lib/tmFormat"

type Props = {
  styles: Styles
  onChange: (styles: Styles) => void
}

export default function StyleToggles({ styles, onChange }: Props) {
  const toggle = (key: keyof Styles) => {
    const next = { ...styles, [key]: !styles[key] }
    // wide and narrow cancel each other out in game
    if (key === "wide" && next.wide) next.narrow = false
    if (key === "narrow" && next.narrow) next.wide = false
    onChange(next)
  }

  return (
    <div>
      <p className="text-sm text-gray-400 mb-1">Styles:</p>
      <div className="flex flex-wrap gap-2">
        {STYLE_CODES.map(({ key, code, label }) => (
          <button
            key={key}
            onClick={() => toggle(key)}
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
