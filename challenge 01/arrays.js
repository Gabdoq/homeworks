/**
 * TAREA: Funciones de Arrays en JavaScript
 * Investigación y uso de todas las funciones de arrays
 */

// ==========================================
// CREACIÓN DE ARRAYS
// ==========================================

// Formas de crear arrays
const array1 = [1, 2, 3, 4, 5];
const array2 = new Array(5); // Array vacío con 5 espacios
const array3 = Array.of(1, 2, 3); // Crea array con los elementos dados
const array4 = Array.from("hola"); // Crea array desde un iterable

console.log("=== CREACIÓN DE ARRAYS ===");
console.log("Array literal:", array1);
console.log("Array.of():", array3);
console.log("Array.from():", array4);

// ==========================================
// MÉTODOS DE MODIFICACIÓN (Mutables)
// ==========================================

console.log("\n=== MÉTODOS DE MODIFICACIÓN ===");

// push() - Agrega elementos al final
const frutas = ["manzana", "banana"];
frutas.push("naranja");
console.log("push():", frutas); // ['manzana', 'banana', 'naranja']

// pop() - Elimina el último elemento
const ultimaFruta = frutas.pop();
console.log("pop():", ultimaFruta, "| Array:", frutas);

// unshift() - Agrega elementos al inicio
frutas.unshift("uva");
console.log("unshift():", frutas); // ['uva', 'manzana', 'banana']

// shift() - Elimina el primer elemento
const primeraFruta = frutas.shift();
console.log("shift():", primeraFruta, "| Array:", frutas);

// splice() - Agrega/elimina elementos en cualquier posición
const numeros = [1, 2, 3, 4, 5];
numeros.splice(2, 1, 10, 11); // En índice 2, elimina 1 elemento, agrega 10 y 11
console.log("splice():", numeros); // [1, 2, 10, 11, 4, 5]

// fill() - Rellena el array con un valor
const arrayFill = [1, 2, 3, 4, 5];
arrayFill.fill(0, 1, 4); // Rellena con 0 desde índice 1 hasta 4
console.log("fill():", arrayFill); // [1, 0, 0, 0, 5]

// copyWithin() - Copia elementos dentro del mismo array
const arrayCopy = [1, 2, 3, 4, 5];
arrayCopy.copyWithin(0, 3); // Copia desde índice 3 a la posición 0
console.log("copyWithin():", arrayCopy); // [4, 5, 3, 4, 5]

// reverse() - Invierte el orden del array
const arrayReverse = [1, 2, 3];
arrayReverse.reverse();
console.log("reverse():", arrayReverse); // [3, 2, 1]

// sort() - Ordena el array
const arraySort = [3, 1, 4, 1, 5, 9, 2, 6];
arraySort.sort((a, b) => a - b); // Orden numérico ascendente
console.log("sort():", arraySort); // [1, 1, 2, 3, 4, 5, 6, 9]

// ==========================================
// MÉTODOS DE ACCESO (No modifican el array original)
// ==========================================

console.log("\n=== MÉTODOS DE ACCESO ===");

const letras = ["a", "b", "c", "d", "e"];

// concat() - Une dos o más arrays
const masLetras = letras.concat(["f", "g"]);
console.log("concat():", masLetras);

// slice() - Extrae una porción del array
const porcion = letras.slice(1, 4);
console.log("slice():", porcion); // ['b', 'c', 'd']

// indexOf() - Encuentra el índice de un elemento
console.log("indexOf('c'):", letras.indexOf("c")); // 2

// lastIndexOf() - Encuentra el último índice de un elemento
const repetidos = [1, 2, 3, 2, 1];
console.log("lastIndexOf(2):", repetidos.lastIndexOf(2)); // 3

// includes() - Verifica si un elemento existe
console.log("includes('c'):", letras.includes("c")); // true

// join() - Une los elementos en un string
console.log("join('-'):", letras.join("-")); // 'a-b-c-d-e'

// toString() - Convierte el array a string
console.log("toString():", letras.toString()); // 'a,b,c,d,e'

// at() - Accede a elementos por índice (soporta negativos)
console.log("at(-1):", letras.at(-1)); // 'e' (último elemento)

// flat() - Aplana arrays anidados
const anidado = [1, [2, 3], [4, [5, 6]]];
console.log("flat():", anidado.flat()); // [1, 2, 3, 4, [5, 6]]
console.log("flat(2):", anidado.flat(2)); // [1, 2, 3, 4, 5, 6]

// flatMap() - Mapea y aplana en un solo paso
const palabras = ["Hola Mundo", "Adiós Mundo"];
console.log("flatMap():", palabras.flatMap(p => p.split(" ")));

// ==========================================
// MÉTODOS DE ITERACIÓN
// ==========================================

console.log("\n=== MÉTODOS DE ITERACIÓN ===");

