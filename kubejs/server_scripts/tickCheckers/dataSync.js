ServerEvents.tick(event => {


    if(event.getServer().tickCount % 20 !== 0) return 

    const players = event.getServer().players

    players.forEach(player => {

        const UUID = player.getUuid()
        const payload = NBT.toTagCompound({})
        
        

        const data = player.getPersistentData()
        payload.putUUID("uuid", UUID)
        payload.put("data", data)
    


        event.getServer().sendData("syncNBT", payload)
        
    })
})