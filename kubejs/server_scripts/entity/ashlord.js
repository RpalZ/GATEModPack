EntityEvents.spawned("block_factorys_bosses:infernal_dragon", event => {
    const entity = event.entity

    let hp = 1500
    entity.maxHealth = hp
    entity.health = hp
})