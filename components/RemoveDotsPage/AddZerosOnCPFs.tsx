"use client"
import { useState } from "react"
import { joinTextIntoLines } from "utils/spreadsheet"
import { padWithZeros } from "utils/text"

export default function AddZerosOnCPFs() {
  const [typedText, setTypedText] = useState("")

  const copyTextWithAllZeros = () => {
    const arrayOfCPFs = typedText.split("\n").filter(Boolean)
    const fullCPFsArray = padWithZeros(arrayOfCPFs)
    const textInLinesForCopy = joinTextIntoLines(fullCPFsArray)

    console.log(textInLinesForCopy)

    navigator.clipboard.writeText(textInLinesForCopy).then(() => {
      alert("CPFs copied to clipboard!")
    })
  }

  return (
    <section className="flex w-[1440px] flex-col gap-4">
      <h2 className="text-2xl text-white">Adiciona 0 na frente de CPFs</h2>
      <label htmlFor="text-input-pad" className="flex flex-col gap-2 text-white">
        CPFs
        <textarea
          name="text-input-pad"
          id="text-input-pad"
          className="bg-white p-2 text-black"
          value={typedText}
          onChange={(e) => setTypedText(e.target.value)}
        />
      </label>
      <button onClick={copyTextWithAllZeros} className="cursor-pointer rounded bg-cyan-600 p-4 text-white">
        Copiar CPFs com zeros
      </button>
    </section>
  )
}
