# Анализ транзакций на JavaScript

## Структура проекта

- `main.js` — содержит основные функции для анализа массива транзакций.
- `transactions.js` — файл с массивом объектов транзакций.

## Описание функций с кодом

### 1. `getUniqueTransactionTypes(transactions)`

Возвращает массив уникальных типов транзакций.

```js
function getUniqueTransactionTypes(transactions){
    const uniqueTypes = new Set();
    transactions.flat().forEach(transaction => {
        uniqueTypes.add(transaction.transaction_type);
    });
    return [...uniqueTypes];
}
```

### 2. `calculateTotalAmount(transactions)`

Вычисляет сумму всех транзакций.

```js
function calculateTotalAmount(transactions){
    let sum = 0;
    transactions.flat().forEach(transaction => {
        sum += transaction.transaction_amount;
    });
    return sum;
}
```

### 3. `calculateTotalAmountByDate(transactions, year, month, day)`

Вычисляет общую сумму транзакций за указанный год, месяц и день.

```js
function calculateTotalAmountByDate(transactions, year, month, day) {
    return transactions.flat().reduce((total, transaction) => {
        const date = new Date(transaction.transaction_date);
    
        if ((year === undefined || date.getFullYear() === year) && (month === undefined || date.getMonth() + 1 === month) && (day === undefined || date.getDate() === day)) {
            total += transaction.transaction_amount;
        }
        return total;
    }, 0);
}
```

### 4. `getTransactionsByType(transactions, type)`

Возвращает транзакции указанного типа (debit или credit).

```js
function getTransactionsByType(transactions, type) {
    return transactions.flat().filter(transaction => transaction.transaction_type === type);
}
```

### 5. `getTransactionsInDateRange(transactions, startDate, endDate)`

Возвращает массив транзакций в указанном диапазоне дат.

```js
function getTransactionsInDateRange(transactions, startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return transactions.flat().filter(transaction => {
        const transactionDate = new Date(transaction.transaction_date);
        return transactionDate >= start && transactionDate <= end;
    });
}
```

### 6. `getTransactionsByMerchant(transactions, merchantName)`

Возвращает массив транзакций с указанным мерчантом.

```js
function getTransactionsByMerchant(transactions, merchantName) {
    return transactions.flat().filter(transaction => transaction.merchant_name === merchantName);
}
```

### 7. `calculateAverageTransactionAmount(transactions)`

Возвращает среднюю сумму транзакции.

```js
function calculateAverageTransactionAmount(transactions) {
    const totalAmount = calculateTotalAmount(transactions);
    return totalAmount / transactions.flat().length;
}
```

### 8. `getTransactionsByAmountRange(transactions, minAmount, maxAmount)`

Возвращает массив транзакций с суммой в указанном диапазоне.

```js
function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
    return transactions.flat().filter(transaction => transaction.transaction_amount >= minAmount && transaction.transaction_amount <= maxAmount);
}
```

### 9. `calculateTotalDebitAmount(transactions)`

Вычисляет общую сумму дебетовых транзакций.

```js
function calculateTotalDebitAmount(transactions) {
    return transactions.flat().reduce((total, transaction) => {
        if (transaction.transaction_type === 'debit') {
            total += transaction.transaction_amount;
        }
        return total;
    }, 0);
}
```

### 10. `findMostTransactionsMonth(transactions)`

Определяет месяц с наибольшим количеством транзакций.

```js
function findMostTransactionsMonth(transactions) {
    const monthCounts = new Array(12).fill(0);

    transactions.flat().forEach(transaction => {
        const month = new Date(transaction.transaction_date).getMonth(); 
        monthCounts[month]++;
    });

    let mostTransactionsMonth = 0;
    for (let i = 1; i < monthCounts.length; i++) {
        if (monthCounts[i] > monthCounts[mostTransactionsMonth]) {
            mostTransactionsMonth = i;
        }
    }

    return mostTransactionsMonth + 1; 
}
```

### 11. `findMostDebitTransactionMonth(transactions)`

Определяет месяц с наибольшим количеством дебетовых транзакций.

