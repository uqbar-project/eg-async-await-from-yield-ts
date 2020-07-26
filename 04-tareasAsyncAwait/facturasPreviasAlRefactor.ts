import { isEmpty, sumBy } from 'lodash'

/*
 * =================================================================
 *  Obtener las ventas
 * =================================================================
 */
interface Factura {
  numero: string,
  total: number,
  fecha: Date,
  saldo: number,
}

/** Podría ser una respuesta del backend, y tardar bastante en responder */
function* facturasDelCliente(): Generator<Factura> {
  console.log('resolvemos facturas del cliente')
  return [
    { numero: '0001-00004578', total: 15600, fecha: new Date(), saldo: 0, },
    { numero: '0001-00009126', total: 2200, fecha: new Date(), saldo: 700, },
    { numero: '0001-00009533', total: 18300, fecha: new Date(), saldo: 18300, },
  ]
}

function* saldoDelCliente() {
  console.log('resolvemos el saldo del cliente')
  const facturas = yield* facturasDelCliente()
  const saldo = sumBy(facturas, 'saldo')
  console.log('saldo', saldo)
  yield saldo
}

function ejecutar(tareas: Generator[]) {
  let i = 0
  while (!isEmpty(tareas)) {
    const actual = tareas[i]
    const { done } = actual.next()
    console.log('------------------------------------------')
    if (done) {
      // eliminamos la tarea
      tareas.splice(i, 1)
    }
    i++
    if (i >= tareas.length) {
      i = 0
    }
  }
}

ejecutar([saldoDelCliente()])

