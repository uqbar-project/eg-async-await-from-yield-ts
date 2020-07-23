export class Rango {
  desde: number
  hasta: number
  valorActual: number
  paso: number

  constructor(desdeOriginal: number, hastaOriginal: number) {
    this.paso = desdeOriginal > hastaOriginal ? -1 : 1
    this.desde = desdeOriginal
    this.hasta = hastaOriginal
    this.valorActual = desdeOriginal
  }

  next() {
    const result = {
      value: this.valorActual,
      done: this.done()
    }
    this.valorActual = this.valorActual + this.paso
    return result
  }

  private done() {
    return this.valorActual === this.hasta
  }
}