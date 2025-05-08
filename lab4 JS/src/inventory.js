export const inventory = [];

export function addItem(item) {
  inventory.push(item);
}
/**
 * Удаляет элемент из массива inventory по его идентификатору.
 *
 * @param {number|string} id - Идентификатор элемента, который нужно удалить.
 */
export function removeItemById(id) {
  const index = inventory.findIndex(item => item.id === id);
  if (index !== -1) {
    inventory.splice(index, 1);
  }
}