const numerosIter = [1, 2, 3, 4, 5];

// forEach() - Ejecuta una función para cada elemento
console.log("forEach():");
numerosIter.forEach((num, index) => {
    console.log(`  Índice ${index}: ${num}`);
});

// map() - Crea un nuevo array transformando cada elemento
const dobles = numerosIter.map(num => num * 2);
console.log("map():", dobles); // [2, 4, 6, 8, 10]

// filter() - Filtra elementos según una condición
const pares = numerosIter.filter(num => num % 2 === 0);
console.log("filter():", pares); // [2, 4]

// reduce() - Reduce el array a un solo valor
const suma = numerosIter.reduce((acum, num) => acum + num, 0);
console.log("reduce():", suma); // 15

// reduceRight() - Reduce de derecha a izquierda
const concatenado = ["a", "b", "c"].reduceRight((acum, letra) => acum + letra, "");
console.log("reduceRight():", concatenado); // 'cba'

// find() - Encuentra el primer elemento que cumple una condición
const encontrado = numerosIter.find(num => num > 3);
console.log("find():", encontrado); // 4

// findIndex() - Encuentra el índice del primer elemento que cumple una condición
const indiceEncontrado = numerosIter.findIndex(num => num > 3);
console.log("findIndex():", indiceEncontrado); // 3

// findLast() - Encuentra el último elemento que cumple una condición
const ultimoEncontrado = numerosIter.findLast(num => num < 4);
console.log("findLast():", ultimoEncontrado); // 3

// findLastIndex() - Encuentra el índice del último elemento que cumple una condición
const ultimoIndice = numerosIter.findLastIndex(num => num < 4);
console.log("findLastIndex():", ultimoIndice); // 2

// every() - Verifica si TODOS los elementos cumplen una condición
const todosMayoresACero = numerosIter.every(num => num > 0);
console.log("every():", todosMayoresACero); // true

// some() - Verifica si AL MENOS UN elemento cumple una condición
const algunoMayorA4 = numerosIter.some(num => num > 4);
console.log("some():", algunoMayorA4); // true

// ==========================================
// MÉTODOS DE ITERADORES
// ==========================================

console.log("\n=== MÉTODOS DE ITERADORES ===");

const colores = ["rojo", "verde", "azul"];

// keys() - Retorna un iterador con los índices
console.log("keys():", [...colores.keys()]); // [0, 1, 2]

// values() - Retorna un iterador con los valores
console.log("values():", [...colores.values()]); // ['rojo', 'verde', 'azul']

// entries() - Retorna un iterador con pares [índice, valor]
console.log("entries():", [...colores.entries()]); // [[0, 'rojo'], [1, 'verde'], [2, 'azul']]

// ==========================================
// MÉTODOS ESTÁTICOS
// ==========================================

console.log("\n=== MÉTODOS ESTÁTICOS ===");

// Array.isArray() - Verifica si es un array
console.log("Array.isArray([1,2,3]):", Array.isArray([1, 2, 3])); // true
console.log("Array.isArray('hola'):", Array.isArray("hola")); // false

// Array.from() - Crea un array desde un iterable
console.log("Array.from('ABC'):", Array.from("ABC")); // ['A', 'B', 'C']
console.log("Array.from({length: 5}, (_, i) => i):", Array.from({length: 5}, (_, i) => i)); // [0, 1, 2, 3, 4]

// Array.of() - Crea un array con los argumentos dados
console.log("Array.of(1, 2, 3):", Array.of(1, 2, 3)); // [1, 2, 3]

// ==========================================
// MÉTODOS INMUTABLES (Nuevos en ES2023)
// ==========================================

console.log("\n=== MÉTODOS INMUTABLES (ES2023) ===");

const original = [3, 1, 4, 1, 5];

// toSorted() - Versión inmutable de sort()
const ordenado = original.toSorted((a, b) => a - b);
console.log("toSorted():", ordenado);
console.log("Original sin modificar:", original);

// toReversed() - Versión inmutable de reverse()
const invertido = original.toReversed();
console.log("toReversed():", invertido);

// toSpliced() - Versión inmutable de splice()
const spliceado = original.toSpliced(2, 1, 10);
console.log("toSpliced():", spliceado);

// with() - Reemplaza un elemento sin mutar
const reemplazado = original.with(0, 100);
console.log("with():", reemplazado);

// ==========================================
// PROPIEDAD LENGTH
// ==========================================

console.log("\n=== PROPIEDAD LENGTH ===");
const arrayLength = [1, 2, 3, 4, 5];
console.log("length:", arrayLength.length); // 5

// Truncar array modificando length
arrayLength.length = 3;
console.log("Después de length = 3:", arrayLength); // [1, 2, 3]

console.log("\n✅ ¡Todas las funciones de arrays han sido demostradas!");
