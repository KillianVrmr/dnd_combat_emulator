// const { createMonster } = require('./monsterFactory.js');
const meleeButton = document.querySelector('.melee');
const slashButton = document.querySelector('.slash');
const bashButton = document.querySelector('.bash');
const screamButton = document.querySelector('.scream');


const availableMonsters = [
    "aboleth",
    "ankheg", 
    "behir", 
    "chuul", 
    "cloaker", 
    "darkmantle", 
    "marilith", 
    "quasit", 
    "drider"]
class createScreen{
    constructor(){
        this.enemy = null;
        this.allie = [];
        const random_monster = availableMonsters[Math.floor(Math.random() * 9)]
        console.log(random_monster)
        this.initEnemy(random_monster);
    }
    async initEnemy(name) {
        this.enemy = await createMonster(name); // Wait for the promise to resolve
        console.log("Your first enemy will be: ", this.enemy.name);

        document.getElementById("enemy_name").textContent = this.enemy.name;
        console.log(this.enemy.image)
        fetch(this.enemy.image)
    .then((response) => {
        if (response.ok) {
            console.log('File exists');
        } else {
            console.log('File does not exist');
        }
    })
    .catch((error) => console.log('Error fetching file:', error));
        //document.getElementById("enemy_img").src = this.enemy.image;
        document.getElementById("health_bar").textContent = this.enemy.hp;
        document.getElementById("enemy_descr").textContent = this.enemy.description;
    }
    async setEnemyImg(){
        document.getElementById("enemy_img").src = this.enemy.image;
        const bannerImage = document.getElementById('enemy_imge');
        bannerImage.innerHTML = `
            <div class="enemy_img"> 
            <img src="${this.enemy.image}">
            </div>
            `
    }
    async attackEnemy(damage) {
        if (!this.enemy) {
            console.log("Enemy is not ready yet. Please wait...");
            return;
        }
        else{
        if(this.enemy.getHp()>=0){

        this.enemy.setHp(this.enemy.getHp()-damage);
        console.log("Aw, I got hurt! I have " + this.enemy.getHp() + " HP left!");
        }
        else{ console.log("i am already dead please stop")}}
    }
}
const screen = new createScreen();
async function main() {

    // Wait for initialization to complete
    await new Promise(resolve => setTimeout(resolve, 2000)); // Adjust as needed
    screen.attackEnemy(10);
    screen.attackEnemy(20);
    screen.setEnemyImg();
}
meleeButton.addEventListener('click', () => {
    console.log("Melee button clicked!");
    screen.attackEnemy(7);
});
slashButton.addEventListener('click', () => {
    console.log("slash button clicked!");
    screen.attackEnemy(8);
});
bashButton.addEventListener('click', () => {
    console.log("bash button clicked!");
    screen.attackEnemy(9);
});
screamButton.addEventListener('click', () => {
    console.log("scream button clicked!");
    screen.attackEnemy(10);
});

main();