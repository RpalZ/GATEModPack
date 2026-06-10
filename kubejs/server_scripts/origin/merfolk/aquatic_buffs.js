
PlayerEvents.tick(event => {

    const player = event.player
    const server = event.server
    // Check every second for performance
    if (server.tickCount % 20 !== 0) return;

    let race = getOriginRace(player.nbt);
    if (race !== "gate:merfolk") return;

    

    if (player.isInWater()) {
        player.potionEffects.add('minecraft:strength', 100, 4, false, false);
        player.potionEffects.add('minecraft:haste', 100, 3, false, false);
        player.potionEffects.add('minecraft:resistance', 100, 3, false, false);
        player.potionEffects.add('minecraft:regeneration', 100, 1, false, false);
    }
});
