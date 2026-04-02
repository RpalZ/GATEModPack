NetworkEvents.dataReceived("syncNBT", (event) => {

    
    const nbtData = event.getData()
    
    // console.log("hello1")
    // console.log(nbtData)
    const dataUUID = nbtData.getUUID('uuid')
    // console.log("hello2")
    
    const player = event.getPlayer() 
    // player.tell("fired!")


    if(player.getUuid().equals(dataUUID)) {
        // player.tell("hello")

        const data = nbtData.getCompound('data')
        player.persistentData.merge(data)

    }
    
})