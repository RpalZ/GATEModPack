EntityEvents.hurt(event => {

    // let level = event.getLevel()
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

    // let damageSource = event.source.typeHolder().getTagKeys().map(m => m.location().toString).toList()

    let vehicleMultiplier = 2.0
 
    // player.tell("i am hit!")

    // if(damageSource.contains("superbwarfare:projectile_absolute")) {
    //     vehicleMultiplier = 25
    // }


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

    const modifier = Math.min(bossEntity.attributes.getBaseValue("generic.armor"), 50) / 100

    const finalDamage = damage * modifier

    // bossEntity.attack(source, finalDamage)
    // event.damage = finalDamage
    const newHealth = bossEntity.getHealth() + finalDamage


    const isFinalShot = (bossEntity.getHealth() + damage - finalDamage) <= 0

    
    // level.tell(bossEntity.getHealth())
    if(isFinalShot){
        // level.tell("check")
        // const damageSource = level.damageSources().playerAttack(player)
        bossEntity.attack(source, 100)
        bossEntity.kill()
        // level.tell("killed boss")
    } else {
        bossEntity.setHealth(newHealth)
        
    }
    // event.setAmount(finalDamage)


})

// Spellsification of Vehicles


// EntityEvents.hurt(event => {
//     const dmgSource = event.source
//     const entity = event.getEntity()

//     const immediateSource = dmgSource.getImmediate()
//     const holde  = dmgSource.typeHolder().getTagKeys().map(m => m.location().toString()).toList()
    
//     const player = event.source.getPlayer()

//     player.tell(holde)

//     player.tell(Text.of(`[GATE]: dmgSourceType: ${dmgSource.getType()}, dmgSourceType2: ${dmgSource.type().toString()}, immediate: ${immediateSource}, Entity: ${entity}`).red())


// })


// ServerEvents.highPriorityData(event => {
    

//     const path = "kubejs/data/superbwarfare/tags/damage_type/bypasses_vehicle.json"

//     const jsonFile = JSON.parse(FilesJS.readFile(path))

//     const spells = SpellRegistry.getEnabledSpells()


//     const schoolSeen = []


//     spells.forEach(m => {






//         let dmgSource = m.getSchoolType().getDamageType().location().toString()

//         if(schoolSeen.includes(dmgSource)) return

//         schoolSeen.push(dmgSource)

//         console.log(dmgSource)

//         let element = {
//             id: dmgSource,
//             required: false
//         }
//         jsonFile.values.push(element)
      

//     })
//     FilesJS.writeFile(path, JSON.stringify(jsonFile))
// })