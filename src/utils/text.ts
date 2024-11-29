export function cleanSpanishText (input: string): string {
  const spanishPattern = /[^a-zA-ZáéíóúüÁÉÍÓÚÜñÑ¡¿.,:;()!? "']/g
  return input.replace(spanishPattern, '')
}

