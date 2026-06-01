ServerEvents.customCommand("clearServerPersistent", event => {
    const server = event.getServer()
    server.persistentData.merge({
        golemUUIDs: []
    })
    server.tell('Server NBT Cleared')
})