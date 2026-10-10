'use client'

import { useState } from "react"
import NameInput from "./NameInput"
import SymbolPicker from "./SymbolPicker"
import CharSelector from "./CharSelector"
import OutputCode from "./OutputCode"
import ColorPicker from "./ColorPicker"
import GradientPresets from "./GradientPresets"
import StyleToggles from "./StyleToggles"
import Preview from "./Preview"
import CopyButton from "./CopyButton"
import { generateCode, NO_STYLES, STYLE_CODES, StyledChar, Styles, updateChars } from "@/lib/tmFormat"

const MAX_COLORS = 4

export default function Tool() {
  const [chars, setChars] = useState<StyledChar[]>([])
  const [colors, setColors] = useState(["#ff0000"]) // one color = solid, more = gradient
  const [styles, setStyles] = useState<Styles>(NO_STYLES) // styles for newly typed characters
  const [selected, setSelected] = useState<number[]>([])

  const name = chars.map((c) => c.char).join("")
  const styledName = generateCode(chars, colors)
  const hasSelection = selected.length > 0

  const setName = (val: string) => {
    setChars(updateChars(chars, val, styles))
    setSelected([])
  }

  const setColor = (index: number, color: string) =>
    setColors(colors.map((c, i) => (i === index ? color : c)))

  // edits apply to the selected characters, or to the whole name when nothing is selected
  const updateTargets = (update: (c: StyledChar) => StyledChar) =>
    setChars(chars.map((c, i) => (!hasSelection || selected.includes(i) ? update(c) : c)))

  const shownStyles = hasSelection
    ? (Object.fromEntries(
        STYLE_CODES.map(({ key }) => [key, selected.every((i) => chars[i].styles[key])])
      ) as Styles)
    : styles

  const toggleStyle = (key: keyof Styles) => {
    const on = !shownStyles[key]
    const apply = (s: Styles): Styles => ({
      ...s,
      // wide and narrow cancel each other out in game
      ...(on && key === "wide" ? { narrow: false } : {}),
      ...(on && key === "narrow" ? { wide: false } : {}),
      [key]: on,
    })
    updateTargets((c) => ({ ...c, styles: apply(c.styles) }))
    if (!hasSelection) setStyles(apply(styles))
  }

  return (
    <div className="space-y-4">
      <NameInput name={name} setName={setName} />
      <SymbolPicker onPick={(symbol) => setName(name + symbol)} />
      <Preview styledName={styledName} />
      <CharSelector chars={chars} selected={selected} onChange={setSelected} />

      {hasSelection && (
        <ColorPicker
          color={chars[selected[0]].color ?? "#ffffff"}
          onChange={(color) => updateTargets((c) => ({ ...c, color }))}
          label="Selection Color"
          onRemove={
            selected.some((i) => chars[i].color)
              ? () => updateTargets((c) => ({ ...c, color: null }))
              : undefined
          }
        />
      )}

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
        <GradientPresets onPick={setColors} />
      </div>

      <StyleToggles
        styles={shownStyles}
        onToggle={toggleStyle}
        label={hasSelection ? "Styles (selected letters):" : "Styles:"}
      />
      <OutputCode styledName={styledName} />
      <CopyButton styledName={styledName} />
    </div>
  )
}
