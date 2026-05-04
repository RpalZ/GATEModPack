


// PlayerEvents.tick(event => {

//     const tick = event.server.tickCount

//     if(tick % 20 !== 0) return
//     const level = event.level

//     const player = event.player

//     const playerPos = player.position()

//     const biomePos = MoreJS.findBiome(playerPos, level, "#forge:forest", 1)

//     const miasmaTag = "gate:in_miasma_forest"

//     const inMiasma = player.getTags().find(v => v == miasmaTag)

//     if (biomePos !== null && !inMiasma) {
//         let messages = ["The forest reeks...", "It smells in here...", "Something is definitely wrong...", "This place reeks..."]

//         player.addTag(miasmaTag)
//         player.setStatusMessage(Text.of(messages[Math.floor(Math.random() * messages.length)]).italic())

//     } else if (biomePos === null && inMiasma) {
//         player.removeTag(miasmaTag)
//     }
    
//     // Utils.id()

    


    
// })
