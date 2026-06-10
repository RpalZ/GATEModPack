
ItemEvents.entityInteracted('minecraft:bundle', event => {


    const player = event.player
    const target = event.target
    
    const server = event.server
    if (!target.isLiving()) return;
    if (target.type !== 'minecraft:villager') return;

    let race = getOriginRace(player.nbt);
    if (race !== "gate:orc") return;

    // Cooldown check
    let cooldown = 3000
    if (player.persistentData.contains('orcRobCooldown')) {
        let lastRob = player.persistentData.getLong('orcRobCooldown');
        if ((server.tickCount - lastRob) < cooldown) { // 5 minute cooldown
            player.setStatusMessage("§cYou have recently robbed a villager. Wait before doing it again.");
            return;
        }
    }

    // Robbing logic
    let loot = [    
        'emerald',
    ];
    
    let amount = Math.floor(Math.random() * 32) + 1;
    let item = loot[Math.floor(Math.random() * loot.length)];
    
    player.give(Item.of(item, amount));
    player.persistentData.putLong('orcRobCooldown', server.tickCount);
    
    target.attack(1.0); // Angry villager
    player.setStatusMessage(`§6You brutally robbed the villager and got ${amount}x ${item}!`);
    
    // VFX
    server.runCommandSilent(`execute at ${target.uuid} run particle minecraft:angry_villager ~ ~1 ~ 0.5 0.5 0.5 0.1 5`);
});
