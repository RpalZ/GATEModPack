ServerEvents.customCommand("clearServerPersistent", event => {
    const server = event.getServer()
    server.persistentData.merge({hallwayGenerated: false})
    server.tell('Server NBT Cleared')
})