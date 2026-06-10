
EntityEvents.hurt('player', event => {
    let player = event.player;
    if (!player) return;
    let server = event.server
    let race =getOriginRace(player.nbt);
    if (race !== "gate:dragonborne") return;

    if (event.damage >= player.health) {
        if (Math.random() < 0.25) { // 25% chance


            player.setInvulnerable(true)

            player.setStatusMessage(Text.of("Your mighty scales deflected the fatal blow!").yellow().italic());
            player.level.spawnParticles('minecraft:flash', true, player.x, player.y + 1, player.z, 0, 0, 0, 1, 0);
            

            server.scheduleInTicks(2, c => {
                player.setInvulnerable(false)
            })
            event.cancel();
            // Give a tiny bit of health back so they don't die instantly to a tick of fire or something
        }
    }
})
