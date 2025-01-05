// const { monsterApi } = require('./apiManager');
class MonsterFactory{
    constructor(monsterData){
        this.id = monsterData.id;
        this.name = monsterData.name || "Unknown Monster";
        this.type = monsterData.type || "Unknown Type";
        this.image =  monsterData.image;
        this.hp = monsterData.hp || 1;
        this.MaxHp = monsterData.hp || 1;
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
    getHp(){
        return this.hp
    }
    getMaxHp(){
        return this.MaxHp
    }
    setHp(newHp){
        this.hp = newHp;
    }
}
// module.exports = { createMonster };
async function createMonster(monster,index) {
    const monsterData = await monsterApi(monster);

    const monsterInfo = {
        id:index,
        name: monsterData.name,
        size: monsterData.size,
        image: "./images/monsters/" + monsterData.name+ ".jpg",
        type: monsterData.type,
        hp: monsterData.hit_points,
        attack: monsterData.strength
      };
    if (monsterInfo) {
        const monsterInstance = new MonsterFactory(monsterInfo);
        monsterInstance.displayInfo();
        return monsterInstance;
    } else {
        console.error("Failed to create monster instance. No data available.");
        return null;
    }
}
