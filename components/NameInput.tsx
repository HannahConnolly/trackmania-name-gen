// Input + state
type Props = {
  name: string
  setName: (val: string) => void
}

export default function NameInput({ name, setName }: Props) {
  return (
    <div>
      <label htmlFor="name" className="block mb-2 text-sm text-gray-400">Enter Your Name</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
        placeholder="e.g., YourName"
        autoComplete="off"
        spellCheck={false}
      />
    </div>
  )
}
