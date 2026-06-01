EntityEvents.spawned("block_factorys_bosses:sandworm", event => {
    const radius = 100
    const entity = event.getEntity()


    entity.maxHealth = 1024
    entity.health = 1024
    const currentPos = entity.blockPosition()
    entity.persistentData.merge({
        oX: currentPos.x,
        oZ: currentPos.z,
        radius: radius
    })
    }


)

ServerEvents.tick(event => {
    const tick = event.server.tickCount
    if (tick % 20 !== 0) return

    event.server.getAllLevels().forEach(level => {
    const sandwormList = level.getEntities().filter(m => m.getType() === "block_factorys_bosses:sandworm")
    sandwormList.forEach(sandworm => {
        let currentPos = sandworm.blockPosition()
        let radius = sandworm.persistentData.getInt("radius")
        let oX= sandworm.persistentData.getInt("oX")
        let oZ= sandworm.persistentData.getInt("oZ")
        // server.tell(currentPos.x)
        // server.tell(currentPos.z)
        // server.tell(oX)
        // server.tell(oZ)
        let dX = currentPos.x - oX
        let dZ = currentPos.z - oZ
        let isInCircle = (dX*dX) + (dZ*dZ) <= (radius*radius)
            // server.tell(isInCircle)
            // server.tell(dX)
            // server.tell(dZ)
        if(!isInCircle) {
            sandworm.teleportTo(oX, currentPos.y, oZ)
            sandworm.heal(sandworm.getMaxHealth())
        }
    })
    })


})