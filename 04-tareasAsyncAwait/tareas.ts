import { isEmpty } from 'lodash'

function sleep(milisegundos: number) {
  var now = new Date().getTime()
  while (new Date().getTime() < now + milisegundos) { /* do nothing */ }
}

function* estudiarPromises(): Generator<void> {
  console.log('voy a estudiar promises')
  console.log('sí que lo voy a hacer')
  yield
  console.log('leo iteradores')
  console.log('hago un ejercicio de un iterador')
  yield
  console.log('repaso iterador')
  console.log('leo generadores')
  console.log('hago un ejercicio de un generador')
  console.log('repaso generador')
}

function* subirFoto(): Generator<void> {
  for (let i of [1, 2, 3, 4, 5]) {
    console.log('subiendo parte ', i)
    sleep(2000)
    yield
  }
}

function* leerTwitter(): Generator<void> {
  console.log('leemos nuestra página de Twitter')
  yield
  yield* subirFoto()
  console.log('posteamos un fotoshop gracioso')
  yield
  console.log('mensaje privado a un amigue')
  yield
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