
const customTags = global.customTags




ServerEvents.tags("entity_type", event => {


    const {heavyProjectiles} = global.superbwarfareEntityTypes
    const {mediumProjectiles} = global.superbwarfareEntityTypes
    const {lightProjectiles} = global.superbwarfareEntityTypes

    //adding tags

    heavyProjectiles.forEach(m => {
        event.add(customTags.heavyProjectiles, m)
        console.log("[GATE] ", customTags.heavyProjectiles, m)
    })

    mediumProjectiles.forEach(m => {
        event.add(customTags.mediumProjectiles, m)
    })
    lightProjectiles.forEach(m => {
        event.add(customTags.lightProjectiles, m)
    })

    event.add(customTags.heavyProjectiles, "fcp:malyutka")

    event.add(customTags.custom, "#" + customTags.heavyProjectiles)
    event.add(customTags.custom, "#" + customTags.mediumProjectiles)
    event.add(customTags.custom, "#" + customTags.lightProjeciles)

}) 