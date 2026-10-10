'use client'

import { useState } from "react"
import NameInput from "./NameInput"
import OutputCode from "./OutputCode"
import ColorPicker from "./ColorPicker"
import StyleToggles from "./StyleToggles"
import Preview from "./Preview"
import CopyButton from "./CopyButton"
import { generateCode, NO_STYLES, Styles } from "@/lib/tmFormat"

const MAX_COLORS = 4

export default function Tool() {
  const [name, setName] = useState("")
  const [colors, setColors] = useState(["#ff0000"]) // one color = solid, more = gradient
  const [styles, setStyles] = useState<Styles>(NO_STYLES)

  const styledName = generateCode(name, colors, styles)

  const setColor = (index: number, color: string) =>
    setColors(colors.map((c, i) => (i === index ? color : c)))

  return (
    <div className="space-y-4">
      <NameInput name={name} setName={setName} />
      <Preview styledName={styledName} />

      <div className="space-y-2">
        {colors.map((color, i) => (
          <ColorPicker
            key={i}
            color={color}
            onChange={(c) => setColor(i, c)}
            label={colors.length > 1 ? `Gradient Color ${i + 1}` : "Pick a Color"}
            onRemove={colors.length > 1 ? () => setColors(colors.filter((_, j) => j !== i)) : undefined}
          />
        ))}
        {colors.length < MAX_COLORS && (
          <button
            onClick={() => setColors([...colors, "#0000ff"])}
            className="text-sm text-blue-400 hover:text-blue-300 cursor-pointer"
          >
            + Add gradient color
          </button>
        )}
      </div>

      <StyleToggles styles={styles} onChange={setStyles} />
      <OutputCode styledName={styledName} />
      <CopyButton styledName={styledName} />
    </div>
  )
}
