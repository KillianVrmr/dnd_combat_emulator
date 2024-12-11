// const { createMonster } = require('./monsterFactory.js');
const meleeButton = document.querySelector('.melee');
const slashButton = document.querySelector('.slash');
const bashButton = document.querySelector('.bash');
const screamButton = document.querySelector('.scream');
let myVariable = "Initial Value";

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
            this.initEnemy(random_monster,i)
        };
        for(let i = 0;i<1;i++){
        this.initAlly(i);
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
    initAlly(index) {
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
    
    async initEnemy(name,index) {
        // Wait for the promise to resolve and get the monster object
        const monster = await createMonster(name,index);
    
        // Push the new monster object into the enemies list
        this.enemies.push(monster);
    
        // Create a container for the new enemy
        const enemyContainer = document.createElement("div");
        enemyContainer.classList.add(`enemy_corner`); // Use a class instead of an ID for multiple instances
        enemyContainer.setAttribute("index",`${index}`)
    
        // Fill in the HTML structure
        enemyContainer.innerHTML = `
            <div class="enemy_img${index}">
                <img src="${monster.image}" alt="${monster.name}" style="max-width: 100%; height: auto;">
            </div>
            <div class="enemy_name${index}">${monster.name}</div>
            <div class="health_bar_enemy${index}" style="width: 100%; background-color: #ccc; height: 30px; position: relative; border: 1px solid #000;">
                <div class="health_bar_progress_enemy${index}" style="width: 100%; background-color: red; height: 100%; position: absolute;"></div>
                <div class="health_bar_text_enemy${index}" style="position: absolute; width: 100%; height: 100%; text-align: center; line-height: 30px; color: white; font-weight: bold;">100%</div>
            </div>
            <div class="enemy_descr${index}">${monster.description}</div>
        `;
        enemyContainer.addEventListener("click", () => {
            console.log("Variable changed to:")
            myVariable = enemyContainer.getAttribute("index");
    
            // Remove 'selected' class from all divs
    
            // Add 'selected' class to the clicked div
            enemyContainer.classList.add("selected");
    
            console.log("Variable changed to:", myVariable);
        });
        // Append the new enemy container to a parent container
        const parentContainer = document.getElementById("enemies_container"); // Ensure this container exists in your HTML
        console.log(parentContainer)
        parentContainer.appendChild(enemyContainer);
    
        console.log("Current enemies list:", this.enemies);
    }
    
    

    async attackEnemy(damage) {
        console.log("this should be the selected enemy i attack:"+myVariable)
        this.enemies.forEach(element => {
            if(element.id == myVariable){
            console.log(element.id, myVariable, element.name )
        
        document.getElementsByClassName("melee").item(0).style.display = "none";
        document.getElementsByClassName("slash").item(0).style.display = "none";
        document.getElementsByClassName("bash").item(0).style.display = "none";
        document.getElementsByClassName("scream").item(0).style.display = "none";
        if(element.getHp()>=0){

        element.setHp(element.getHp()-damage);
        const healthPercentage = (element.getHp() / element.getMaxHp()) * 100;
        this.updateEnemyHealthBar(element)
        this.attackAlly(2)
        console.log("Aw, I got hurt! I have " + element.getHp() + " HP left!"+element.getMaxHp());
        setTimeout(2000);
        document.getElementsByClassName("melee").item(0).style.display = "none";
        document.getElementsByClassName("slash").item(0).style.display = "none";
        document.getElementsByClassName("bash").item(0).style.display = "none";
        document.getElementsByClassName("scream").item(0).style.display = "none";
        }
        else{ console.log("i am already dead please stop")}}
       
        else{console.log("not found it"+ element.id, myVariable, element.name )}
        
        });
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

    async updateEnemyHealthBar(unit) {
        const healthPercentage = Math.max(0, Math.min(100, (unit.getHp() / unit.getMaxHp()) * 100));
        
        const healthBarProgress = document.getElementsByClassName(`health_bar_progress_enemy${unit.id}`)[0];
        const healthBarText = document.getElementsByClassName(`health_bar_text_enemy${unit.id}`)[0];
        console.log("heatlhbar data"+unit.id,healthBarText,healthBarProgress)
        await new Promise(resolve => setTimeout(resolve, 50)); // Simulated delay
        
        // Update progress bar width
        console.log(healthPercentage)
        if (healthBarProgress) healthBarProgress.style.width = healthPercentage + "%";

        // Update overlay text
        if (healthBarText) healthBarText.innerHTML = `${unit.getHp()} / ${unit.getMaxHp()}`;
    }
    updateAllyHealthBar(){
        const healthPercentage = Math.max(0, Math.min(100, ((unit.getHp()) / unit.getMaxHp()) * 100));
        
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


    // Select all divs with the class 'selectableDiv'
const divs = document.querySelectorAll(".enemy_corner");

console.log("amount of divs existing"+divs.length)
for (let i = 0; i < divs.length; i++) {
    const dataValue = divs[i].getAttribute("index");
    console.log(`Div ${i + 1} data-value: ${dataValue}`);
}


divs.forEach(div => {
    div.addEventListener("click", () => {
        console.log("Variable changed to:")
        myVariable = div.getAttribute("index");

        // Remove 'selected' class from all divs
        divs.forEach(d => d.classList.remove("selected"));

        // Add 'selected' class to the clicked div
        div.classList.add("selected");

        console.log("Variable changed to:", myVariable);
    });
});