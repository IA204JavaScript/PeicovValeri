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


// Тесты

const potion = new Item("Health Potion", 0.5, "common");
console.log(potion.getInfo());
potion.setWeight(0.6);
console.log(`Новый вес: ${potion.weight}`);

const axe = new Weapon("Battle Axe", 5.0, "rare", 25, 80);
console.log(axe.getInfo());
axe.use();
console.log(`Актуальная прочность: ${axe.durability}`);
axe.repair();
console.log(axe.getInfo());