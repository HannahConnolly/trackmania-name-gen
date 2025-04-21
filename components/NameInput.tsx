// Input + state
type Props = {
    name: string
    setName: (val: string) => void
    setStyledName: (val: string) => void
  }
  
  export default function NameInput({ name, setName, setStyledName }: Props) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value
      setName(raw)
  
      // Very basic formatter – colors every letter red
      const formatted = [...raw].map(char => `$f00${char}`).join("")
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
  