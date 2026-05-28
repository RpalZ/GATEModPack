ISSEvents.spellOnCast(event => {

    

    console.log('fired')
    let player = event.player
    if(!player) return
    
    
    let playerMagicData = player.irons_spellbooks$getMagicData()

    let maxMana = player.getAttributeTotalValue("manaunification:max_mana")



    //check any hand item is a gun and has mana

    let mainHandItem = player.mainHandItem

    if($GunTags.containsManaTag(mainHandItem)){
        let manaCost = event.manaCost
        // let playerMana = playerMagicData.getMana()
        let borrowedMana = player.persistentData.getBoolean("borrowedMana")
        if(borrowedMana) {
            // playerMagicData.addMana(-borrowedMana)
            $GunTags.addMana(mainHandItem, -manaCost)
            player.persistentData.merge({borrowedMana: false})
        }
        
    }
    
})





NetworkEvents.dataReceived("borrowMana", event => {
     let player = event.player
    
    if(!player) return
    
    let playerMagicData = player.irons_spellbooks$getMagicData()

    let server = player.server

    let maxMana = player.getAttributeTotalValue("manaunification:max_mana")

    //check if casting already

    // player.tell(maxMana)

    
    //check any hand item is a gun and has mana
    
    
    let mainHandItem = player.mainHandItem

    
    
    if($GunTags.containsManaTag(mainHandItem)){
        if(playerMagicData.isCasting()) return
        let playerMana = playerMagicData.getMana()
        let mana = $GunTags.getMana(mainHandItem)
        let manaToAdd = maxMana - playerMana

        // player.tell(manaToAdd)
        // player.tell(playerMana)
        if(manaToAdd > mana) return
        // player.tell(manaToAdd)



        player.setStatusMessage("")
    
            playerMagicData.addMana(manaToAdd)
            // $GunTags.addMana(mainHandItem, -manaToAdd)
            player.setMainHandItem(mainHandItem)

            player.persistentData.merge({
                borrowedMana: true
            })
            
            server.scheduleInTicks(1, (n) => {
                playerMagicData.setMana(playerMana)
                
            })
        
    }
})
