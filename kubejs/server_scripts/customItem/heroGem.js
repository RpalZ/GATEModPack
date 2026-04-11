ItemEvents.rightClicked('kubejs:hero_gem', event => {
    const gem = event.getItem()
    const player = event.getPlayer()
    const level = event.getLevel()
    const server = event.getServer()

    const playerName = player.getName()
    player.setStatusMessage(Text.of("You feel your feet lifted...").yellow().italic())
    const dingy = `execute in gate:leaders_world run tp ${playerName.string} 15 103 99`

    server.scheduleInTicks(30, (e) => {
        server.runCommandSilent(dingy)
        player.setStatusMessage("")
    })
    


    
})