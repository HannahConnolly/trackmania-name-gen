'use client'

import { useState } from "react"
import NameInput from "./NameInput"
import OutputCode from "./OutputCode"
import ColorPicker from "./ColorPicker"
import Preview from "./Preview"
import CopyButton from "./CopyButton"

export default function Tool() {
  const [name, setName] = useState("")
  const [styledName, setStyledName] = useState("")
  const [nameSyntax, setNameSyntax] = useState({})
  const [color, setColor] = useState("000000 ") // default white

  return (
    <div className="space-y-4">
      <NameInput name={name} setName={setName} setNameSyntax={setNameSyntax} color={color}/>
      <Preview styledName={styledName} />
      <ColorPicker color={color} onChange={setColor} />
      <OutputCode styledName={styledName} />
      <CopyButton styledName={styledName} />
    </div>
  )
}