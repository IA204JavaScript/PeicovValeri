import { Item, Weapon } from './classes.js';
import { generateId } from './utils.js';
import { addItem } from './inventory.js';
import { renderItem, setupDeleteHandler } from './ui.js';

const form = document.getElementById("item-form");

form.addEventListener("submit", e => {
  e.preventDefault();

  const name = form.name.value.trim();
  const category = form.category.value;
  const rarity = form.rarity.value;
  const description = form.description.value.trim();
  const damage = parseInt(form.damage.value);

  if (!name || !description) return alert("Заполните все поля!");

  const id = generateId();

  let item;
  if (category === "weapon") {
    if (isNaN(damage)) return alert("Укажите урон для оружия.");
    item = new Weapon(id, name, rarity, description, damage);
    console.log(item.attack());
  } else {
    item = new Item(id, name, category, rarity, description);
  }

  addItem(item);
  renderItem(item);
  form.reset();
});

setupDeleteHandler();
