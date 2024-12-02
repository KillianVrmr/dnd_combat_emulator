class allyCreator{
    constructor(name,hp,maxHp,attack){
        this.name = name;
        this.hp = hp;
        this.maxHp = maxHp;
        this.attack = attack;
    }
    setHp(newHp){
        this.hp = newHp
    }
    getHp(){
        return this.hp
    }
    getMaxHp(){
        return this.maxHp
    }
}
function createAllie(){
    const allieInfo = {
        name: "test",
        size: "average",
        image: "./images/" + "allie"+ ".jpg",
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