
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
    event.add(customTags.heavyProjectiles, "fcp:wire_guided_hellfire")
    event.add(customTags.heavyProjectiles, "superbwarfare:wire_guide_missile")
    event.add(customTags.heavyProjectiles, "ashvehicle:agm114")


    event.add(customTags.custom, "#" + customTags.heavyProjectiles)
    event.add(customTags.custom, "#" + customTags.mediumProjectiles)
    event.add(customTags.custom, "#" + customTags.lightProjeciles)


    // event.add()

}) 


ServerEvents.tags("item", event => {
    event.add("superbwarfare:military_armor", "@fracturepoint")
    event.add("superbwarfare:military_armor", '@warbornrenewed')
    event.add("superbwarfare:military_armor", '@dragonrise_reforge')

    //nightvision 
    event.add("fracturepoint:has_nvg", [
        "warbornrenewed:gpngv-nato-wood",
        "warbornrenewed:gpngv-nato-desert",
        "warbornrenewed:ratnik-10t-wood",
        "warbornrenewed:opscore-fc-b2200-voevoda",
        "warbornrenewed:6b47-fc-b2200-sso",
        "warbornrenewed:ratnik-10t-desert"
    ])





})






