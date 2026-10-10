// Trackmania text formatting: code generation + parsing
// https://wiki.trackmania.io/en/content-creation/text-styling

export type Styles = {
  bold: boolean
  italic: boolean
  wide: boolean
  narrow: boolean
  uppercase: boolean
  shadow: boolean
}

export type Segment = Styles & {
  text: string
  color: string | null // 3-digit hex, null = default color
}

export const NO_STYLES: Styles = {
  bold: false,
  italic: false,
  wide: false,
  narrow: false,
  uppercase: false,
  shadow: false,
}

export const STYLE_CODES: { key: keyof Styles; code: string; label: string }[] = [
  { key: "bold", code: "o", label: "Bold" },
  { key: "italic", code: "i", label: "Italic" },
  { key: "wide", code: "w", label: "Wide" },
  { key: "narrow", code: "n", label: "Narrow" },
  { key: "uppercase", code: "t", label: "Uppercase" },
  { key: "shadow", code: "s", label: "Shadow" },
]

function hexToRgb(hex: string): [number, number, number] {
  hex = hex.replace("#", "")
  if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  if (!/^[0-9a-f]{6}$/i.test(hex)) return [255, 255, 255] // fallback
  return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16)) as [number, number, number]
}

function rgbTo3(rgb: number[]): string {
  return rgb.map((c) => Math.round(c / 17).toString(16)).join("")
}

export function hex6to3(hex: string): string {
  return rgbTo3(hexToRgb(hex))
}

// One 3-digit color per character, interpolated across the given stops
export function gradientCodes(stops: string[], count: number): string[] {
  const rgbs = stops.map(hexToRgb)
  if (rgbs.length === 0) return Array(count).fill("fff")

  return Array.from({ length: count }, (_, i) => {
    if (rgbs.length === 1 || count === 1) return rgbTo3(rgbs[0])

    const pos = (i / (count - 1)) * (rgbs.length - 1)
    const from = Math.min(Math.floor(pos), rgbs.length - 2)
    const t = pos - from
    return rgbTo3(rgbs[from].map((c, ch) => c + (rgbs[from + 1][ch] - c) * t))
  })
}

export function generateCode(name: string, colors: string[], styles: Styles): string {
  const chars = Array.from(name)
  if (chars.length === 0) return ""

  // spaces don't take a gradient step
  const codes = gradientCodes(colors, chars.filter((c) => c.trim()).length)

  let out = STYLE_CODES.filter((s) => styles[s.key])
    .map((s) => `$${s.code}`)
    .join("")
  let last = ""
  let visible = 0

  for (const char of chars) {
    if (char.trim()) {
      const code = codes[visible++]
      if (code !== last) {
        out += `$${code}`
        last = code
      }
    }
    out += char === "$" ? "$$" : char
  }

  return out
}

export function parseCode(input: string): Segment[] {
  const segments: Segment[] = []
  let state: Omit<Segment, "text"> = { ...NO_STYLES, color: null }
  let text = ""

  const flush = () => {
    if (text) segments.push({ ...state, text })
    text = ""
  }

  for (let i = 0; i < input.length; i++) {
    if (input[i] !== "$") {
      text += input[i]
      continue
    }

    const hex = input.slice(i + 1, i + 4)
    if (/^[0-9a-f]{3}$/i.test(hex)) {
      flush()
      state = { ...state, color: hex }
      i += 3
      continue
    }

    const code = (input[i + 1] ?? "").toLowerCase()
    i++
    if (code === "$") {
      text += "$"
      continue
    }

    flush()
    const style = STYLE_CODES.find((s) => s.code === code)
    if (style) {
      state = { ...state, [style.key]: !state[style.key] }
      if (style.key === "wide" && state.wide) state.narrow = false
      if (style.key === "narrow" && state.narrow) state.wide = false
    } else if (code === "m") {
      state = { ...state, wide: false, narrow: false }
    } else if (code === "g") {
      state = { ...state, color: null }
    } else if (code === "z") {
      state = { ...NO_STYLES, color: null }
    }
    // unknown codes are swallowed, same as in game
  }

  flush()
  return segments
}
