'use client'

import { useState } from "react"
import NameInput from "./NameInput"
import OutputCode from "./OutputCode"
import ColorPicker from "./ColorPicker"
import Preview from "./Preview"
import CopyButton from "./CopyButton"

export default function Tool() {
  const [name, setName] = useState("")
  const [color, setColor] = useState("000000 ") // default white
  const [nameSyntax, setNameSyntax] = useState({
      bold: [] as number[],
      italic: [] as number[],
      wide: [] as number[],
      color: [
          {
              code: "FFF",
              indices: [] as number[]
          }
      ]
  })

  return (
    <div className="space-y-4">
      <NameInput name={name} setName={setName} setNameSyntax={setNameSyntax} color={color}/>
      <Preview styledName={name} nameSyntax={nameSyntax}/>
      <ColorPicker color={color} onChange={setColor} />
      <OutputCode styledName={name} />
      <CopyButton styledName={name} />
    </div>
  )
}