EntityEvents.spawned("block_factorys_bosses:infernal_dragon", event => {
    const entity = event.entity
    entity.maxHealth = 1024
    entity.health = 1024
})