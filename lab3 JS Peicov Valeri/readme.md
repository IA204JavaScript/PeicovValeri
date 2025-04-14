
# Отчет по заданию: Создание классов Item и Weapon

## Шаг 1. Создание класса Item

### Описание

Класс `Item` представляет собой предмет в инвентаре. Он имеет следующие поля:
- `name` — название предмета.
- `weight` — вес предмета.
- `rarity` — редкость предмета (например, common, uncommon, rare, legendary).

Методы:
- `getInfo()` — возвращает строку с информацией о предмете (название, вес, редкость).
- `setWeight(newWeight)` — изменяет вес предмета на заданное значение.

### Код класса Item

```js
class Item {
    constructor(name, weight, rarity) {
        this.name = name;
        this.weight = weight;
        this.rarity = rarity;
    }

    getInfo() {
        return `${this.name} (Weight: ${this.weight}, Rarity: ${this.rarity})`;
    }

    setWeight(newWeight) {
        this.weight = newWeight;
    }
}
```

### Пример использования:

```js
const potion = new Item("Health Potion", 0.5, "common");
console.log(potion.getInfo());  // Health Potion (Weight: 0.5, Rarity: common)
potion.setWeight(0.6);
console.log(`Новый вес: ${potion.weight}`);  // Новый вес: 0.6
```

## Шаг 2. Создание класса Weapon

### Описание

Класс `Weapon` расширяет класс `Item` и добавляет дополнительные поля:
- `damage` — урон оружия.
- `durability` — прочность оружия (значение от 0 до 100).

Методы:
- `use()` — уменьшает прочность оружия на 10 единиц при использовании, если прочность больше 0. Если прочность 0, оружие ломается.
- `repair()` — восстанавливает прочность оружия до 100.

### Код класса Weapon

```js
class Weapon extends Item {
    constructor(name, weight, rarity, damage, durability) {
        super(name, weight, rarity);
        this.damage = damage;
        this.durability = durability;
    }

    use() {
        if (this.durability > 0) {
            this.durability -= 10;
            return `${this.name} Использовано, теперь прочность: ${this.durability}`;
        } else {
            return `${this.name} сломан!`;
        }
    }

    repair() {
        this.durability = 100;
        console.log(`${this.name} отремонтировано до полной прочности.`);
    }

    getInfo() {
        return `${this.name} (Weight: ${this.weight}, Rarity: ${this.rarity}), Damage: ${this.damage}, Durability: ${this.durability})`;
    }
}
```

### Пример использования:

```js
const axe = new Weapon("Battle Axe", 5.0, "rare", 25, 80);
console.log(axe.getInfo());  // Battle Axe (Weight: 5, Rarity: rare), Damage: 25, Durability: 80
axe.use();  // Battle Axe Использовано, теперь прочность: 70
console.log(`Актуальная прочность: ${axe.durability}`);  // Актуальная прочность: 70
axe.repair();  // Battle Axe отремонтировано до полной прочности.
console.log(axe.getInfo());  // Battle Axe (Weight: 5, Rarity: rare), Damage: 25, Durability: 100
```

## Шаг 3. Тестирование

### Тест 1: Создание объекта Item

```js
const potion = new Item("Health Potion", 0.5, "common");
console.log(potion.getInfo());  // Health Potion (Weight: 0.5, Rarity: common)
potion.setWeight(0.6);
console.log(`Новый вес: ${potion.weight}`);  // Новый вес: 0.6
```

### Тест 2: Создание объекта Weapon и использование методов

```js
const axe = new Weapon("Battle Axe", 5.0, "rare", 25, 80);
console.log(axe.getInfo());  // Battle Axe (Weight: 5, Rarity: rare), Damage: 25, Durability: 80
axe.use();  // Battle Axe Использовано, теперь прочность: 70
console.log(`Актуальная прочность: ${axe.durability}`);  // Актуальная прочность: 70
axe.repair();  // Battle Axe отремонтировано до полной прочности.
console.log(axe.getInfo());  // Battle Axe (Weight: 5, Rarity: rare), Damage: 25, Durability: 100
```

## Контрольные вопросы

### 1. Какое значение имеет `this` в методах класса?

`this` в методах класса ссылается на текущий экземпляр объекта. Это позволяет обращаться к его свойствам и методам внутри класса. Например, в методах `getInfo()`, `use()` и `repair()` `this` используется для доступа к свойствам экземпляра, таким как `name`, `weight`, `durability`, и т. д.

### 2. Как работает модификатор доступа `#` в JavaScript?

Модификатор доступа `#` в JavaScript используется для объявления приватных полей и методов в классе. Это означает, что данные или методы, помеченные как приватные, не могут быть доступны или изменены из-за пределов класса. Пример:

```js
class MyClass {
    #privateField;  // приватное поле

    constructor() {
        this.#privateField = 42;
    }

    getPrivateField() {
        return this.#privateField;
    }
}

const obj = new MyClass();
console.log(obj.getPrivateField());  // 42
// console.log(obj.#privateField);  // Ошибка: свойство #privateField недоступно
```

### 3. В чем разница между классами и функциями-конструкторами?

Классы и функции-конструкторы в JavaScript выполняют схожую функцию — они используются для создания объектов. Однако классы обеспечивают более современный и удобный синтаксис для создания объектов с методами и свойствами. Классы также имеют наследование через `extends`, а функции-конструкторы используют прототипы для реализации наследования. Основное различие:
- Классы — это синтаксический сахар поверх функций-конструкторов, который упрощает написание и чтение кода.
- Функции-конструкторы были основным способом создания объектов до введения синтаксиса классов в ES6.

## Заключение

В результате выполнения задания был создан класс `Item` и его расширение `Weapon`, что позволило моделировать предметы и оружие в инвентаре с дополнительными методами для их использования и ремонта. Тестирование продемонстрировало правильную работу всех методов классов.
