/* eslint-disable no-console */
import { sumBy } from 'lodash'

/*
 * =================================================================
 *  Obtener las ventas
 * =================================================================
 */
interface IFactura {
  numero: string,
  total: number,
  fecha: Date,
  saldo: number,
}

/** Podría ser una respuesta del backend, y tardar bastante en responder */
async function facturasDelCliente() {
  console.log('resolvemos facturas del cliente')
  return [
    { numero: '0001-00004578', total: 15600, fecha: new Date(), saldo: 0 },
    { numero: '0001-00009126', total: 2200, fecha: new Date(), saldo: 700 },
    { numero: '0001-00009533', total: 18300, fecha: new Date(), saldo: 18300 },
  ]
}

async function saldoDelCliente() {
  console.log('resolvemos el saldo del cliente')
  // Para poder sumar el saldo de las facturas, esperamos a las facturas
  // lo que devuelve la función asincrónica lo recibe facturas
  const facturas = await facturasDelCliente()
  const saldo = sumBy(facturas, 'saldo')
  console.log('saldo', saldo)
  return saldo
}

function ejecutar(tareas: Promise<number>[]) {
  Promise.all(tareas)
}

ejecutar([saldoDelCliente()])