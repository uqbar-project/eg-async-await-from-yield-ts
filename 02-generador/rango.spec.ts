import { Rango } from './rango'

describe('generator - para un rango ascendente', () => {
  let rango: Generator<number>

  beforeEach(() => {
    rango = new Rango(3, 5).iterator()
  })

  test('generator asc - next devuelve inicialmente el valor de la cota inferior', () => {
    expect(rango.next().value).toBe(3)
  })

  test('generator asc -  next no llegó al límite inicialmente', () => {
    expect(rango.next().done).toBeFalsy()
  })

  test('generator asc -  al pedir dos veces next avanzamos una posición', () => {
    rango.next()
    expect(rango.next().value).toBe(4)
  })

  test('generator asc - si avanzamos todas las veces, llegamos al final del recorrido', () => {
    rango.next()
    rango.next()
    expect(rango.next().done).toBeTruthy()
  })

})

describe('para un rango descendente', () => {
  let rango: Generator<number>

  beforeEach(() => {
    rango = new Rango(5, 3).iterator()
  })

  test('generator desc - next devuelve inicialmente el valor de la cota superior', () => {
    expect(rango.next().value).toBe(5)
  })

  test('generator desc - next no llegó al límite inicialmente', () => {
    expect(rango.next().done).toBeFalsy()
  })

  test('generator desc - al pedir dos veces next avanzamos una posición', () => {
    rango.next()
    expect(rango.next().value).toBe(4)
  })

  test("generator desc - si avanzamos todas las veces, llegamos al final del recorrido", () => {
    rango.next()
    rango.next()
    expect(rango.next().done).toBeTruthy()
  })

})

describe('generator - para un rango de un solo elemento', () => {
  let rango: Generator<number>

  beforeEach(() => {
    rango = new Rango(3, 3).iterator()
  })

  test('único valor - next devuelve inicialmente ese número', () => {
    expect(rango.next().value).toBe(3)
  })

  test('único valor -  next llega al límite cuando pasamos la primera vez', () => {
    expect(rango.next().done).toBeTruthy()
  })

})