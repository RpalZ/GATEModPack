PlayerEvents.respawned(event => {
    const player = event.getPlayer()
    const isMagic = player.persistentData.getBoolean("isMagic")
    
    // player.tell(isMagic)
    if(isMagic) return 
    // player.tell("Hi this is fired")
    // console.log("hi this firing")
    player.setAttributeBaseValue("manaunification:max_mana", 0)
    player.setAttributeBaseValue("irons_spellbooks:max_mana", 0)

})
