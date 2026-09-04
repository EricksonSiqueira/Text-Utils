import * as XLSX from "xlsx"

export function jsonToWorksheet<T extends Record<string, unknown>>(data: T[]): XLSX.WorkSheet {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("Os dados precisam ser um array não vazio.")
  }

  return XLSX.utils.json_to_sheet(data)
}

export function createWorkbook(worksheet: XLSX.WorkSheet, sheetName = "Dados"): XLSX.WorkBook {
  const workbook = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)

  return workbook
}

export function downloadWorkbook(workbook: XLSX.WorkBook, fileName: string, format: "xlsx" | "csv" = "xlsx"): void {
  XLSX.writeFile(workbook, `${fileName}.${format}`, {
    bookType: format,
  })
}
