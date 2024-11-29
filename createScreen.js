// const { createMonster } = require('./monsterFactory.js');
const meleeButton = document.querySelector('.melee');
class createScreen{
    constructor(){
        this.enemy = null;
        this.allie = [];
        this.initEnemy();
    }
    async initEnemy() {
        this.enemy = await createMonster("aboleth"); // Wait for the promise to resolve
        console.log("Your first enemy will be: ", this.enemy.name);
    }
    async attackEnemy() {
        if (!this.enemy) {
            console.log("Enemy is not ready yet. Please wait...");
            return;
        }
    
        console.log(this.enemy.getHp());
        this.enemy.setHp(5);
        console.log("Aw, I got hurt! I have " + this.enemy.getHp() + " HP left!");
    }
}
const screen = new createScreen();
async function main() {

    // Wait for initialization to complete
    await new Promise(resolve => setTimeout(resolve, 1000)); // Adjust as needed
    screen.attackEnemy();
    screen.attackEnemy();
}
meleeButton.addEventListener('click', () => {
    console.log("Melee button clicked!");
    screen.attackEnemy();
});

main();