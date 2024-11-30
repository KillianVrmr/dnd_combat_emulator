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
        const healthPercentage = (this.enemy.getHp() / this.enemy.getMaxHp()) * 100;
        this.updateHealthBar()
        console.log("Aw, I got hurt! I have " + this.enemy.getHp() + " HP left!"+ this.enemy.getMaxHp());
        }
        else{ console.log("i am already dead please stop")}}
    }
    async updateHealthBar() {
        const healthPercentage = Math.max(0, Math.min(100, (this.enemy.currentHp / this.enemy.maxHp) * 100));
        
        const healthBarProgress = document.getElementById("health_bar_progress");
        const healthBarText = document.getElementById("health_bar_text");

        // Simulate asynchronous delay (optional, for demonstration)
        await new Promise(resolve => setTimeout(resolve, 50)); // Simulated delay
        
        // Update progress bar width
        if (healthBarProgress) healthBarProgress.style.width = healthPercentage + "%";

        // Update overlay text
        if (healthBarText) healthBarText.innerHTML = `${this.enemy.currentHp} / ${this.enemy.maxHp}`;
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