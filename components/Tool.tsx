'use client'

import { useState } from "react"
import NameInput from "./NameInput"
import OutputCode from "./OutputCode"
import Preview from "./Preview"
import CopyButton from "./CopyButton"

export default function Tool() {
  const [name, setName] = useState("")
  const [styledName, setStyledName] = useState("")

  return (
    <div className="space-y-4">
      <NameInput name={name} setName={setName} setStyledName={setStyledName} />
      <Preview styledName={styledName} />
      <OutputCode styledName={styledName} />
      <CopyButton styledName={styledName} />
    </div>
  )
}