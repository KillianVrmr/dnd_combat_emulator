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
        for(let i = 0;i<3;i++){
        this.initAlly(i);
        }
    }

    initAlly(index) {
        try {
            const allyinfo = {id: index}
            const ally = createAlly(allyinfo); // Call a method to create an ally
            this.allies.push(ally); // Add to the allies array
    
            console.log("Your ally is: ", ally.name);
    
            // Create a container for the new ally
            const allyContainer = document.createElement("div");
            allyContainer.classList.add("ally_corner"); // Use a class instead of an ID for multiple instances
    
            // Fill in the HTML structure
            allyContainer.innerHTML = `
                <div class="ally_img${index}">
                    <img src="${ally.image}" alt="${ally.name}" style="max-width: 100%; height: auto;">
                </div>
                <div class="ally_name${index}">${ally.name}</div>
                <div class="health_bar_ally${index}" style="width: 100%; background-color: #ccc; height: 30px; position: relative; border: 1px solid #000;">
                    <div class="health_bar_progress_ally${index}" style="width: 100%; background-color: green; height: 100%; position: absolute;"></div>
                    <div class="health_bar_text_ally${index}" style="position: absolute; width: 100%; height: 100%; text-align: center; line-height: 30px; color: white; font-weight: bold;">${ally.hp}/${ally.hp}</div>
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
                <div class="health_bar_text_enemy${index}" style="position: absolute; width: 100%; height: 100%; text-align: center; line-height: 30px; color: white; font-weight: bold;">${monster.MaxHp}/${monster.MaxHp}</div>
            </div>
            <div class="enemy_descr${index}">${monster.description}</div>
        `;

        // Assuming "enemyContainer" is the parent container for dynamically created divs
        enemyContainer.addEventListener("click", (event) => {
            const clickedDiv = event.target;
        
            // Ensure it's an enemy-div or a child of an enemy-div that was clicked
            if (clickedDiv.closest(".enemy_corner")) {
                const targetDiv = clickedDiv.closest(".enemy_corner");
        
                // Remove 'selected' class from all divs
                const arena = document.getElementById("arena");
                const allDivs = arena.querySelectorAll(".enemy_corner");
                allDivs.forEach(div => div.classList.remove("selected"));

                targetDiv.classList.add("selected");
                // Update myVariable
                myVariable = targetDiv.getAttribute("index");
            }
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
        
        if(element.getHp()>=0){

            
        document.getElementsByClassName("melee").item(0).style.display = "none";
        document.getElementsByClassName("slash").item(0).style.display = "none";
        document.getElementsByClassName("bash").item(0).style.display = "none";
        document.getElementsByClassName("scream").item(0).style.display = "none";
        element.setHp(element.getHp()-damage);
        const healthPercentage = (element.getHp() / element.getMaxHp()) * 100;
        this.updateEnemyHealthBar(element)
        this.enemyTurn(element)
        
        console.log("Aw, I got hurt! I have " + element.getHp() + " HP left!"+element.getMaxHp());
        setTimeout(() => {
            document.querySelector(".melee").style.display = "inline-block";
            document.querySelector(".slash").style.display = "inline-block";
            document.querySelector(".bash").style.display = "inline-block";
            document.querySelector(".scream").style.display = "inline-block";
        }, 1000);}
        else{ console.log("i am already dead please stop")}}
       
        else{console.log("not found it"+ element.id, myVariable, element.name )}
        
        });
    }
    async attackAlly(damage,ally){
        console.log(ally.getHp())
        if(ally.getHp()>=0){

        ally.setHp(ally.getHp()-damage);
        const healthPercentage = (ally.getHp() /ally.getMaxHp()) * 100;
        this.updateAllyHealthBar(ally)
        console.log("Aw, I got hurt! I have " + ally.getHp() + " HP left!"+ ally.getMaxHp());
        }
        else{ console.log("i am already dead please stop")}}
    

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
    updateAllyHealthBar(unit){
        const healthPercentage = Math.max(0, Math.min(100, ((unit.getHp()) / unit.getMaxHp()) * 100));
        
        const healthBarProgress = document.getElementsByClassName(`health_bar_progress_ally${unit.id}`)[0];
        const healthBarText = document.getElementsByClassName(`health_bar_text_ally${unit.id}`)[0];
        console.log("ally health bar"+ healthBarProgress, healthBarText,unit.id)
       // new Promise(resolve => setTimeout(resolve, 50)); // Simulated delay
        
        // Update progress bar width
        console.log(healthPercentage)
        if (healthBarProgress) healthBarProgress.style.width = healthPercentage + "%";

        // Update overlay text
        if (healthBarText) healthBarText.innerHTML = `${unit.getHp()} / ${unit.getMaxHp()}`;
    }
    allyTurn(ally){

    }
    enemyTurn(enemy) {
        setTimeout(() => {
            console.log("finally my turn");
            const target_ally = Math.floor(Math.random() * this.allies.length);
            console.log("you will take my hit " + this.allies[target_ally]);
            this.attackAlly(Math.floor(Math.random() * (12 - 3 + 1)) + 8, this.allies[target_ally]);
        }, 1000); 
    }
}
const screen = new createScreen();

meleeButton.addEventListener('click', () => {
    console.log("Melee button clicked!");
    screen.attackEnemy(10);
});
slashButton.addEventListener('click', () => {
    console.log("slash button clicked!");
    screen.attackEnemy(Math.floor(Math.random() * (12 - 3 + 1)) + 8);
});
bashButton.addEventListener('click', () => {
    console.log("bash button clicked!");
    screen.attackEnemy(Math.floor(Math.random() * (15 - 7 + 1)) + 7);
});
screamButton.addEventListener('click', () => {
    console.log("scream button clicked!");
    screen.attackEnemy(Math.floor(Math.random() * (30 - 7 + 1)));
});


    // Select all divs with the class 'selectableDiv'
const divs = document.querySelectorAll(".enemy_corner");

console.log("amount of divs existing"+divs.length)
for (let i = 0; i < divs.length; i++) {
    const dataValue = divs[i].getAttribute("index");
    console.log(`Div ${i + 1} data-value: ${dataValue}`);
}