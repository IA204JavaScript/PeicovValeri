import { transactions } from "./transactions.js";

// #1

/**
 * Функция возвращает массив уникальных типов транзакций 
 * @param {Array} transactions Массив с транзакциями 
 * @returns {Array} Список уникальных транзакций
 */
function getUniqueTransactionTypes(transactions){
    const uniqueTypes = new Set();
    transactions.flat().forEach(transaction => {
        uniqueTypes.add(transaction.transaction_type);
    });
    return [...uniqueTypes];
}

//#2

/**
 * Функция вычисляет сумму всех транзакций
 * @param {Array} transactions Массив с транзакциями 
 * @returns {number} Сумма всех транзакций
 */
function calculateTotalAmount(transactions){
    let sum = 0;
    transactions.flat().forEach(transaction => {
        sum += transaction.transaction_amount;
    });
    return sum;
}

//#3

/**
 * Функция вычисляет общую сумму транзакций за указанный год, месяц и день.
 * @param {Array} transactions Массив с транзакциями 
 * @param {number} year Год
 * @param {number} month Месяц
 * @param {number} day День
 * @returns {number} Общая сумма транзакций за указанную дату
 */
function calculateTotalAmountByDate(transactions, year, month, day) {
    return transactions.flat().reduce((total, transaction) => {
        const date = new Date(transaction.transaction_date);
    
        if ((year === undefined || date.getFullYear() === year) && (month === undefined || date.getMonth() + 1 === month) && (day === undefined || date.getDate() === day)) {
            total += transaction.transaction_amount;
        }
        return total;
    }, 0);
}

//#4

/**
 * Функция возвращает транзакции указанного типа (debit или credit).
 * @param {Array} transactions Массив с транзакциями 
 * @param {string} type Тип транзакции debit или credit
 * @returns {Array} Возвращает транзакции указанного типа
 */
function getTransactionsByType(transactions, type) {
    return transactions.flat().filter(transaction => transaction.transaction_type === type);
}

//#5

/**
 * Возвращает массив транзакций, проведенных в указанном диапазоне дат от startDate до endDate
 * @param {Array} transactions Массив с транзакциями 
 * @param {date} startDate Начало диапазона
 * @param {date} endDate Конец диапазона
 * @returns {Array} Возвращает массив транзакций, проведенных в указанном диапазоне дат
 */
function getTransactionsInDateRange(transactions, startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return transactions.flat().filter(transaction => {
        const transactionDate = new Date(transaction.transaction_date);
        return transactionDate >= start && transactionDate <= end;
    });
}

//#6

/**
 * Возвращает массив транзакций, совершенных с указанным merchantName
 * @param {Array} transactions  Массив с транзакциями
 * @param {String} merchantName указанное имя мерчанта
 * @returns {Array} Возвращает массив транзакций, совершенных с указанным merchantName
 */
function getTransactionsByMerchant(transactions, merchantName) {
    return transactions.flat().filter(transaction => transaction.merchant_name === merchantName);
}

//#7
/**
 * Возвращает среднюю сумму транзакции
 * @param {Array} transactions Массив с транзакциями
 * @returns {number} Средняя сумма транзакции
 */
function calculateAverageTransactionAmount(transactions) {
    const totalAmount = calculateTotalAmount(transactions);
    return totalAmount / transactions.flat().length;
}

//#8

/**
 * Возвращает массив транзакций, сумма которых находится в указанном диапазоне
 * @param {Array} transactions Массив с транзакциями
 * @param {number} minAmount Минимальная сумма транзакции
 * @param {number} maxAmount Максимальная сумма транзакции
 * @returns {Array} Возвращает массив транзакций, сумма которых находится в указанном диапазоне
 */
function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
    return transactions.flat().filter(transaction => transaction.transaction_amount >= minAmount && transaction.transaction_amount <= maxAmount);
}

//#9

/**
 * Функция вычисляет общую сумму дебетовых транзакций
 * @param {Array} transactions Массив с транзакциями
 * @returns {number} Общая сумма дебетовых транзакций
 */
function calculateTotalDebitAmount(transactions) {
    return transactions.flat().reduce((total, transaction) => {
        if (transaction.transaction_type === 'debit') {
            total += transaction.transaction_amount;
        }
        return total;
    }, 0);
}

//#10
/**
* Функция определяет месяц, в котором было совершено наибольшее количество транзакций
* @param {Array} transactions Массив с транзакциями
* @returns {number} Месяц (от 1 до 12), в котором было совершено наибольшее количество транзакций
*/
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

// #11
/**
* Функция определяет месяц, в котором было совершено наибольшее количество дебетовых транзакций
* @param {Array} transactions Массив с транзакциями
* @returns {number} Месяц (от 1 до 12), в котором было совершено наибольшее количество дебетовых транзакций
*/
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

// #12
/**
 * Функция определяет тип транзакции, который встречается чаще всего (debit или credit).
 * @param {Array} transactions Массив с транзакциями
 * @returns {string} Тип транзакции, который встречается чаще всего (debit, credit или equal)
 */
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

// #13
/**
 * Возвращает массив транзакций, проведенных до указанной даты
 * @param {Array} transactions Массив с транзакциями
 * @param {date} date Указанная дата
 * @returns {Array} Возвращает массив транзакций, проведенных до указанной даты
 */
function getTransactionsBeforeDate(transactions, date) {
    const targetDate = new Date(date);

    return transactions.flat().filter(transaction => {
        return new Date(transaction.transaction_date) < targetDate;
    });
}

// #14
/**
 * Возвращает транзакцию по ее уникальному идентификатору (id)
 * @param {Array} transactions Массив с транзакциями
 * @param {string} id Уникальный идентификатор транзакции
 * @returns {object} Возвращает транзакцию по ее id или null, если транзакция не найдена
 */
function findTransactionById(transactions, id) {
    return transactions.flat().find(transaction => transaction.transaction_id === id);
}

// #15
/**
 * Возвращает новый массив, содержащий только описания транзакций
 * @param {Array} transactions Массив с транзакциями
 * @returns {Array} Новый массив, содержащий только описания транзакций
 */
function mapTransactionDescriptions(transactions) {
    return transactions.flat().map(transaction => transaction.transaction_description);
}


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