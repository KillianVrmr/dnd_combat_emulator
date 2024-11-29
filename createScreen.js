const { createMonster } = require('./monsterFactory.js');

class createScreen{
    constructor(){
        this.enemy = createMonster("aboleth");
        this.allie = [];
        console.log("your first enemy will be :" + this.enemy)
        
    }
    createEnemy(){
       const firstEnemy = createMonster("aboleth");
       this.enemy.push(firstEnemy)
       console.log(this.enemy)
    }
}

const screen = new createScreen();