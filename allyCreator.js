class allyCreator{
    constructor(allyInfo){
        this.id = allyInfo.id;
        this.name = allyInfo.name;
        this.hp = allyInfo.hp;
        this.maxHp = allyInfo.hp;
        this.image = allyInfo.image;
        this.attack = allyInfo.attack;
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
    displayInfo(){
        console.log(`Monster Name: ${this.name}`);
        console.log(`Type: ${this.type}`);
        console.log(`HP: ${this.hp}`);
        console.log(`Attack: ${this.attack}`);
        console.log(`Defense: ${this.defense}`);
        console.log(`Description: ${this.description}`);
    }
}

function createAlly(info){
    console.log("hey i am creating you ok")
    const allyInfo = {
        id :info.id,
        name: "test",
        size: "average",
        image: "./images/allys/" + "ally"+ ".jpg",
        type: "no type",
        hp: 55,
        attack: 15
      };
    if (allyInfo) {
        const allyInstance = new allyCreator(allyInfo);
        allyInstance.displayInfo();
        return allyInstance;
    } else {
        console.error("Failed to create ally instance. No data available.");
        return null;
    }
}