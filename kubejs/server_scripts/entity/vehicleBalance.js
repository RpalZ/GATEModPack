EntityEvents.hurt(event => {

    let level = event.getLevel()
    let player = event.getPlayer()

    
    if(!player) return
    
    // level.tell('EVENT FIRED LOLOLOL')
    let playerNbt = player.getNbt()

    let isInVehicle = playerNbt.contains("RootVehicle")

    if (!isInVehicle) return

    let sourceEntity = event.getSource().getActual()
    
    if(!sourceEntity) return

    let tags = sourceEntity.getEntityType().getTags().map(t => t.location().toString()).toList()

    if(!tags.contains("forge:bosses")) return

    let dmg = event.getDamage()

    // player.attack(event.source, dmg * 1.5)

    let rootVehicle = playerNbt.getCompound("RootVehicle")

    let entity =  rootVehicle.getCompound("Entity")
    let entityUUID = entity.getUUID("UUID")
    
    // console.log(entityUUID)
    
    let vehicleEntity = event.getLevel().getEntity(entityUUID)

    // console.log(vehicleEntity)

    let damage = event.getDamage()

    vehicleEntity.health -= damage*1.5

    // let utilsnbt = Java.loadClass("dev.latvian.mods.rhino.mod.util.NBTUtils")
    

    // level.tell("Boss deal some dmg fr nigga")


})


