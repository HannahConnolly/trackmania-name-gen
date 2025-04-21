"use client";

import NameInput from "@/components/NameInput"
import Preview from "@/components/Preview"
import CopyButton from "@/components/CopyButton"
import { useState } from "react"

export default function Home() {
  const [name, setName] = useState("")
  const [styledName, setStyledName] = useState("")

  return (
    <html>
        <body>
            <main className="max-w-2xl mx-auto space-y-6">
                <h1 className="text-3xl font-bold text-center">🎨 Trackmania Name Colors</h1>
                <NameInput name={name} setName={setName} setStyledName={setStyledName} />
                <Preview styledName={styledName} />
                <CopyButton styledName={styledName} />
            </main>
        </body>
    </html>
  )
}
