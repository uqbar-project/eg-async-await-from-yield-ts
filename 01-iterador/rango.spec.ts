import { Rango } from './rango'

describe('para un rango ascendente', () => {
  let rango: Rango

  beforeEach(() => {
    rango = new Rango(3, 5)
  })

  test('iterator asc - next devuelve inicialmente el valor de la cota inferior', () => {
    expect(rango.next().value).toBe(3)
  })

  test('iterator asc -  next no llegó al límite inicialmente', () => {
    expect(rango.next().done).toBeFalsy()
  })

  test('iterator asc -  al pedir dos veces next avanzamos una posición', () => {
    rango.next()
    expect(rango.next().value).toBe(4)
  })

  test("iterator asc - si avanzamos todas las veces, llegamos al final del recorrido", () => {
    rango.next()
    rango.next()
    expect(rango.next().done).toBeTruthy()
  })

})

describe('para un rango descendente', () => {
  let rango: Rango

  beforeEach(() => {
    rango = new Rango(5, 3)
  })

  test('iterator desc - next devuelve inicialmente el valor de la cota superior', () => {
    expect(rango.next().value).toBe(5)
  })

  test('iterator desc - next no llegó al límite inicialmente', () => {
    expect(rango.next().done).toBeFalsy()
  })

  test('iterator desc - al pedir dos veces next avanzamos una posición', () => {
    rango.next()
    expect(rango.next().value).toBe(4)
  })

  test("iterator desc - si avanzamos todas las veces, llegamos al final del recorrido", () => {
    rango.next()
    rango.next()
    expect(rango.next().done).toBeTruthy()
  })

})
