export class Rango {
  valorActual: number
  paso: number

  constructor(public desde: number, public hasta: number) {
    this.paso = desde > hasta ? -1 : 1
    this.valorActual = desde
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