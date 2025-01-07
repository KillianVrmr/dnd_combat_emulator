class allyCreator {
  constructor (allyInfo) {
    this.id = allyInfo.id
    this.name = allyInfo.name
    this.hp = allyInfo.hp
    this.maxHp = allyInfo.hp
    this.image = allyInfo.image
    this.attack = allyInfo.attack
  }

  setHp (newHp) {
    this.hp = newHp
  }

  getHp () {
    return this.hp
  }

  getMaxHp () {
    return this.maxHp
  }

  displayInfo () {
    console.log(`Monster Name: ${this.name}`)
    console.log(`Type: ${this.type}`)
    console.log(`HP: ${this.hp}`)
    console.log(`Attack: ${this.attack}`)
    console.log(`Defense: ${this.defense}`)
    console.log(`Description: ${this.description}`)
  }
}

function createAlly (info, allyType) {
  console.log('Starting to create ally...')

  return fetch('allies.json') // Ensure the path is correct
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then((data) => {
      const allyInfo = data[allyType] // Use the provided ally type (e.g., 'ranger', 'wizard')
      if (!allyInfo) {
        throw new Error(`Ally type "${allyType}" not found in allies.json`)
      }

      console.log('Ally info loaded:', allyInfo)

      // Create an ally instance
      const allyInstance = new allyCreator(allyInfo)
      allyInstance.displayInfo()

      return allyInstance // Return the created instance
    })
    .catch((error) => {
      console.error('Error initializing ally:', error)
      return null // Handle error gracefully
    })
}
