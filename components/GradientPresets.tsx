'use client'

import { GRADIENT_PRESETS } from "@/lib/presets"

type Props = { onPick: (colors: string[]) => void }

export default function GradientPresets({ onPick }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2 pt-1">
      <span className="text-sm text-gray-400">Presets:</span>
      {GRADIENT_PRESETS.map(({ label, colors }) => (
        <button
          key={label}
          onClick={() => onPick(colors)}
          style={{ backgroundImage: `linear-gradient(to right, ${colors.join(", ")})` }}
          className="px-3 py-1 rounded text-sm font-semibold text-black cursor-pointer hover:opacity-80"
        >
          {label}
        </button>
      ))}
    </div>
  )
}
