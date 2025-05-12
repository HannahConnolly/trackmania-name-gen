import { JSX } from "react";

// Displays the raw generated code
type Props = { styledName: string }

export default function OutputCode({ styledName }: Props) {
  return (
    <div>
      <p className="text-sm text-gray-400 mb-1">Generated Code:</p>
      <pre className="bg-gray-900 p-4 rounded border border-gray-700 overflow-x-auto">
        {styledName || "<empty>"}
      </pre>
    </div>
  )
}