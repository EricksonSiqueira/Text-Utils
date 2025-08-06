"use client"
import { useState } from "react"
import { joinTextIntoLines } from "utils/spreadsheet"
import { removeDotsAndDashes } from "utils/text"

export default function RemoveDotsPage() {
  const [typedText, setTypedText] = useState("")

  const copyTextWithoutDotsAndDashes = () => {
    const textWithoutDotsAndDashes = removeDotsAndDashes(typedText)
    const arrayOfTexts = textWithoutDotsAndDashes.split("\n").filter(Boolean)
    const textInLinesForCopy = joinTextIntoLines(arrayOfTexts)

    console.log(textInLinesForCopy)

    navigator.clipboard.writeText(textInLinesForCopy).then(() => {
      alert("CPFs copied to clipboard!")
    })
  }

  return (
    <section className="flex w-[1440px] flex-col gap-4">
      <h2 className="text-2xl text-white">Removedor de "." e "-"</h2>
      <label htmlFor="text-input" className="flex flex-col gap-2 text-white">
        CPFs
        <textarea
          name="text-input"
          id="text-input"
          className="bg-white p-2 text-black"
          value={typedText}
          onChange={(e) => setTypedText(e.target.value)}
        />
      </label>
      <button onClick={copyTextWithoutDotsAndDashes} className="cursor-pointer rounded bg-cyan-600 p-4 text-white">
        Copiar CPFs tratados
      </button>
    </section>
  )
}
