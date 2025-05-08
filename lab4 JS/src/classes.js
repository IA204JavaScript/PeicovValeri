export class Item {
    constructor(id, name, category, rarity, description) {
      this.id = id;
      this.name = name;
      this.category = category;
      this.rarity = rarity;
      this.description = description;
    }
  
    getInfo() {
      return `${this.name} (${this.category}, ${this.rarity}): ${this.description}`;
    }
  }
  
  export class Weapon extends Item {
    constructor(id, name, rarity, description, damage) {
      super(id, name, 'weapon', rarity, description);
      this.damage = damage;
    }
  
    attack() {
      return `Оружие ${this.name} нанесло ${this.damage} урона!`;
    }
  
    getInfo() {
      return `${super.getInfo()} | Урон: ${this.damage}`;
    }
  }
  