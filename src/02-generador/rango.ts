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

  *iterator(): Generator<number> {
    if (this.desde === this.hasta) {
      // forzamos done: true
      return this.desde
    } else {
      for (let i = this.desde; this.condicionCorteRango(i); i = i + this.paso) {
        // yield devuelve el control y mientras estamos en el for
        // asocia done: false
        yield i
      }
    }
  }

  condicionCorteRango(i: number): boolean {
    return (this.ascendente()) ? i < this.hasta : i > this.hasta
  }

  ascendente(): boolean {
    return this.paso > 0
  }

}