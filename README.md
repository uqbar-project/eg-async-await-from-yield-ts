
## Agradecimientos

La idea de esta clase está basada en una charla que dio Juan Pedro Fisanotti (Fisa) en PyCon 2018/2019, basada en el lenguaje Python. Pueden ver la explicación en [youtube](https://www.youtube.com/watch?v=BenwwgMx3Hg).

En el presente ejemplo vamos a desarrollar técnicas asincrónicas para comprender cómo se realizan tareas concurrentes en una Virtual Machine basada en Javascript.

## Iteradores

En otras materias hemos conocido el patrón [Iterator](https://en.wikipedia.org/wiki/Iterator_pattern), cuyo fin es desacoplar la forma en la que se almacenan elementos vs. el mecanismo por el cual los recorremos. Podemos así diferenciar las pilas, colas, listas simplemente/doblemente enlazadas, arrays estáticos por un lado, y recorrido secuencial, por un orden alfabético, filtrando ciertos elementos por el otro.

Javascript permite definir iteradores, por ejemplo para definir el movimiento de jugadores de ajedrez:

```js
const crearPartida = () => {
  let blancas = true
  
  return {
    next: () => {
      const result = {
        value: (blancas ? "blancas" : "negras"),
        done: false
      }
      blancas = !blancas
      return result
    }
  }
}
```

La interfaz del iterador de Javascript requiere una función `next()` que devuelve un JSON con dos valores:

- **value**: el valor correspondiente a esta iteración
- **done**: indica si se terminó la iteración

```js
partida = crearPartida()
{next: ƒ}
partida.next()
{value: "blancas", done: false}
partida.next()
{value: "negras", done: false}
partida.next()
{value: "blancas", done: false}
partida.next()
{value: "negras", done: false}
```

Esto puede resultar un poco diferente a la iteración en Java, donde si intentamos pedir `next()` a un iterador que no tiene elementos, deberíamos esperar un error. Por eso tenemos otro método `hasNext()` que nos indica si hay más elementos:

Te dejamos para que investigues el [ejemplo que genera un rango finito de números](./01-generador/rango.ts) con sus [correspondientes tests](./01-iterador/rango.spec.ts).

## Generadores

Las funciones [generadoras](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Iterators_and_Generators) simplifican la creación de estructuras iterables, sin necesidad de mantener un estado interno como los iteradores. Veamos un ejemplo:

```js
function* frutas() {
  yield 'pera'
  yield 'banana'
  console.log('ya vengo pipon')
  yield 'manzana'
  yield 'damasco'
}
```
- La sintaxis para crear una función generadora es `function*`.
- Cuando invocamos a la función `frutas()` desde la consola, lo que retorna es un _iterable_, un elemento **que se puede recorrer** como hemos visto antes, mediante sucesivas llamadas a `next()`.
- Para entender lo que hace el comando `yield`, veamos cómo se utiliza frutas en la consola

![ejemplo generador de frutas](./images/frutas-generador.png)

Este código que puede ejecutar en tu navegador, primero llama a frutas y lo asocia a un iterable. Luego vamos llamando a `next()` sucesivamente: la función frutas encuentra `yield 'pera'`, entonces devuelve el JSON

```json
{ value: "pera", done: false }
```

y la función `frutas()` **se pausa**. Esto implica que sabemos cuál fue la última línea que se ejecutó, pero el control vuelve a estar del lado de la consola. Con el segundo llamado a `next()`, se produce el segundo yield: `yield "banana"`. Eso devuelve el JSON:

```json
{ value: "banana", done: false }
```

y nuevamente se pausa la función frutas. Nuevamente enviamos el mensaje `next()` y lo interesante aquí es que se van a ejecutar dos líneas: el console.log y por último el yield. Porque no es necesario que cada línea de un generador haga siempre `yield`, podemos realizar varias cosas antes de devolver el control a quien nos llamó.

![generadores](./images/generators.png)

### Otro tipo de generadores

Existe una variante de `yield` con asterisco, que nos permite devolver una lista de valores, si es que no necesitamos hacer nada entre cada pausa:

```js
function* frutasComoLista() {
  yield* ["pera", "banana", "manzana", "damasco"]
}
```

Y en la consola podemos evaluar:

```js
const listaFrutas = frutasComoLista()
frutasComoLista {<suspended>}

listaFrutas.next()
{value: "pera", done: false}

listaFrutas.next()
{value: "banana", done: false}

/* etc. */
```

Te dejamos [una segunda variante del Rango definido con un método generador en un objeto](./02-generador/rango.ts), con [sus correspondientes tests](./02-generador/rango.spec.ts).

## Concurrencia vs. paralelismo

Antes de continuar, es importante distinguir la diferencia entre **concurrencia** y **paralelismo**.

- cocinar y pasar el trapo, leer los mails y jugar una carrera con el Super Mario Bros, cantar una canción y contar un chiste, son actividades que pueden darse en forma concurrente: en el lapso de una hora la cocina quedó limpia y tenemos un locro preparado. No obstante, si en distintos instantes observamos qué estamos haciendo, será una cosa u otra, pero _no las dos al mismo tiempo_. Aquí hablamos de **concurrencia**: estamos haciendo varias tareas a la vez aunque vamos alternando entre cada una de ellas.

![concurrencia](./images/Concurrency.png)

- por el contrario, podemos estar cruzando la calle, mirando el celular (en forma descuidada) y transpirando, esas tres acciones ocurren al mismo tiempo. Aquí tenemos **paralelismo**.

![paralelismo](./images/Parallellism.png)

Para más información recomendamos leer [este artículo](https://blog.usejournal.com/lets-understand-the-difference-between-concurrency-and-parallelism-80be6c61ad24).

_

EJEMPLO DEL SUPERMERCADO

- Tenemos dos funciones, o dos métodos
- Asincronismo: una forma de hacer concurrencia colaborativa.
  - El S.O. ejecuta función 1 y 2
  - Si tengo hilos: en cada hilo puedo ejecutar funciones 1 ó 2. El problema es cómo compartís información de los hilos: leí el saldo 100, me pausaron, alguien deposita 500 en otro hilo, cuando quiero sacar 20 en el hilo original, tengo 100 - 20 = 80 y estoy pisando la información del saldo.
  - O bien... lo manejamos con asincronismo

```py
def loop(tareas):
    while tareas:
         actual = tareas.pop(0)
         try:
            print('-')
            next(actual)
            tarea.append(actual)
         except StopIteration:
            pass
          
def estudiar():
    print('leyendo')
    yield
    print('armar un resumen')
    yield
    print('memorizar')

def facebook():
    print('mirar fotos')
    print('mirar posts de vacaciones')
    print('criticar fotos de vacaciones')
    yield
    print('postear "ufff como estoy estudiando"')
    yield
    while True:
       print('chatear')
       yield

loop([estudiar(), facebook()]
```

estudiar y facebook se llaman corrutinas








