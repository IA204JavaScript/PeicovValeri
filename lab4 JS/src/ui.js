import { removeItemById, inventory } from './inventory.js';
import { calculateTotalItems } from './utils.js';

const tableBody = document.querySelector("#inventory-table tbody");
const totalCount = document.getElementById("total-count");
const itemInfo = document.getElementById("item-info");

/**
 * Отображает элемент в таблице.
 *
 * @param {Object} item - Объект элемента, который нужно отобразить.
 * @param {string} item.id - Уникальный идентификатор элемента.
 * @param {string} item.name - Название элемента.
 * @param {string} item.category - Категория элемента.
 * @param {string} item.rarity - Редкость элемента (например, "legendary" или "common").
 * @param {number} [item.damage] - Урон элемента (если применимо).
 * @param {Function} [item.getInfo] - Функция, возвращающая дополнительную информацию об элементе.
 */
export function renderItem(item) {
  const row = document.createElement("tr");
  row.dataset.id = item.id;
  row.classList.add("item-row");

  // Цвет по редкости
  if (item.rarity === "legendary") row.style.backgroundColor = "gold";
  else if (item.rarity === "common") row.style.backgroundColor = "#ddd";

  row.innerHTML = `
    <td>${item.name}</td>
    <td>${item.category}</td>
    <td>${item.rarity}</td>
    <td>${item.damage ?? "—"}</td>
    <td><button class="delete-btn">Удалить</button></td>
  `;

  row.addEventListener("mouseenter", () => {
    itemInfo.textContent = item.getInfo?.() ?? "Нет информации.";
  });
  row.addEventListener("mouseleave", () => {
    itemInfo.textContent = "";
  });

  tableBody.appendChild(row);
  calculateTotalItems();
}

export function setupDeleteHandler() {
  tableBody.addEventListener("click", e => {
    if (e.target.classList.contains("delete-btn")) {
      const row = e.target.closest("tr");
      const id = row.dataset.id;

      // Анимация
      row.style.transition = "opacity 0.3s ease";
      row.style.opacity = 0;

      setTimeout(() => {
        removeItemById(id);
        row.remove();
        calculateTotalItems();
      }, 300);
    }
  });
}

export function updateTotalCount() {
  totalCount.textContent = inventory.length;
}
