PlayerEvents.respawned(event => {
    const player = event.getPlayer()
    // Delay the sound by 10 ticks to ensure the client is ready
    const blockPos = player.blockPosition()
    event.server.runCommandSilent(`playsound gate:player_death master ${player.name.string} ${blockPos.x} ${blockPos.y} ${blockPos.z} 1 1`)
})
