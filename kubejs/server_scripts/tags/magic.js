

ServerEvents.tags("item", event => {
    const magicTag = global.magicTag
    const techTag = global.techTag
    event.add(magicTag, "@irons_spellbooks")
    event.add(magicTag, "@ars_nouveau")
    event.add(magicTag, "@traveloptics")

    event.add(techTag, "@tacz")
    event.add(techTag, "@superbwarfare")
    event.add(techTag, "@superbwarfare")
    event.add(techTag, "@mekanism")
    event.add(techTag, '@brimm')
    event.add(techTag, '@warborn')
})