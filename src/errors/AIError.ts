export class AIError extends Error {
  constructor () {
    super(
      'Ocurrió un error con la IA, la razón puede ser que la IA no pueda entender el contexto o que se halla pasado el limite de tokens por minuto, prueba de nuevo en un rato...'
    )
    this.name = 'AIError'
  }
}
