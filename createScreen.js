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
        this.enemies = [];
        this.allies = [];
        for(let i = 0;i<5;i++){
            const random_monster = availableMonsters[Math.floor(Math.random() * 9)]
            console.log(random_monster);
            this.initEnemy(random_monster)
        };
        for(let i = 0;i<1;i++){
        this.initAlly();
        }
        this.rollInitiative();
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
    initAlly() {
        try {
            const ally = createAlly(); // Call a method to create an ally
            this.allies.push(ally); // Add to the allies array
    
            console.log("Your ally is: ", ally.name);
    
            // Create a container for the new ally
            const allyContainer = document.createElement("div");
            allyContainer.classList.add("ally_corner"); // Use a class instead of an ID for multiple instances
    
            // Fill in the HTML structure
            allyContainer.innerHTML = `
                <div class="ally_img">
                    <img src="${ally.image}" alt="${ally.name}" style="max-width: 100%; height: auto;">
                </div>
                <div class="ally_name">${ally.name}</div>
                <div class="health_bar_ally" style="width: 100%; background-color: #ccc; height: 30px; position: relative; border: 1px solid #000;">
                    <div class="health_bar_progress_ally" style="width: 100%; background-color: green; height: 100%; position: absolute;"></div>
                    <div class="health_bar_text_ally" style="position: absolute; width: 100%; height: 100%; text-align: center; line-height: 30px; color: white; font-weight: bold;">100%</div>
                </div>
            `;
    
            // Append the new ally container to a parent container
            const parentContainer = document.getElementById("allies_container"); // Ensure this container exists in your HTML
            parentContainer.appendChild(allyContainer);
    
            console.log("Current allies list:", this.allies);
        } catch (error) {
            console.error("Error initializing ally:", error);
        }
    }
    
    async initEnemy(name) {
        // Wait for the promise to resolve and get the monster object
        const monster = await createMonster(name);
    
        // Push the new monster object into the enemies list
        this.enemies.push(monster);
    
        // Create a container for the new enemy
        const enemyContainer = document.createElement("div");
        enemyContainer.classList.add("enemy_corner"); // Use a class instead of an ID for multiple instances
    
        // Fill in the HTML structure
        enemyContainer.innerHTML = `
            <div class="enemy_img">
                <img src="${monster.image}" alt="${monster.name}" style="max-width: 100%; height: auto;">
            </div>
            <div class="enemy_name">${monster.name}</div>
            <div class="health_bar_enemy" style="width: 100%; background-color: #ccc; height: 30px; position: relative; border: 1px solid #000;">
                <div class="health_bar_progress_enemy" style="width: 100%; background-color: red; height: 100%; position: absolute;"></div>
                <div class="health_bar_text_enemy" style="position: absolute; width: 100%; height: 100%; text-align: center; line-height: 30px; color: white; font-weight: bold;">100%</div>
            </div>
            <div class="enemy_descr">${monster.description}</div>
        `;
    
        // Append the new enemy container to a parent container
        const parentContainer = document.getElementById("enemies_container"); // Ensure this container exists in your HTML
        console.log(parentContainer)
        parentContainer.appendChild(enemyContainer);
    
        console.log("Current enemies list:", this.enemies);
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
        this.updateEnemyHealthBar()
        this.attackAlly(2)
        console.log("Aw, I got hurt! I have " + this.enemy.getHp() + " HP left!"+ this.enemy.getMaxHp());
        }
        else{ console.log("i am already dead please stop")}}

    }
    async attackAlly(damage){
        if (!this.ally) {
            console.log("Enemy is not ready yet. Please wait...");
            return;
        }
        else{
        if(this.ally.getHp()>=0){

        this.ally.setHp(this.ally.getHp()-damage);
        const healthPercentage = (this.ally.getHp() / this.ally.getMaxHp()) * 100;
        this.updateAllyHealthBar()
        console.log("Aw, I got hurt! I have " + this.ally.getHp() + " HP left!"+ this.ally.getMaxHp());
        }
        else{ console.log("i am already dead please stop")}}
    }

    async updateEnemyHealthBar() {
        const healthPercentage = Math.max(0, Math.min(100, (this.enemy.getHp() / this.enemy.getMaxHp()) * 100));
        
        const healthBarProgress = document.getElementById("health_bar_progress_enemy");
        const healthBarText = document.getElementById("health_bar_text_enemy");

        await new Promise(resolve => setTimeout(resolve, 50)); // Simulated delay
        
        // Update progress bar width
        console.log(healthPercentage)
        if (healthBarProgress) healthBarProgress.style.width = healthPercentage + "%";

        // Update overlay text
        if (healthBarText) healthBarText.innerHTML = `${this.enemy.getHp()} / ${this.enemy.getMaxHp()}`;
    }
    updateAllyHealthBar(){
        const healthPercentage = Math.max(0, Math.min(100, ((this.ally.getHp()) / this.ally.getMaxHp()) * 100));
        
        const healthBarProgress = document.getElementById("health_bar_progress_ally");
        const healthBarText = document.getElementById("health_bar_text_ally");

       // new Promise(resolve => setTimeout(resolve, 50)); // Simulated delay
        
        // Update progress bar width
        console.log(healthPercentage)
        if (healthBarProgress) healthBarProgress.style.width = healthPercentage + "%";

        // Update overlay text
        if (healthBarText) healthBarText.innerHTML = `${this.ally.getHp()} / ${this.ally.getMaxHp()}`;
    }
    allyTurn(ally){

    }
    enemyTurn(enemy){

    }
}
const screen = new createScreen();

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
