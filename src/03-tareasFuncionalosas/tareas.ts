/* eslint-disable no-console */
import { isEmpty } from 'lodash'

function sleep(milisegundos: number) {
  const now = new Date().getTime()
  while (new Date().getTime() < now + milisegundos) { /* do nothing */ }
}

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
  for (const i of [1, 2, 3, 4, 5]) {
    console.log('  [subirFoto] subiendo parte ', i)
    sleep(2000)
    yield
  }
}

function* leerTwitter(): Generator<void> {
  console.log('  [leerTwitter] leemos nuestra página de Twitter]')
  yield
  console.log('  [leerTwitter] leemos trending topics')
  console.log('  [leerTwitter] posteamos indignación total!!')
  yield
  console.log('  [leerTwitter] mensaje privado a un amigue')
  yield
  console.log('  [leerTwitter] cargamos foto en la página de Twitter')
  console.log('  [leerTwitter] posteamos un fotoshop gracioso')
}

function ejecutar(tareas: Generator<void>[]) {
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

ejecutar([estudiarPromises(), leerTwitter(), subirFoto()])

/*
 * =================================================================
 * se prueba con
 * =================================================================

npx ts-node tareas.ts

*/