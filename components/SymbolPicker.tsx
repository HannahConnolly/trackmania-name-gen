'use client'

import { SYMBOLS } from "@/lib/presets"

type Props = { onPick: (symbol: string) => void }

export default function SymbolPicker({ onPick }: Props) {
  return (
    <div>
      <p className="text-sm text-gray-400 mb-1">Add a symbol (not every symbol shows up in game, so check it there):</p>
      <div className="flex flex-wrap gap-1">
        {SYMBOLS.map((symbol) => (
          <button
            key={symbol}
            onClick={() => onPick(symbol)}
            aria-label={`Add ${symbol}`}
            className="w-8 h-8 rounded bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 cursor-pointer"
          >
            {symbol}
          </button>
        ))}
      </div>
    </div>
  )
}
