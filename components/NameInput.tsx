// Input + state
type Props = {
    name: string
    setName: (val: string) => void
    setNameSyntax: (val: object) => void
    color: string
  }
  
  export default function NameInput({ name, setName, setNameSyntax, color }: Props) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      
      const raw = e.target.value

      setName(raw)
      const nameSyntax = {
          bold: [],
          italic: [],
          wide: [],
          color: [
              {
                  code: "FFF",
                  indices: []
              }
          ]
      }
  
      function hex6to3(hex: string): string {
        hex = hex.replace("#", "")
        if (hex.length !== 6) return "fff" // fallback
      
        const r = hex[0] === hex[1] ? hex[0] : Math.round(parseInt(hex.slice(0, 2), 16) / 17).toString(16)
        const g = hex[2] === hex[3] ? hex[2] : Math.round(parseInt(hex.slice(2, 4), 16) / 17).toString(16)
        const b = hex[4] === hex[5] ? hex[4] : Math.round(parseInt(hex.slice(4, 6), 16) / 17).toString(16)
      
        return `${r}${g}${b}`
      }
    
      const shortHex = hex6to3(color)
      const formatted = [...raw].map(char => `$${shortHex}${char}`).join("")
      setStyledName(formatted)
    }

    return (
      <div>
        <label className="block mb-2 text-sm text-gray-400">Enter Your Name</label>
        <input
          type="text"
          value={name}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
          placeholder="e.g., YourName"
        />
      </div>
    )
  }