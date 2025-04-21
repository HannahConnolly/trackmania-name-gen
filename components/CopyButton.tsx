// Copy-to-clipboard
"use client"
import { useState } from "react"

type Props = { styledName: string }

export default function CopyButton({ styledName }: Props) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(styledName)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={copyToClipboard}
      disabled={!styledName}
      className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-4 py-2 rounded"
    >
      {copied ? "Copied!" : "Copy to Clipboard"}
    </button>
  )
}
