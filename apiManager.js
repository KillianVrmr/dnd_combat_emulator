const class_url = "https://www.dnd5eapi.co/api/classes/";
const monsters_url = "https://www.dnd5eapi.co/api/monsters/"

async function dndApiConnection(url) {
    try{
        const database = await fetch(url);
        const data = await database.json();
        data.results.forEach((monster,index) => {
            console.log(monster.name,index);
          });
        return data
    }
    catch (error) {
        console.error("Error fetching data:", error);
    }
}
async function monsterApi(monster) {
    try{
        const monsterDatabase = await fetch(`${monsters_url}/${monster}`);
        const monsterInfo = await monsterDatabase.json();
        console.log(monsterInfo);
        return monsterInfo
    }
    catch (error) {
        console.error("Error fetching data:", error);
    }
}

// dndApiConnection(monsters_url);
// monsterApi("aboleth");
//module.exports = { monsterApi };