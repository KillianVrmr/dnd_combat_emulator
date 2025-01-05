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
    const allyInfo = {}
    fetch('allies.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    const allyInfo = data.ranger; // Replace 'ranger' with the desired ally
    console.log(allyInfo);
  })
  .catch((error) => {
    console.error('Error fetching JSON:', error);
  });
  
  console.log("this is hte info "+ allyInfo.name)
    if (allyInfo) {
        const allyInstance = new allyCreator(allyInfo);
        allyInstance.displayInfo();
        return allyInstance;
    } else {
        console.error("Failed to create ally instance. No data available.");
        return null;
    }
}