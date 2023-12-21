//  Привязать контекст объекта к функции logger, чтобы при вызове this.item выводило - some value
// (Привязать через bind, call, apply)

function logger() {
  console.log(`I output only external context: ${this.item}`);
}
const obj = { item: "some value" };

logger.bind(obj)();
logger.call(obj);
logger.apply(obj);

//////////////////////////////////

// Требуется создать функцию createCache, которая возвращает объект для кэширования результатов выполнения других функций. Кэш должен хранить значения, которые были возвращены функцией при определенных входных параметрах.

// Функция createCache должна иметь два метода:

// cache(fn): принимает функцию fn и возвращает новую функцию, которая кэширует результаты выполнения fn. Если кэш уже содержит результат для данного набора входных параметров, то новая функция должна возвращать сохраненное значение, не вызывая fn.
// clear(): очищает весь кэш.

function createCache() {
  let cacheVal = new Map();
  function cache(fn) {
    return function (arg) {
      let cached = true;
      if (!cacheVal.has(arg)) {
        cacheVal.set(arg, fn(arg));
        cached = false;
      }
      return `Вывод: Выполнил: ${cacheVal.get(arg)} ${
        cached ? "(значение взято из кэша)" : ""
      }`;
    };
  }
  function clear() {
    cacheVal.clear();
    console.log("Вывод : Кэш отчищен");
  }
  return { cache, clear };
}

var myCache = createCache();

function multiplyByTwo(x) {
  return x * 2;
}

var cachedMultiplyByTwo = myCache.cache(multiplyByTwo);

console.log(cachedMultiplyByTwo(5)); // Вывод: Выполнил: 10
console.log(cachedMultiplyByTwo(5)); // Вывод: Выполнил: 10 (значение взято из кэша)

console.log(cachedMultiplyByTwo(3)); // Вывод: Выполнил: 6
console.log(cachedMultiplyByTwo(3)); // Вывод: Выполнил: 6 (значение взято из кэша)

myCache.clear(); // Вывод : Кэш отчищен

console.log(cachedMultiplyByTwo(5)); // Вывод: Выполнил: 10

//////////////////////////////////////////

// Бонус
// Реализовать полифил(собственную функцию реализующую встроенную в js) метода bind()

// Код здесь
Function.prototype.bind = function () {
  const func = this;
  const [ctx, ...bArgs] = arguments;
  return function () {
    return func.apply(ctx, [...bArgs, ...arguments]);
  };
};
//
