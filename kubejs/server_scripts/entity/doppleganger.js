EntityEvents.spawned("darkdoppelganger:dark_doppelganger", event => {
    const entity = event.getEntity()
    entity.setAttributeBaseValue("irons_spellbooks:spell_power", 5)


})


ServerEvents.tick(event => {
    const server = event.server

    // if(server.tickCount % 20 !== 0) return

    //find dopplegangers

    const doppleGangers = server.getEntities().filter(m => m.getEntityType().toString().includes("dark_doppelganger"))

    if(doppleGangers.size() <= 0) return

    // server.tell('yes')

    doppleGangers.forEach(ent => {
        //check dimension
        let blockPos = ent.blockPosition()
        // server.tell(`blockpos: ${blockPos.y}`)

        if(blockPos.y <= -20 || blockPos.y >= 150) {
            // Find players within 10 blocks radius
            let players = ent.level.getPlayers().filter(p => {
                let pPos = p.blockPosition();
                let dx = pPos.x - blockPos.x;
                let dz = pPos.z - blockPos.z;
                return (dx * dx + dz * dz) <= 64*64;
            });
            if(players.length > 0) {
                // Pick a random player
                // server.tell("teleporting...")
                let player = players[Math.floor(Math.random() * players.length)];
                let pPos = player.blockPosition();
                // Teleport entity to y=100 above player
                ent.teleportTo(pPos.x + 0.5, 100, pPos.z + 0.5);
            }
        }
    })
})