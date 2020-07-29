/* eslint-disable no-console */
async function inicioEstudio(): Promise<void> {
  console.log('voy a estudiar promises')
  console.log('sí que lo voy a hacer')
}

async function estudiarIteradores(): Promise<void> {
  console.log('leo iteradores')
  console.log('hago un ejercicio de un iterador')
}

async function estudiarPromises(): Promise<void> {
  await inicioEstudio()
  await estudiarIteradores()
  console.log('repaso iterador')
  console.log('leo generadores')
  console.log('hago un ejercicio de un generador')
  console.log('repaso generador')
}

function sleep(milliseconds: number) {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

async function subirFoto(): Promise<void> {
  for (const i of [1, 2, 3, 4, 5]) {
    console.log('subiendo parte ', i)
    await sleep(2000)
  }
}

async function leerPaginaTwitter(): Promise<void> {
  console.log('leemos nuestra página de Twitter')
}

async function postPhotoshopGracioso(): Promise<void> {
  console.log('posteamos un fotoshop gracioso')
}

async function mensajeAmigue() {
  console.log('mensaje privado a un amigue')
}

async function leerTwitter(): Promise<void> {
  await leerPaginaTwitter()
  await subirFoto()
  await postPhotoshopGracioso()
  await mensajeAmigue()
  console.log('leemos trending topics')
  console.log('posteamos indignación total!!')
}

async function ejecutar(tareas: Promise<void>[]) {
  await Promise.all(tareas)
}

ejecutar([estudiarPromises(), leerTwitter()])

/*
 * =================================================================
 * se prueba con
 * =================================================================

npx ts-node tareas.ts

*/