```js
function findMostDebitTransactionMonth(transactions) { 
    const monthCounts = new Array(12).fill(0);

    transactions.flat().forEach(transaction => {
        if (transaction.transaction_type === 'debit') {
            const month = new Date(transaction.transaction_date).getMonth(); 
            monthCounts[month]++;
        }
    });

    let mostDebitTransactionsMonth = 0;
    for (let i = 1; i < monthCounts.length; i++) {
        if (monthCounts[i] > monthCounts[mostDebitTransactionsMonth]) {
            mostDebitTransactionsMonth = i;
        }
    }

    return mostDebitTransactionsMonth + 1;
}
```

### 12. `mostTransactionTypes(transactions)`

Возвращает тип транзакций, которых больше.

```js
function mostTransactionTypes(transactions) {
    const counts = transactions.flat().reduce((acc, transaction) => {
        acc[transaction.transaction_type] = (acc[transaction.transaction_type] || 0) + 1;
        return acc;
    }, {});

    if (counts.debit > counts.credit) {
        return 'debit';
    } else if (counts.credit > counts.debit) {
        return 'credit';
    } else {
        return 'equal';
    }
}
```

### 13. `getTransactionsBeforeDate(transactions, date)`

Возвращает транзакции, совершённые до указанной даты.

```js
function getTransactionsBeforeDate(transactions, date) {
    const targetDate = new Date(date);

    return transactions.flat().filter(transaction => {
        return new Date(transaction.transaction_date) < targetDate;
    });
}
```

### 14. `findTransactionById(transactions, id)`

Возвращает транзакцию по её `id`.

```js
function findTransactionById(transactions, id) {
    return transactions.flat().find(transaction => transaction.transaction_id === id);
}
```

### 15. `mapTransactionDescriptions(transactions)`

Возвращает массив с описаниями транзакций.

```js
function mapTransactionDescriptions(transactions) {
    return transactions.flat().map(transaction => transaction.transaction_description);
}
```

---

## Тестирование функций

```js
console.log("Уникальные типы транзакций:", getUniqueTransactionTypes(transactions));
console.log("Общая сумма:", calculateTotalAmount(transactions));
console.log("Общая сумма на 2023-05-15:", calculateTotalAmountByDate(transactions, 2023, 5, 15));
console.log("Дебетовые транзакции:", getTransactionsByType(transactions, 'debit'));
console.log("Транзакции в 2023 году:", getTransactionsInDateRange(transactions, '2023-01-01', '2023-12-31'));
console.log("Транзакции по мерчанту (Amazon):", getTransactionsByMerchant(transactions, 'Amazon'));
console.log("Средняя сумма транзакции:", calculateAverageTransactionAmount(transactions));
console.log("Транзакции в диапазоне сумм (100-500):", getTransactionsByAmountRange(transactions, 100, 500));
console.log("Общая сумма дебетовых транзакций:", calculateTotalDebitAmount(transactions));
console.log("Наиболее распространенный тип транзакции:", mostTransactionTypes(transactions));
console.log("Транзакции до 2023-06-01:", getTransactionsBeforeDate(transactions, '2023-06-01'));
console.log("Транзакция по ID (12):", findTransactionById(transactions, '12'));
console.log("Описания транзакций:", mapTransactionDescriptions(transactions));
```

---

## Контрольные вопросы

1. **Какие методы массивов можно использовать для обработки объектов в JavaScript?**

   - `map()`, `filter()`, `reduce()`, `forEach()`, `find()`, `some()`, `every()`, `sort()` и др.

2. **Как сравнивать даты в строковом формате в JavaScript?**

   - Преобразовать строки в объекты `Date` и использовать операторы сравнения (`<`, `>`, `===`).

3. **В чём разница между **************************`**, **`************************** и **************************\`\`**************************?**

   - `map()` — создаёт новый массив, преобразуя каждый элемент.
   - `filter()` — создаёт массив, отфильтровывая элементы по условию.
   - `reduce()` — сводит массив к одному значению, выполняя аккумуляцию значений.

---

