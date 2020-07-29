/* eslint-disable require-yield */
/* eslint-disable no-console */
import { isEmpty } from 'lodash'

function sleep(milisegundos: number) {
  const now = new Date().getTime()
  while (new Date().getTime() < now + milisegundos) { /* do nothing */ }
}

function* inicioEstudio(): Generator<void> {
  console.log('voy a estudiar promises')
  console.log('sí que lo voy a hacer')
}

function* estudiarIteradores(): Generator<void> {
  console.log('leo iteradores')
  console.log('hago un ejercicio de un iterador')
}

function* estudiarPromises(): Generator<void> {
  yield* inicioEstudio()
  yield* estudiarIteradores()
  console.log('repaso iterador')
  console.log('leo generadores')
  console.log('hago un ejercicio de un generador')
  console.log('repaso generador')
}

function* subirFoto(): Generator<void> {
  for (const i of [1, 2, 3, 4, 5]) {
    console.log('subiendo parte ', i)
    sleep(2000)
    yield
  }
}

function* leerPaginaTwitter(): Generator<void> {
  console.log('leemos nuestra página de Twitter')
}

function* postPhotoshopGracioso(): Generator<void> {
  console.log('posteamos un fotoshop gracioso')
}

function* mensajeAmigue() {
  console.log('mensaje privado a un amigue')
}

function* leerTwitter(): Generator<void> {
  yield* leerPaginaTwitter()
  yield* subirFoto()
  yield* postPhotoshopGracioso()
  yield* mensajeAmigue()
  console.log('leemos trending topics')
  console.log('posteamos indignación total!!')
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

ejecutar([estudiarPromises(), leerTwitter()])

/*
 * =================================================================
 * se prueba con
 * =================================================================

npx ts-node tareas.ts

*/