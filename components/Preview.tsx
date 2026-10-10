import { parseCode } from "@/lib/tmFormat"

// Displays the styled name visually
type Props = { styledName: string }

export default function Preview({ styledName }: Props) {
  return (
    <div>
      <p className="text-sm text-gray-400 mb-1">Preview:</p>
      <div className="bg-gray-900 p-4 rounded border border-gray-700 text-2xl whitespace-pre-wrap break-words min-h-16">
        {styledName
          ? parseCode(styledName).map((seg, i) => (
              <span
                key={i}
                style={{
                  color: seg.color ? `#${seg.color}` : undefined,
                  fontWeight: seg.bold ? 700 : undefined,
                  fontStyle: seg.italic ? "italic" : undefined,
                  textTransform: seg.uppercase ? "uppercase" : undefined,
                  textShadow: seg.shadow ? "2px 2px 0 rgba(0, 0, 0, 0.9)" : undefined,
                  letterSpacing: seg.wide ? "0.25em" : seg.narrow ? "-0.05em" : undefined,
                  fontStretch: seg.wide ? "expanded" : seg.narrow ? "condensed" : undefined,
                }}
              >
                {seg.text}
              </span>
            ))
          : <span className="text-gray-600 text-base">&lt;empty&gt;</span>}
      </div>
    </div>
  )
}
