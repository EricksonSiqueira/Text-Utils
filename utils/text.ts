export function removeDotsAndDashes(input: string) {
  return input.replace(/[.-]/g, "")
}

export function padWithZeros(array: string[], targetLength = 11) {
  return array.map((str) => str.padStart(targetLength, "0"))
}
