"use client"

import { useState } from "react"

import { createWorkbook, downloadWorkbook, jsonToWorksheet } from "utils/json-converter"

type JsonRecord = Record<string, unknown>

export default function JsonToExcelPage() {
  const [jsonInput, setJsonInput] = useState("")
  const [fileName, setFileName] = useState("planilha")
  const [error, setError] = useState("")

  function handleConvert() {
    try {
      setError("")

      if (!jsonInput.trim()) {
        setError("Informe um JSON para converter.")
        return
      }

      const parsedJson: unknown = JSON.parse(jsonInput)

      let data: JsonRecord[]

      if (Array.isArray(parsedJson)) {
        data = parsedJson as JsonRecord[]
      } else if (typeof parsedJson === "object" && parsedJson !== null) {
        data = [parsedJson as JsonRecord]
      } else {
        setError("O JSON precisa ser um objeto ou um array de objetos.")
        return
      }

      if (data.length === 0) {
        setError("O JSON informado não possui registros.")
        return
      }

      const worksheet = jsonToWorksheet(data)
      const workbook = createWorkbook(worksheet, "Dados")

      downloadWorkbook(workbook, fileName.trim() || "planilha", "xlsx")
    } catch {
      setError("JSON inválido. Verifique a estrutura e tente novamente.")
    }
  }

  return (
    <main className="min-h-screen bg-[#09090b] px-6 py-8 text-zinc-100">
      <div className="mx-auto max-w-[1440px]">
        {/* Título */}
        <h1 className="mb-12 text-center text-4xl font-normal tracking-tight text-white">
          Utilitários por que não sei usar EXCEL
        </h1>

        {/* Área utilizável */}
        <div className="rounded-2xl border border-[#3b3154] bg-[#1c1728] p-8 shadow-2xl shadow-black/30">
          {/* Conversor */}
          <section>
            <h2 className="mb-6 text-2xl font-normal text-zinc-100">Conversor de JSON para Excel</h2>

            <div className="space-y-6">
              {/* Nome do arquivo */}
              <div>
                <label htmlFor="fileName" className="mb-3 block text-sm font-medium text-zinc-300">
                  Nome do arquivo
                </label>

                <input
                  id="fileName"
                  type="text"
                  value={fileName}
                  onChange={(event) => setFileName(event.target.value)}
                  placeholder="planilha"
                  className="w-full rounded-lg border border-[#302744] bg-[#0d0d11] px-4 py-3 text-zinc-100 transition outline-none placeholder:text-zinc-600 focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6]/50"
                />
              </div>

              {/* JSON */}
              <div>
                <label htmlFor="json" className="mb-3 block text-sm font-medium text-zinc-300">
                  JSON
                </label>

                <textarea
                  id="json"
                  value={jsonInput}
                  onChange={(event) => {
                    setJsonInput(event.target.value)

                    if (error) {
                      setError("")
                    }
                  }}
                  placeholder={`[
  {
    "nome": "João",
    "idade": 30,
    "email": "joao@email.com"
  },
  {
    "nome": "Maria",
    "idade": 25,
    "email": "maria@email.com"
  }
]`}
                  className="min-h-[450px] w-full resize-y rounded-lg border border-[#302744] bg-[#0d0d11] p-4 font-mono text-sm leading-relaxed text-zinc-100 transition outline-none placeholder:text-zinc-700 focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6]/50"
                />
              </div>

              {/* Erro */}
              {error && (
                <div className="rounded-lg border border-red-900/60 bg-red-950/40 p-4 text-sm text-red-300">
                  {error}
                </div>
              )}

              {/* Botão */}
              <button
                type="button"
                onClick={handleConvert}
                disabled={!jsonInput.trim()}
                className="w-full rounded-lg bg-[#7c3aed] px-6 py-4 text-base font-medium text-white transition hover:bg-[#8b5cf6] active:bg-[#6d28d9] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Converter e baixar Excel
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
