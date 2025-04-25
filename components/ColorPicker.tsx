'use client'

type Props = {
  color: string
  onChange: (color: string) => void
  label?: string
}

export default function ColorPicker({ color, onChange, label = "Pick a Color" }: Props) {
  return (
    <div className="flex items-center space-x-4">
      <label className="text-sm text-gray-300">{label}</label>
      <input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="w-10 h-10 p-0 border-none rounded-md cursor-pointer bg-transparent"
      />
      <span className="text-sm text-gray-400">{color.toUpperCase()}</span>
    </div>
  )
}
