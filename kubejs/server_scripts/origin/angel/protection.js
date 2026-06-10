
EntityEvents.hurt('player', event => {
    let player = event.player;
    if (!player) return;
    
    let race = getOriginRace(player.nbt);
    if (race !== "gate:angel") return;

    // Use saturation first, then food level


    if (player.saturation > 0) {
        
        
        player.setSaturation(Math.max(0, player.saturation - event.getDamage() * 0.7));
        player.level.spawnParticles('minecraft:end_rod', true, player.x, player.y + 1, player.z, 0.5, 0.5, 0.5, 5, 0.05);
        event.cancel();
    } 
})
