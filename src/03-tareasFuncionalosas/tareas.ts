/* eslint-disable no-console */
import { isEmpty } from 'lodash'

class Timer {
  *wait(millisecs: number) {
    const now = new Date().getTime()  
    while (new Date().getTime() < now + millisecs) { yield }
  }

}

const timer = new Timer()
/* Espera asincrónica */

/* Espera sincrónica */
function sleep(milisegundos: number) {
  const now = new Date().getTime()
  while (new Date().getTime() < now + milisegundos) { /* do nothing */ }
}
/* Espera sincrónica */

function* estudiarPromises(): Generator<void> {
  console.log('  [estudiarPromises] voy a estudiar promises')
  console.log('  [estudiarPromises] sí que lo voy a hacer')
  yield
  console.log('  [estudiarPromises] leo iteradores')
  console.log('  [estudiarPromises] hago un ejercicio de un iterador')
  yield
  console.log('  [estudiarPromises] repaso iterador')
  console.log('  [estudiarPromises] leo generadores')
  console.log('  [estudiarPromises] hago un ejercicio de un generador')
  console.log('  [estudiarPromises] repaso generador')
}

function* subirFoto(): Generator<void> {
  console.info('     [subirFoto] cargar foto')
  // sincrónica
  // sleep(10000)
  // asincrónica
  yield* timer.wait(10000)
  console.info('     [subirFoto] foto cargada')
  yield
}

function* leerTwitter(): Generator<void> {
  console.log('  [leerTwitter] cargamos foto en la página de Twitter')
  yield* subirFoto()
  console.log('  [leerTwitter] posteamos un fotoshop gracioso')
  yield
  console.log('  [leerTwitter] leemos nuestra página de Twitter')
  yield
  console.log('  [leerTwitter] leemos trending topics')
  console.log('  [leerTwitter] posteamos indignación total!!')
  yield
  console.log('  [leerTwitter] mensaje privado a un amigue')
  yield
}

function ejecutar(tareas: Generator<void>[]) {
  let i = 0
  while (!isEmpty(tareas)) {
    const tareaActual = tareas[i]
    const { done } = tareaActual.next()
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

ejecutar([estudiarPromises(), leerTwitter()])

/*
 * =================================================================
 * se prueba con
 * =================================================================

npx ts-node tareas.ts

*/