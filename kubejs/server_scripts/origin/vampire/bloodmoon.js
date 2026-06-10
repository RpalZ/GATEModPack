
PlayerEvents.tick(event => {

    const player = event.player
    const level = event.level

    const server = event.server

    
    // Check every 2 seconds for performance
    if (server.tickCount % 20 !== 0) return;

    let nbt = player.nbt;
    let race = getOriginRace(nbt);

    // player.tell(race)
    
    if (race == "gate:vampire") {

        // player.tell('i am vamp')
        // Night time check (13000 to 23000 is usually night)
        let time = level.dayTime() % 24000;
        let isNight = time >= 13000 && time <= 23000;

        if (isNight) {
            player.potionEffects.add('minecraft:strength', 100, 1, true, false);
            player.potionEffects.add('minecraft:speed', 100, 1, true, false);
            // Subtle VFX when buff is active
            if (player.age % 80 === 0) {
                server.runCommandSilent(`execute at ${player.uuid} run particle minecraft:dust 0.6 0 0 1 ~ ~1 ~ 0.2 0.5 0.2 0.1 5`);
            }
        }
    }
});
