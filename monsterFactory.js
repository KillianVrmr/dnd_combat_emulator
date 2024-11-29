const { monsterApi } = require('./apiManager');
class MonsterFactory{
    constructor(monsterData){
        this.name = monsterData.name || "Unknown Monster";
        this.type = monsterData.type || "Unknown Type";
        this.hp = monsterData.hp || 1;
        this.attack = monsterData.attack || 0;
        this.defense = monsterData.defense || 0;
        this.description = monsterData.description || "No description available.";
    }
    displayInfo() {
        console.log(`Monster Name: ${this.name}`);
        console.log(`Type: ${this.type}`);
        console.log(`HP: ${this.hp}`);
        console.log(`Attack: ${this.attack}`);
        console.log(`Defense: ${this.defense}`);
        console.log(`Description: ${this.description}`);
    }
}

async function createMonster(monster) {
    const monsterData = await monsterApi(monster);
    {name,} = monsterData;
    console.log(monsterData + "yup you got here indeed")
    if (monsterData) {
        console.log("got stuck in here")
        const monsterInstance = new MonsterFactory(monsterData);
        return monsterInstance;
    } else {
        console.error("Failed to create monster instance. No data available.");
        return null;
    }
}
createMonster("aboleth");