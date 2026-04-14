EntityEvents.hurt(event => {

    let level = event.getLevel()
    let player = event.getPlayer()

    
    if(!player) return
    
    let playerNbt = player.getNbt()

    let isInVehicle = playerNbt.contains("RootVehicle")

    if (!isInVehicle) return

    let sourceEntity = event.getSource().getActual()
    
    if(!sourceEntity) return

    let tags = sourceEntity.getEntityType().getTags().map(t => t.location().toString()).toList()

    if(!tags.contains("forge:bosses")) return


    // player.attack(event.source, dmg * 1.5)

    let rootVehicle = playerNbt.getCompound("RootVehicle")

    let entity =  rootVehicle.getCompound("Entity")
    let entityUUID = entity.getUUID("UUID")
    
    // console.log(entityUUID)
    
    let vehicleEntity = event.getLevel().getEntity(entityUUID)

    // console.log(vehicleEntity)

    let damage = event.getDamage()

    const vehicleMultiplier = 2.0


    const finalDamage = damage*vehicleMultiplier


    vehicleEntity.health -= finalDamage

    // let utilsnbt = Java.loadClass("dev.latvian.mods.rhino.mod.util.NBTUtils")


})

EntityEvents.hurt(event => {

    const level = event.getLevel()

    const source = event.getSource()
    const sourceEntity = source.getActual()
    


    const player = source.getPlayer()

    if(!player) return
 
    const bossEntity = event.getEntity()
    
    const bossTags = bossEntity.getEntityType().getTags().map(t => t.location().toString()).toList()

    if(!bossTags.contains("forge:bosses")) return


    //nerf if player is in vehicle

    const playerNbt = player.getNbt()
    const isInVehicle = playerNbt.contains("RootVehicle")

    if(!isInVehicle) return

    // level.tell("yes ")

    const damage = event.getDamage()

    const modifier = 0.5

    const finalDamage = damage * modifier

    // bossEntity.attack(source, finalDamage)
    // event.damage = finalDamage
    const newHealth = bossEntity.getHealth() + finalDamage


    

    bossEntity.setHealth(newHealth)
    
    // level.tell(bossEntity.getHealth())
    if(bossEntity.getHealth() <= 15){
        // level.tell("check")
        // const damageSource = level.damageSources().playerAttack(player)
        bossEntity.attack(source, 100)
        bossEntity.kill()
        // level.tell("killed boss")
    }
    // event.setAmount(finalDamage)


})


