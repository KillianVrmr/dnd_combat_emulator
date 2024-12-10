class combatEngine{
    constructor(allies, enemies){
        this.allies = allies
        this.enemies = enemies
        this.turnOrder = {}
        this.rollInitiative()
    }
    rollInitiative() {
        // you roll an initiative to make a turn order that will be followed to keep combat simple, 
        // a modifier is applied to make stronger ones go first and weaker ones last more often
        const initiatives = [];
        this.allies.forEach((ally) => {
            ally.initiative = Math.floor(Math.random() * 20) + 1 + ally.modifier; 
            initiatives.push({ name: ally.name, initiative: ally.initiative });
        });

        this.enemies.forEach((enemy) => {
            enemy.initiative = Math.floor(Math.random() * 20) + 1 + enemy.modifier; 
            initiatives.push({ name: enemy.name, initiative: enemy.initiative });
        });
        initiatives.sort((a, b) => b.initiative - a.initiative);

        this.turnOrder = initiatives.reduce((order, entity) => {
            order[entity.name] = entity.initiative;
            return order;
        }, {});

        console.log("The turn order is:", this.turnOrder);
        this.takeTurn()
    }
    takeTurn() {
        const turnOrderArray = Object.entries(this.turnOrder);
    
        turnOrderArray.forEach(([name]) => {
            
            const ally = this.allies.find((ally) => ally.name === name);
            if (ally) {
                this.allyTurn(ally); 
            } else {
                const enemy = this.enemies.find((enemy) => enemy.name === name);
                if (enemy) {
                    this.enemyTurn(enemy); 
                }
            }
        });
    }
    
    allyTurn(ally){
        console.log("yup an ally is attacking "+ ally.name)
    }
    enemyTurn(enemy){
        console.log("oo no an enemy is attacking "+ enemy.name)
        enemy.attackally(5)
    }
}





const allies = [
    { name: "ally1", initiative: 0, modifier: 4 },
    { name: "ally2", initiative: 0, modifier: 2 }
];

const enemies = [
    { name: "enemy1", initiative: 0, modifier: 3 },
    { name: "enemy2", initiative: 0, modifier: 1 }
];
const ec =new combatEngine(allies,enemies)
